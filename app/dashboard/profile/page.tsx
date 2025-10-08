'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { useAuth } from '@/contexts/AuthContext'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/button'
import { User, Mail, Calendar, Edit, Save, X, LogOut, Shield, Download, Loader2, Lock, Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { updatePassword, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth'
import { auth } from '@/lib/firebase'

interface ProfileForm {
  firstName: string
  lastName: string
  email: string
}

interface PasswordForm {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

export default function ProfilePage() {
  const { user, logout, loading: authLoading } = useAuth()
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [passwordLoading, setPasswordLoading] = useState(false)

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ProfileForm>({
    defaultValues: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
    }
  })

  const passwordForm = useForm<PasswordForm>({
    mode: 'onChange'
  })

  const onSubmit = async (data: ProfileForm) => {
    setIsLoading(true)
    try {
      // Call the API to update profile
      const functionsUrl = process.env.NEXT_PUBLIC_FIREBASE_FUNCTIONS_URL || 
                          'https://api-7wtrvbj3mq-ew.a.run.app'
      
      const response = await fetch(`${functionsUrl}/api/user/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          uid: user?.uid,
          updates: {
            firstName: data.firstName,
            lastName: data.lastName
          }
        })
      })

      if (!response.ok) {
        throw new Error('Failed to update profile')
      }
      
      // Success feedback
      alert('Profil sikeresen frissítve!')
      setIsEditing(false)
    } catch (error) {
      console.error('Update profile error:', error)
      alert('Nem sikerült frissíteni a profilt')
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true)
      await logout()
      router.push('/')
    } catch (error) {
      console.error('Logout error:', error)
      setIsLoggingOut(false)
    }
  }

  const handleCancel = () => {
    reset({
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
    })
    setIsEditing(false)
  }

  const onPasswordSubmit = async (data: PasswordForm) => {
    if (data.newPassword !== data.confirmPassword) {
      alert('Az új jelszavak nem egyeznek!')
      return
    }

    setPasswordLoading(true)
    try {
      if (!auth.currentUser || !user?.email) {
        throw new Error('Nincs bejelentkezve')
      }

      // Re-authenticate the user
      const credential = EmailAuthProvider.credential(
        user.email,
        data.currentPassword
      )
      
      await reauthenticateWithCredential(auth.currentUser, credential)
      
      // Update password
      await updatePassword(auth.currentUser, data.newPassword)
      
      alert('Jelszó sikeresen megváltozott!')
      setShowPasswordModal(false)
      passwordForm.reset()
    } catch (error: any) {
      console.error('Password update error:', error)
      if (error.code === 'auth/wrong-password') {
        alert('Hibás jelenlegi jelszó!')
      } else if (error.code === 'auth/weak-password') {
        alert('Az új jelszó túl gyenge! Legalább 6 karakter legyen.')
      } else {
        alert('Nem sikerült megváltoztatni a jelszót')
      }
    } finally {
      setPasswordLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="px-6 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Page Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Profil beállítások</h1>
              <p className="text-gray-600 mt-1">Kezeld a fiókod adatait és beállításait</p>
            </div>
            <Button
              onClick={handleLogout}
              disabled={isLoggingOut}
              variant="outline"
              className="text-red-600 border-red-600 hover:bg-red-50"
            >
              {isLoggingOut ? (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              ) : (
                <LogOut className="w-4 h-4 mr-2" />
              )}
              Kijelentkezés
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Profile Card */}
            <div className="lg:col-span-2">
              <Card className="p-6">
                <div className="border-b pb-4 mb-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold flex items-center">
                      <User className="w-5 h-5 mr-2" />
                      Személyes adatok
                    </h3>
                    {!isEditing ? (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setIsEditing(true)}
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Szerkesztés
                      </Button>
                    ) : (
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={handleCancel}
                          disabled={isLoading}
                        >
                          <X className="w-4 h-4 mr-2" />
                          Mégse
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                          Keresztnév
                        </label>
                        {isEditing ? (
                          <input
                            id="firstName"
                            {...register('firstName', { required: 'First name is required' })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                            placeholder="Add meg a keresztneved"
                          />
                        ) : (
                          <div className="px-3 py-2 bg-gray-50 rounded-md text-gray-900">
                            {user?.firstName || 'Nincs megadva'}
                          </div>
                        )}
                        {errors.firstName && (
                          <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                          Vezetéknév
                        </label>
                        {isEditing ? (
                          <input
                            id="lastName"
                            {...register('lastName', { required: 'Last name is required' })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                            placeholder="Add meg a vezetékneved"
                          />
                        ) : (
                          <div className="px-3 py-2 bg-gray-50 rounded-md text-gray-900">
                            {user?.lastName || 'Nincs megadva'}
                          </div>
                        )}
                        {errors.lastName && (
                          <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email cím
                      </label>
                      {isEditing ? (
                        <input
                          id="email"
                          type="email"
                          {...register('email', { 
                            required: 'Email is required',
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: 'Invalid email address'
                            }
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                          placeholder="Add meg az email címed"
                        />
                      ) : (
                        <div className="px-3 py-2 bg-gray-50 rounded-md text-gray-900">
                          {user?.email || 'Nincs megadva'}
                        </div>
                      )}
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                      )}
                    </div>

                    {isEditing && (
                      <div className="flex justify-end">
                        <Button 
                          type="submit" 
                          disabled={isLoading}
                          className="bg-teal-600 hover:bg-teal-700"
                        >
                          {isLoading ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                              Mentés...
                            </>
                          ) : (
                            <>
                              <Save className="w-4 h-4 mr-2" />
                              Mentés
                            </>
                          )}
                        </Button>
                      </div>
                    )}
                  </form>
              </Card>
            </div>

            {/* Account Overview Sidebar */}
            <div className="space-y-6">
              
              {/* Account Status */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Fiók státusz</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Fiók típus</span>
                    <div className="bg-teal-100 text-teal-800 px-2 py-1 rounded text-xs font-medium">
                      {user?.role === 'STUDENT' ? 'Diák' : user?.role || 'Diák'}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Regisztráció</span>
                    <span className="text-sm text-gray-900">
                      {new Date().toLocaleDateString('hu-HU')}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Kurzus hozzáférés</span>
                    {user?.courseAccess ? (
                      <div className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                        Aktív
                      </div>
                    ) : (
                      <Link 
                        href="/courses/ai-copywriting-course"
                        className="text-teal-600 text-sm font-medium hover:text-teal-700"
                      >
                        Vásárlás →
                      </Link>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Letöltések</span>
                    <span className="text-sm text-gray-900">
                      0 elem
                    </span>
                  </div>
                </div>
              </Card>

              {/* Quick Actions */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Gyors műveletek</h3>
                <div className="space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => setShowPasswordModal(true)}
                  >
                    <Lock className="w-4 h-4 mr-2" />
                    Jelszó módosítás
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => alert('Értesítési beállítások hamarosan elérhetők!')}
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Értesítési beállítások
                  </Button>
                </div>
              </Card>


            </div>
          </div>
        </div>
      </div>

      {/* Password Change Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md p-6">
            <div className="border-b pb-4 mb-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold flex items-center">
                  <Lock className="w-5 h-5 mr-2" />
                  Jelszó módosítása
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setShowPasswordModal(false)
                    passwordForm.reset()
                  }}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
              <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-4">
                <div>
                  <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-2">
                    Jelenlegi jelszó
                  </label>
                  <div className="relative">
                    <input
                      id="currentPassword"
                      type={showCurrentPassword ? "text" : "password"}
                      {...passwordForm.register('currentPassword', { 
                        required: 'A jelenlegi jelszó megadása kötelező' 
                      })}
                      className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Add meg a jelenlegi jelszavadat"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {passwordForm.formState.errors.currentPassword && (
                    <p className="mt-1 text-sm text-red-600">
                      {passwordForm.formState.errors.currentPassword.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
                    Új jelszó
                  </label>
                  <div className="relative">
                    <input
                      id="newPassword"
                      type={showNewPassword ? "text" : "password"}
                      {...passwordForm.register('newPassword', { 
                        required: 'Az új jelszó megadása kötelező',
                        minLength: {
                          value: 6,
                          message: 'A jelszónak legalább 6 karakter hosszúnak kell lennie'
                        }
                      })}
                      className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Add meg az új jelszavadat"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {passwordForm.formState.errors.newPassword && (
                    <p className="mt-1 text-sm text-red-600">
                      {passwordForm.formState.errors.newPassword.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                    Új jelszó megerősítése
                  </label>
                  <input
                    id="confirmPassword"
                    type="password"
                    {...passwordForm.register('confirmPassword', { 
                      required: 'A jelszó megerősítése kötelező',
                      validate: (value) => 
                        value === passwordForm.watch('newPassword') || 'A jelszavak nem egyeznek'
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Írd be újra az új jelszavadat"
                  />
                  {passwordForm.formState.errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-600">
                      {passwordForm.formState.errors.confirmPassword.message}
                    </p>
                  )}
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setShowPasswordModal(false)
                      passwordForm.reset()
                    }}
                    disabled={passwordLoading}
                    className="flex-1"
                  >
                    Mégse
                  </Button>
                  <Button
                    type="submit"
                    disabled={passwordLoading}
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                  >
                    {passwordLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                        Mentés...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Jelszó módosítása
                      </>
                    )}
                  </Button>
                </div>
              </form>
          </Card>
        </div>
      )}
    </div>
  )
}
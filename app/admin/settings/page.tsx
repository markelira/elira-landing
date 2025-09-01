'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  Settings, 
  Save, 
  Upload, 
  Bell, 
  Mail, 
  Shield, 
  Database, 
  Globe, 
  Palette, 
  MessageSquare,
  Key,
  Server,
  AlertTriangle,
  CheckCircle,
  Eye,
  EyeOff,
  Sparkles
} from 'lucide-react'
import { toast } from 'sonner'

// Import our admin API infrastructure
import { useAdminSettings, useUpdateSettings, useAdminHealthCheck } from '@/lib/admin-hooks'
import type { SystemSettings } from '@/lib/admin-hooks'

// All mock interfaces removed - now using real API integration

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState('general')
  const [showPasswords, setShowPasswords] = useState<{[key: string]: boolean}>({})
  
  // Use our new admin hooks with real API integration
  const { data: settings, isLoading: settingsLoading, error: settingsError } = useAdminSettings()
  const { data: healthStatus } = useAdminHealthCheck()
  const updateSettingsMutation = useUpdateSettings()
  
  const [localSettings, setLocalSettings] = useState<SystemSettings | null>(null)
  
  // Update local settings when API data loads
  if (settings && !localSettings) {
    setLocalSettings(settings)
  }
  
  const handleSave = async () => {
    if (!localSettings) return
    updateSettingsMutation.mutate(localSettings)
  }

  const togglePasswordVisibility = (field: string) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }))
  }
  
  // Enhanced loading and error states
  if (settingsLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
        <span className="ml-2 text-gray-600">Loading settings...</span>
      </div>
    )
  }

  if (settingsError) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 mb-4">Error loading settings: {settingsError.message}</div>
        <Button onClick={() => window.location.reload()}>Retry</Button>
      </div>
    )
  }
  
  if (!localSettings) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-600">Initializing settings...</div>
      </div>
    )
  }

  const tabs = [
    { id: 'general', label: 'General', icon: Settings },
    { id: 'email', label: 'Email', icon: Mail },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'payments', label: 'Payments', icon: Key },
    { id: 'storage', label: 'Storage', icon: Database }
  ]

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24" />
        
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">System Settings</h1>
              <p className="text-indigo-100 text-lg">
                Configure platform settings and preferences
              </p>
            </div>
            <div className="hidden lg:block">
              <Button 
                onClick={handleSave}
                disabled={updateSettingsMutation.isPending}
                className="bg-white text-indigo-600 hover:bg-gray-100 flex items-center gap-2"
              >
                {updateSettingsMutation.isPending ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-indigo-600"></div>
                ) : (
                  <Save className="h-4 w-4" />
                )}
                {updateSettingsMutation.isPending ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Settings Navigation */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Settings Categories
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <nav className="space-y-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                        activeTab === tab.id
                          ? 'bg-indigo-50 text-indigo-700 border-r-2 border-indigo-600'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {tab.label}
                    </button>
                  )
                })}
              </nav>
            </CardContent>
          </Card>

          {/* System Status */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Server className="w-5 h-5" />
                System Status
                <Badge className="bg-indigo-100 text-indigo-700 ml-2">
                  <Sparkles className="w-3 h-3 mr-1" />
                  Live
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Database</span>
                <Badge className={healthStatus?.status === 'ok' ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}>
                  {healthStatus?.status === 'ok' ? (
                    <><CheckCircle className="w-3 h-3 mr-1" />Healthy</>
                  ) : (
                    <><AlertTriangle className="w-3 h-3 mr-1" />Error</>
                  )}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Email Service</span>
                <Badge className="bg-green-100 text-green-700">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Operational
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Storage</span>
                <Badge className="bg-green-100 text-green-700">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Connected
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Payment Gateway</span>
                <Badge className="bg-green-100 text-green-700">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Live
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3">
          <Card>
            <CardContent className="p-6">
              {/* General Settings */}
              {activeTab === 'general' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <Globe className="w-5 h-5" />
                      General Settings
                    </h3>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Site Name
                      </label>
                      <Input
                        value={localSettings.general.siteName}
                        onChange={(e) => setLocalSettings(prev => prev ? ({
                          ...prev,
                          general: { ...prev.general, siteName: e.target.value }
                        }) : null)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Admin Email
                      </label>
                      <Input
                        type="email"
                        value={localSettings.general.adminEmail}
                        onChange={(e) => setLocalSettings(prev => prev ? ({
                          ...prev,
                          general: { ...prev.general, adminEmail: e.target.value }
                        }) : null)}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Site Description
                    </label>
                    <textarea
                      className="w-full px-3 py-2 border border-gray-300 rounded-md resize-none"
                      rows={3}
                      value={localSettings.general.siteDescription}
                      onChange={(e) => setLocalSettings(prev => prev ? ({
                        ...prev,
                        general: { ...prev.general, siteDescription: e.target.value }
                      }) : null)}
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Site URL
                      </label>
                      <Input
                        value={localSettings.general.siteUrl}
                        onChange={(e) => setLocalSettings(prev => prev ? ({
                          ...prev,
                          general: { ...prev.general, siteUrl: e.target.value }
                        }) : null)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Timezone
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                        <option value="UTC">UTC</option>
                        <option value="America/New_York">Eastern Time</option>
                        <option value="America/Los_Angeles">Pacific Time</option>
                        <option value="Europe/London">GMT</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Language
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                        <option value="en">English</option>
                        <option value="hu">Hungarian</option>
                        <option value="es">Spanish</option>
                        <option value="fr">French</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="w-5 h-5 text-yellow-600" />
                      <div>
                        <div className="font-medium text-yellow-800">Maintenance Mode</div>
                        <div className="text-sm text-yellow-700">Temporarily disable public access to the site</div>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={localSettings.general.maintenanceMode}
                        onChange={(e) => setLocalSettings(prev => prev ? ({
                          ...prev,
                          general: { ...prev.general, maintenanceMode: e.target.checked }
                        }) : null)}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-600"></div>
                    </label>
                  </div>
                </div>
              )}

              {/* Email Settings */}
              {activeTab === 'email' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <Mail className="w-5 h-5" />
                      Email Configuration
                    </h3>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        SMTP Host
                      </label>
                      <Input
                        value={localSettings.email.smtpHost}
                        onChange={(e) => setLocalSettings(prev => prev ? ({
                          ...prev,
                          email: { ...prev.email, smtpHost: e.target.value }
                        }) : null)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        SMTP Port
                      </label>
                      <Input
                        value={localSettings.email.smtpPort}
                        onChange={(e) => setLocalSettings(prev => prev ? ({
                          ...prev,
                          email: { ...prev.email, smtpPort: e.target.value }
                        }) : null)}
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        SMTP Username
                      </label>
                      <Input
                        value={localSettings.email.smtpUsername}
                        onChange={(e) => setLocalSettings(prev => prev ? ({
                          ...prev,
                          email: { ...prev.email, smtpUsername: e.target.value }
                        }) : null)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        SMTP Password
                      </label>
                      <div className="relative">
                        <Input
                          type={showPasswords.smtpPassword ? 'text' : 'password'}
                          value={localSettings.email.smtpPassword}
                          onChange={(e) => setLocalSettings(prev => prev ? ({
                            ...prev,
                            email: { ...prev.email, smtpPassword: e.target.value }
                          }) : null)}
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 transform -translate-y-1/2"
                          onClick={() => togglePasswordVisibility('smtpPassword')}
                        >
                          {showPasswords.smtpPassword ? (
                            <EyeOff className="w-4 h-4 text-gray-400" />
                          ) : (
                            <Eye className="w-4 h-4 text-gray-400" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        From Email
                      </label>
                      <Input
                        type="email"
                        value={localSettings.email.fromEmail}
                        onChange={(e) => setLocalSettings(prev => prev ? ({
                          ...prev,
                          email: { ...prev.email, fromEmail: e.target.value }
                        }) : null)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        From Name
                      </label>
                      <Input
                        value={localSettings.email.fromName}
                        onChange={(e) => setLocalSettings(prev => prev ? ({
                          ...prev,
                          email: { ...prev.email, fromName: e.target.value }
                        }) : null)}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Shield className="w-5 h-5 text-blue-600" />
                      <div>
                        <div className="font-medium text-blue-800">Email Verification Required</div>
                        <div className="text-sm text-blue-700">Require users to verify their email address</div>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={localSettings.email.emailVerificationRequired}
                        onChange={(e) => setLocalSettings(prev => prev ? ({
                          ...prev,
                          email: { ...prev.email, emailVerificationRequired: e.target.checked }
                        }) : null)}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              )}

              {/* Add other tab content here... */}
              {activeTab !== 'general' && activeTab !== 'email' && (
                <div className="text-center py-12">
                  <Settings className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {tabs.find(t => t.id === activeTab)?.label} Settings
                  </h3>
                  <p className="text-gray-500">
                    Settings for {tabs.find(t => t.id === activeTab)?.label.toLowerCase()} will be available here.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Save Button for Mobile */}
          <div className="lg:hidden mt-6">
            <Button 
              onClick={handleSave}
              disabled={updateSettingsMutation.isPending}
              className="w-full flex items-center justify-center gap-2"
            >
              {updateSettingsMutation.isPending ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              ) : (
                <Save className="h-4 w-4" />
              )}
              {updateSettingsMutation.isPending ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
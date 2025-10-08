'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  Tags, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Search,
  BookOpen,
  Users,
  TrendingUp,
  Folder,
  Save,
  X,
  Sparkles
} from 'lucide-react'
import { toast } from 'sonner'

// Import our admin API infrastructure
import { 
  useAdminCategories, 
  useAdminCategoryStats,
  useCreateCategory,
  useUpdateCategory,
  useDeleteCategory
} from '@/lib/admin-hooks'
import type { Category, CategoryStats, CreateCategoryData } from '@/lib/admin-hooks'

// All mock functions removed - now using real API integration

export default function AdminCategoriesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [isCreating, setIsCreating] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [newCategory, setNewCategory] = useState<CreateCategoryData>({
    name: '',
    description: '',
    color: '#16222F',
    icon: '📁'
  })
  
  // Use our new admin hooks with real API integration
  const { data: categories, isLoading: categoriesLoading, error: categoriesError } = useAdminCategories()
  const { data: stats, isLoading: statsLoading } = useAdminCategoryStats()

  // Use integrated mutation hooks with error handling
  const createCategoryMutation = useCreateCategory()
  const updateCategoryMutation = useUpdateCategory()
  const deleteCategoryMutation = useDeleteCategory()

  const filteredCategories = categories?.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  ) || []

  const handleCreateCategory = () => {
    if (!newCategory.name.trim()) {
      toast.error('Category name is required')
      return
    }
    createCategoryMutation.mutate(newCategory)
  }

  const handleUpdateCategory = () => {
    if (!editingCategory) return
    updateCategoryMutation.mutate({
      categoryId: editingCategory.id,
      categoryData: {
        name: editingCategory.name,
        description: editingCategory.description,
        color: editingCategory.color,
        icon: editingCategory.icon
      }
    })
  }

  const handleDeleteCategory = (categoryId: string, categoryName: string) => {
    if (confirm(`Are you sure you want to delete "${categoryName}"? This action cannot be undone.`)) {
      deleteCategoryMutation.mutate(categoryId)
    }
  }

  // Enhanced loading and error states
  if (categoriesLoading || statsLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
        <span className="ml-2 text-gray-600">Loading categories...</span>
      </div>
    )
  }

  if (categoriesError) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 mb-4">Error loading categories: {categoriesError.message}</div>
        <Button onClick={() => window.location.reload()}>Retry</Button>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-violet-500 to-purple-600 rounded-xl p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24" />
        
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Category Management</h1>
              <p className="text-violet-100 text-lg">
                Organize and manage course categories
              </p>
            </div>
            <div className="hidden lg:block">
              <Button 
                onClick={() => setIsCreating(true)}
                className="bg-white text-violet-600 hover:bg-gray-100 flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Category
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Category Stats */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Category Statistics</h2>
          <Badge className="bg-purple-100 text-purple-700">
            <Sparkles className="w-3 h-3 mr-1" />
            Live Data
          </Badge>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-lg bg-purple-50 flex items-center justify-center">
                <Tags className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-4">
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {stats?.totalCategories || 0}
              </div>
              <div className="text-sm font-medium text-gray-600 mb-1">
                Total Categories
              </div>
              <div className="text-xs text-gray-500">
                {stats?.activeCategories || 0} active
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4">
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {stats?.totalCourses || 0}
              </div>
              <div className="text-sm font-medium text-gray-600 mb-1">
                Total Courses
              </div>
              <div className="text-xs text-gray-500">
                Across all categories
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-lg bg-green-50 flex items-center justify-center">
                <Users className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4">
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {stats?.totalEnrollments.toLocaleString() || 0}
              </div>
              <div className="text-sm font-medium text-gray-600 mb-1">
                Total Enrollments
              </div>
              <div className="text-xs text-gray-500">
                Student enrollments
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-lg bg-orange-50 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-orange-600" />
              </div>
            </div>
            <div className="mt-4">
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {stats?.topCategory.name || 'N/A'}
              </div>
              <div className="text-sm font-medium text-gray-600 mb-1">
                Top Category
              </div>
              <div className="text-xs text-gray-500">
                {stats?.topCategory.courses || 0} courses
              </div>
            </div>
          </CardContent>
        </Card>
        </div>
      </div>

      {/* Search and Create */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="sm:hidden">
          <Button 
            onClick={() => setIsCreating(true)}
            className="w-full flex items-center justify-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Category
          </Button>
        </div>
      </div>

      {/* Create Category Form */}
      {isCreating && (
        <Card className="border-2 border-purple-200">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-purple-700">Create New Category</CardTitle>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setIsCreating(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category Name *
                </label>
                <Input
                  value={newCategory.name}
                  onChange={(e) => setNewCategory(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g., Web Development"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Icon
                </label>
                <Input
                  value={newCategory.icon}
                  onChange={(e) => setNewCategory(prev => ({ ...prev, icon: e.target.value }))}
                  placeholder="e.g., 🌐"
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-md resize-none"
                rows={3}
                value={newCategory.description}
                onChange={(e) => setNewCategory(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Brief description of this category"
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Color
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={newCategory.color}
                  onChange={(e) => setNewCategory(prev => ({ ...prev, color: e.target.value }))}
                  className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
                />
                <Input
                  value={newCategory.color}
                  onChange={(e) => setNewCategory(prev => ({ ...prev, color: e.target.value }))}
                  className="flex-1"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline" onClick={() => setIsCreating(false)}>
                Cancel
              </Button>
              <Button 
                onClick={() => createCategoryMutation.mutate(newCategory, {
                  onSuccess: () => {
                    setIsCreating(false)
                    setNewCategory({ name: '', description: '', color: '#16222F', icon: '📁' })
                  }
                })}
                disabled={createCategoryMutation.isPending}
                className="flex items-center gap-2"
              >
                {createCategoryMutation.isPending ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                ) : (
                  <Save className="h-4 w-4" />
                )}
                {createCategoryMutation.isPending ? 'Creating...' : 'Create Category'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Categories Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredCategories.map((category) => (
          <Card key={category.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center text-xl"
                    style={{ backgroundColor: `${category.color}20`, color: category.color }}
                  >
                    {category.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{category.name}</h3>
                    <Badge 
                      className={`mt-1 ${category.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}
                    >
                      {category.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                {category.description}
              </p>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-xl font-bold text-gray-900">{category.courseCount}</div>
                  <div className="text-xs text-gray-500">Courses</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-xl font-bold text-gray-900">{category.enrollmentCount.toLocaleString()}</div>
                  <div className="text-xs text-gray-500">Enrollments</div>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="text-xs text-gray-500">
                  Created {new Date(category.createdAt).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="sm" title="View Details">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    title="Edit Category"
                    onClick={() => {
                      // For now, just show a placeholder - edit functionality would be implemented here
                      toast.info('Edit functionality coming soon!')
                    }}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    title="Delete Category"
                    className="text-red-600 hover:text-red-700"
                    onClick={() => {
                      if (confirm(`Are you sure you want to delete "${category.name}"? This action cannot be undone.`)) {
                        deleteCategoryMutation.mutate(category.id)
                      }
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCategories.length === 0 && (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-12">
              <Folder className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <div className="text-gray-500 mb-4">
                {searchTerm ? "No categories found matching your search." : "No categories available."}
              </div>
              <Button onClick={() => setIsCreating(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Create Your First Category
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
import { Request, Response } from 'express';
import * as admin from 'firebase-admin';

const db = admin.firestore();

// ==============================
// ADMIN CATEGORY MANAGEMENT
// ==============================

// Get all categories for admin dashboard
export const getAdminCategoriesHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    // For MVP, return the main category (Digital Marketing)
    const categories = [
      {
        id: 'marketing',
        name: 'Digital Marketing',
        slug: 'digital-marketing',
        description: 'AI-powered copywriting and digital marketing strategies',
        color: '#EF4444',
        icon: '📈',
        courseCount: 1,
        enrollmentCount: 0, // Will be updated based on real data
        isActive: true,
        createdAt: new Date('2024-01-15').toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];

    // Get real enrollment count from payments
    try {
      const paymentsSnapshot = await db.collection('payments')
        .where('status', '==', 'completed')
        .get();
      
      categories[0].enrollmentCount = paymentsSnapshot.size;
    } catch (error) {
      console.warn('Failed to get enrollment count:', error);
    }

    res.json(categories);
  } catch (error) {
    console.error('Get admin categories error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get categories'
    });
  }
};

// Get category statistics for admin dashboard
export const getAdminCategoryStatsHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    // Get real enrollment data
    let totalEnrollments = 0;
    try {
      const paymentsSnapshot = await db.collection('payments')
        .where('status', '==', 'completed')
        .get();
      
      totalEnrollments = paymentsSnapshot.size;
    } catch (error) {
      console.warn('Failed to get enrollment count:', error);
    }

    const stats = {
      totalCategories: 1,
      activeCategories: 1,
      totalCourses: 1,
      totalEnrollments,
      topCategory: {
        id: 'marketing',
        name: 'Digital Marketing',
        courses: 1,
        enrollments: totalEnrollments
      }
    };

    res.json(stats);
  } catch (error) {
    console.error('Get admin category stats error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get category statistics'
    });
  }
};

// Create new category (admin only)
export const createAdminCategoryHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, description, color, icon } = req.body;

    if (!name || !description) {
      res.status(400).json({
        success: false,
        error: 'Name and description are required'
      });
      return;
    }

    // For MVP, simulate category creation (in production, would save to Firestore)
    const categoryId = `category-${Date.now()}`;
    const slug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    
    const newCategory = {
      id: categoryId,
      name,
      slug,
      description,
      color: color || '#16222F',
      icon: icon || '📁',
      courseCount: 0,
      enrollmentCount: 0,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // In production:
    // await db.collection('categories').doc(categoryId).set(newCategory);

    console.log('Created category:', newCategory);

    res.json({
      success: true,
      category: newCategory,
      message: 'Category created successfully'
    });
  } catch (error) {
    console.error('Create admin category error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create category'
    });
  }
};

// Update category (admin only)
export const updateAdminCategoryHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { categoryId } = req.params;
    const updateData = req.body;

    if (!categoryId) {
      res.status(400).json({
        success: false,
        error: 'Category ID is required'
      });
      return;
    }

    // For MVP, simulate update (in production, would update in Firestore)
    console.log(`Updating category ${categoryId} with:`, updateData);
    
    // In production:
    // await db.collection('categories').doc(categoryId).update({
    //   ...updateData,
    //   updatedAt: admin.firestore.FieldValue.serverTimestamp()
    // });

    res.json({
      success: true,
      message: 'Category updated successfully'
    });
  } catch (error) {
    console.error('Update admin category error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update category'
    });
  }
};

// Delete category (admin only)
export const deleteAdminCategoryHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { categoryId } = req.params;

    if (!categoryId) {
      res.status(400).json({
        success: false,
        error: 'Category ID is required'
      });
      return;
    }

    // Prevent deletion of the main marketing category for MVP
    if (categoryId === 'marketing') {
      res.status(400).json({
        success: false,
        error: 'Cannot delete the main category'
      });
      return;
    }

    // For MVP, simulate deletion (in production, would delete from Firestore)
    console.log(`Deleting category: ${categoryId}`);
    
    // In production:
    // 1. Check if category has courses
    // 2. Handle course reassignment or prevent deletion
    // 3. Delete category document
    // await db.collection('categories').doc(categoryId).delete();

    res.json({
      success: true,
      message: 'Category deleted successfully'
    });
  } catch (error) {
    console.error('Delete admin category error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete category'
    });
  }
};
import { test, expect } from '@playwright/test';

test.describe('Course Creation Wizard', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to course creation page
    await page.goto('/admin/courses/new');
    
    // Wait for the page to load
    await page.waitForLoadState('networkidle');
  });

  test('should complete full course creation flow', async ({ page }) => {
    // Step 1: Basic Info
    await expect(page.locator('h1')).toContainText('Új kurzus létrehozása');
    
    // Fill basic info
    await page.fill('[name="title"]', 'Test Course Title');
    await page.fill('[name="description"]', 'This is a comprehensive test course description.');
    await page.selectOption('[name="category"]', 'programming');
    await page.fill('[name="slug"]', 'test-course-slug');
    
    // Proceed to curriculum step
    await page.click('button:has-text("Következő")');
    await expect(page.locator('.bg-blue-500')).toBeVisible(); // Current step indicator
    
    // Step 2: Curriculum
    // Add a module
    await page.click('button:has-text("Add Module")');
    await page.fill('[placeholder*="module title"]', 'Introduction Module');
    await page.fill('[placeholder*="description"]', 'Introduction to the course');
    
    // Add a lesson to the module
    await page.click('button:has-text("Add Lesson")');
    await page.fill('[placeholder*="lesson title"]', 'Welcome Video');
    await page.selectOption('[name="lessonType"]', 'VIDEO');
    
    // Simulate video upload (this would trigger Mux in production)
    const fileInput = page.locator('input[type="file"]');
    // Note: In real E2E tests, you'd upload a small test video file
    
    // Add a PDF lesson
    await page.click('button:has-text("Add Lesson")');
    await page.fill('[placeholder*="lesson title"]', 'Course Materials');
    await page.selectOption('[name="lessonType"]', 'PDF');
    
    // Proceed to publishing step
    await page.click('button:has-text("Következő")');
    
    // Step 3: Publishing
    await expect(page.locator('text=Publikálás')).toBeVisible();
    
    // Set course as draft initially
    await page.check('[name="isDraft"]');
    await page.fill('[name="price"]', '49.99');
    
    // Submit course
    await page.click('button:has-text("Kurzus létrehozása")');
    
    // Verify success
    await expect(page.locator('.toast-success')).toBeVisible();
    
    // Should redirect to course edit page
    await page.waitForURL(/\/admin\/courses\/.*\/edit/);
  });

  test('should validate required fields', async ({ page }) => {
    // Try to proceed without filling required fields
    await page.click('button:has-text("Következő")');
    
    // Should stay on basic info step
    await expect(page.locator('input[name="title"]')).toBeVisible();
    
    // Next button should be disabled
    await expect(page.locator('button:has-text("Következő")')).toBeDisabled();
  });

  test('should handle video upload flow', async ({ page }) => {
    // Fill basic info first
    await page.fill('[name="title"]', 'Video Test Course');
    await page.fill('[name="description"]', 'Testing video upload functionality');
    await page.selectOption('[name="category"]', 'technology');
    await page.fill('[name="slug"]', 'video-test-course');
    
    // Go to curriculum
    await page.click('button:has-text("Következő")');
    
    // Add module and lesson
    await page.click('button:has-text("Add Module")');
    await page.fill('[placeholder*="module title"]', 'Video Module');
    
    await page.click('button:has-text("Add Lesson")');
    await page.fill('[placeholder*="lesson title"]', 'Test Video Lesson');
    
    // Open lesson content modal
    await page.click('button:has-text("Upload Content")');
    
    // Select VIDEO tab
    await page.click('[role="tab"]:has-text("VIDEO")');
    
    // Video upload area should be visible
    await expect(page.locator('.drag-drop-zone')).toBeVisible();
    await expect(page.locator('text=MP4, MOV, AVI, WebM')).toBeVisible();
    await expect(page.locator('text=Max file size: 5GB')).toBeVisible();
  });

  test('should handle PDF upload flow', async ({ page }) => {
    // Fill basic info first
    await page.fill('[name="title"]', 'PDF Test Course');
    await page.fill('[name="description"]', 'Testing PDF upload functionality');
    await page.selectOption('[name="category"]', 'business');
    await page.fill('[name="slug"]', 'pdf-test-course');
    
    // Go to curriculum
    await page.click('button:has-text("Következő")');
    
    // Add module and lesson
    await page.click('button:has-text("Add Module")');
    await page.fill('[placeholder*="module title"]', 'PDF Module');
    
    await page.click('button:has-text("Add Lesson")');
    await page.fill('[placeholder*="lesson title"]', 'Test PDF Lesson');
    
    // Open lesson content modal
    await page.click('button:has-text("Upload Content")');
    
    // Select PDF tab
    await page.click('[role="tab"]:has-text("PDF")');
    
    // PDF upload area should be visible
    await expect(page.locator('.drag-drop-zone')).toBeVisible();
    await expect(page.locator('text=PDF files only')).toBeVisible();
    await expect(page.locator('text=Max file size: 50MB')).toBeVisible();
  });

  test('should persist data across steps', async ({ page }) => {
    // Fill basic info
    const courseTitle = 'Persistence Test Course';
    await page.fill('[name="title"]', courseTitle);
    await page.fill('[name="description"]', 'Testing data persistence');
    await page.selectOption('[name="category"]', 'design');
    await page.fill('[name="slug"]', 'persistence-test');
    
    // Go to curriculum and back
    await page.click('button:has-text("Következő")');
    await page.click('button:has-text("Előző")');
    
    // Data should be preserved
    await expect(page.locator('[name="title"]')).toHaveValue(courseTitle);
  });

  test('should show auto-save status', async ({ page }) => {
    // Make changes
    await page.fill('[name="title"]', 'Auto Save Test');
    
    // Should show unsaved changes indicator
    await expect(page.locator('text=Nem mentett változások')).toBeVisible();
    
    // Save draft
    await page.click('button:has-text("Piszkozat mentése")');
    
    // Should show last saved time
    await expect(page.locator('text*=Last saved:')).toBeVisible();
  });
});
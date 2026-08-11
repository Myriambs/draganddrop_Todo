import {test,expect} from './fixtures'

// ============================================================
// 2. ADD TASK TESTS
// ============================================================
test('Add Task', async ({ page }) => {
    await page.locator('[data-testid="new-task-input"]').fill('New task 12');
    await page.locator('[data-testid="add-task-btn"]').click();

    const cards = page.locator('[data-testid^="task-card-"]');
    await expect(cards).toHaveCount(4);
 // The new task text should be visible somewhere in the list
    await expect(page.locator('[data-testid="task-list"]')).toContainText('New task 12');
});


test('does NOT add empty task', async ({ page }) => {
  await page.locator('[data-testid="new-task-input"]').fill('     ');
    await page.locator('[data-testid="add-task-btn"]').click();

    const cards = page.locator('[data-testid^="task-card-"]');
    await expect(cards).toHaveCount(3);    
})

// ============================================================
// 3. DELETE TASK TESTS
// ============================================================
test('deleyte task', async ({ page }) => {
  await page.locator('[data-testid="delete-task-1"]').click();
 
    // Task card should be gone
    await expect(page.locator('[data-testid="task-card-1"]')).not.toBeVisible();
 
    // Now only 2 tasks remain
    const cards = page.locator('[data-testid^="task-card-"]');
    await expect(cards).toHaveCount(2);
})
test('delete task 2 others remain visible ', async ({ page }) => {
    await page.locator('[data-testid="delete-task-1"]').click();
 
    // Task card should be gone
    await expect(page.locator('[data-testid="task-card-1"]')).not.toBeVisible();

    // Task card 2 should still be visible
    await expect(page.locator('[data-testid="task-card-2"]')).toBeVisible();
    await expect(page.locator('[data-testid="task-card-3"]')).toBeVisible();

    // Now only 2 tasks remain
    const cards = page.locator('[data-testid^="task-card-"]');
    await expect(cards).toHaveCount(2);  
})

test('delete all task and show empty table', async ({ page }) => {

    await page.locator('[data-testid="delete-task-1"]').click();
    await page.locator('[data-testid="delete-task-2"]').click();
    await page.locator('[data-testid="delete-task-3"]').click();
    
    // Task cards should be gone
    await expect(page.locator('[data-testid="task-card-1"]')).not.toBeVisible();
    await expect(page.locator('[data-testid="task-card-2"]')).not.toBeVisible();
    await expect(page.locator('[data-testid="task-card-3"]')).not.toBeVisible();
        const cards = page.locator('[data-testid^="task-card-"]');
    await expect(cards).toHaveCount(0); 
    await expect(page.locator('[data-testid="empty-state"]')).toContainText('No tasks found');
})

// ============================================================
// 4. TOGGLE COMPLETE TESTS
// ============================================================
test('toggle complete', async ({ page }) => {
        // Task 1 starts as NOT completed — toggle it
    await page.locator('[data-testid="toggle-task-1"]').click();
 
    // The text should now have line-through style
    const taskText = page.locator('[data-testid="task-text-1"]');
    await expect(taskText).toHaveClass(/line-through/);
})

test('toggle complete twice', async ({ page }) => {
    // Task 1 starts as NOT completed — toggle it
    await page.locator('[data-testid="toggle-task-1"]').click();

    // The text should now have line-through style
    const taskText = page.locator('[data-testid="task-text-1"]');
    await expect(taskText).toHaveClass(/line-through/);

    // Toggle it again — it should be marked as NOT completed
    await page.locator('[data-testid="toggle-task-1"]').click();
    await expect(taskText).not.toHaveClass(/line-through/);
})

test('toggle complete on multiple tasks', async ({ page }) => {
  // Toggle task 1 (starts incomplete → becomes complete)
  await page.locator('[data-testid="toggle-task-1"]').click();
  await expect(page.locator('[data-testid="task-text-1"]')).toHaveClass(/line-through/);

  // Toggle task 3 (starts incomplete → becomes complete)
  await page.locator('[data-testid="toggle-task-3"]').click();
  await expect(page.locator('[data-testid="task-text-3"]')).toHaveClass(/line-through/);
});

 
// ============================================================
// 5. EDIT TASK TESTS
// ============================================================

test('opens edit mode when clicking edit button', async ({ page }) => {
    await page.locator('[data-testid="edit-task-1"]').click();
 
    // Edit input should appear
    await expect(page.locator('[data-testid="edit-input"]')).toBeVisible();
 
    // Save and cancel buttons should appear
    await expect(page.locator('[data-testid="save-edit-btn"]')).toBeVisible();
    await expect(page.locator('[data-testid="cancel-edit-btn"]')).toBeVisible();
  });

  test('saves edited task text', async ({ page }) => {
    await page.locator('[data-testid="edit-task-1"]').click();
 
    // Clear the input and type new text
    await page.locator('[data-testid="edit-input"]').clear();
    await page.locator('[data-testid="edit-input"]').fill('Updated task text');
 
    // Click save
    await page.locator('[data-testid="save-edit-btn"]').click();
 
    // Task text should now be updated
    await expect(page.locator('[data-testid="task-text-1"]')).toHaveText('Updated task text');
  });

  test('cancels edit without saving', async ({ page }) => {
    // Remember original text
    const originalText = await page.locator('[data-testid="task-text-1"]').innerText();
 
    await page.locator('[data-testid="edit-task-1"]').click();
    await page.locator('[data-testid="edit-input"]').fill('I will cancel this');
 
    // Click cancel
    await page.locator('[data-testid="cancel-edit-btn"]').click();
 
    // Text should be unchanged
    await expect(page.locator('[data-testid="task-text-1"]')).toHaveText(originalText);
  });
 
  test('saves edit by pressing Enter', async ({ page }) => {
    await page.locator('[data-testid="edit-task-2"]').click();
    await page.locator('[data-testid="edit-input"]').clear();
    await page.locator('[data-testid="edit-input"]').fill('Enter key save');
    await page.keyboard.press('Enter');
 
    await expect(page.locator('[data-testid="task-text-2"]')).toHaveText('Enter key save');
  });
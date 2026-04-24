import { test, expect } from '@playwright/test';


test.beforeEach(async ({ page }) => {
    await page.goto('/');
    }
);

test('Page Load', async ({ page }) => {
    // Check the main container is visible
    await expect(page.locator('[data-testid="app"]')).toBeVisible();
 
    // Check the title text is on screen
    await expect(page.locator('h1')).toContainText('Simple Task Manager');
    const cards = page.locator('[data-testid^="task-card-"]');
    await expect(cards).toHaveCount(3);
 });
 
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

  // ============================================================
// 6. DRAG AND DROP TESTS
// ============================================================

 test('order changes after drag', async ({ page }) => {
    // Capture ALL task texts before drag
    const taskTexts = page.locator('[data-testid^="task-text-"]');
    const orderBefore = await taskTexts.allInnerTexts();
    // e.g. ["Learn React basics", "Build a todo app", "Practice JavaScript"]
 
    const cards = page.locator('[data-testid^="task-card-"]');
 
    // Drag first card to last position
    await cards.first().dragTo(cards.last());
 
    // Capture order after
    const orderAfter = await taskTexts.allInnerTexts();
 
    // Order must have changed
    expect(orderAfter).not.toEqual(orderBefore);
  });

   test('dragged item lands at correct position', async ({ page }) => {
    const taskTexts = page.locator('[data-testid^="task-text-"]');
    const cards = page.locator('[data-testid^="task-card-"]');
 
    // Remember what was first
    const firstText = await taskTexts.first().innerText();
 
    // Drag first to last
    await cards.first().dragTo(cards.last());
 
    // What was first should now be last
    const lastText = await taskTexts.last().innerText();
    expect(lastText).toBe(firstText);
  });
  test('drag using manual mouse events (most reliable)', async ({ page }) => {
    // WHY this approach: your app uses onDragEnter which needs
    // gradual mouse movement to fire correctly. { steps: 10 }
    // simulates a real human slowly dragging.
 
    const cards = page.locator('[data-testid^="task-card-"]');
    const taskTexts = page.locator('[data-testid^="task-text-"]');
 
    // Remember second task text
    const secondText = await taskTexts.nth(1).innerText();
 
    // Get pixel positions of first and second cards
    const sourceBox = await cards.nth(0).boundingBox();
    const targetBox = await cards.nth(1).boundingBox();
 
    // Move mouse to center of source card
    await page.mouse.move(
      sourceBox.x + sourceBox.width / 2,
      sourceBox.y + sourceBox.height / 2
    );
 
    // Press mouse button down (start drag)
    await page.mouse.down();
 
    // Move SLOWLY to target — { steps: 10 } fires drag events gradually
    await page.mouse.move(
      targetBox.x + targetBox.width / 2,
      targetBox.y + targetBox.height / 2,
      { steps: 10 }
    );
 
    // Release mouse (drop)
    await page.mouse.up();
 
    // What was second should now be first
    const newFirstText = await taskTexts.first().innerText();
    expect(newFirstText).toBe(secondText);
  });


  // ============================================================


//   rememeber Terminal
  // ============================================================

//   # UI Mode — visual interface (what you want)
// npx playwright test --ui

// # Headed mode — just opens browser, no UI panel
// npx playwright test --headed

// # Run one specific file visually
// npx playwright test todo.spec.js --ui

// # Run one specific test by name
// npx playwright test --ui --grep "drag"

// # Slow down execution so you can SEE what's happening
// npx playwright test --headed --slow-mo=1000
// # 1000 = 1 second between each action a verifier 
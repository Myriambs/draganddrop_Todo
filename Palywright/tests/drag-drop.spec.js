import {test,expect} from './fixtures'


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

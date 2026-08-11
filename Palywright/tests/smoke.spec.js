

import {test,expect} from './fixtures'

test('Page Load', async ({ page }) => {
    // Check the main container is visible
    await expect(page.locator('[data-testid="app"]')).toBeVisible();
 
    // Check the title text is on screen
    await expect(page.locator('h1')).toContainText('Simple Task Manager');
    const cards = page.locator('[data-testid^="task-card-"]');
    await expect(cards).toHaveCount(3);
 });
import {test,expect} from './fixtures'
test('opens the search bar', async ({ page }) => {
  const searchBar = page.getByTestId('search-bar');

  await expect(searchBar).toHaveAttribute('data-search-open', 'false');

  await page.getByTestId('search-toggle').click();

  await expect(searchBar).toHaveAttribute('data-search-open', 'true');
  await expect(page.getByTestId('search-input')).toBeFocused();
});

test('filters tasks by search text', async ({ page }) => {
  await page.getByTestId('search-toggle').click();
  await page.getByTestId('search-input').fill('react');

  const cards = page.locator('[data-testid^="task-card-"]');

  await expect(cards).toHaveCount(1);
  await expect(page.getByTestId('task-list')).toContainText('Learn React basics');
});

test('shows empty state when no task matches', async ({ page }) => {
  await page.getByTestId('search-toggle').click();
  await page.getByTestId('search-input').fill('xyz123');

  await expect(page.locator('[data-testid^="task-card-"]')).toHaveCount(0);
  await expect(page.getByTestId('empty-state')).toHaveText('No tasks found');
});

test('closes search and clears its filter', async ({ page }) => {
  await page.getByTestId('search-toggle').click();
  await page.getByTestId('search-input').fill('react');

  await expect(page.locator('[data-testid^="task-card-"]')).toHaveCount(1);

  await page.getByTestId('search-toggle').click();

  await expect(page.getByTestId('search-bar'))
    .toHaveAttribute('data-search-open', 'false');

  await expect(page.getByTestId('search-input')).toHaveValue('');
  await expect(page.locator('[data-testid^="task-card-"]')).toHaveCount(3);
});
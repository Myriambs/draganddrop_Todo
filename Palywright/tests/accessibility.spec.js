import { test, expect } from './fixtures';
import AxeBuilder from '@axe-core/playwright';

test('has no accessibility violations', async ({ page }) => {
  const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

  expect(accessibilityScanResults.violations).toEqual([]);
});
import { test, expect } from './fixtures';
import { TaskManagerPage } from '../pages/TaskManagerPage.js';

test('mobile user can add, search, and delete a task', async ({ page }) => {
  const taskManager = new TaskManagerPage(page);
  const mobileTask = 'Test on mobile';

  // Add
  await taskManager.addTask(mobileTask);
  await expect(taskManager.taskList).toContainText(mobileTask);

  // Search
  await taskManager.openSearch();
  await taskManager.searchTask('mobile');
  await expect(taskManager.taskCards).toHaveCount(1);
  await expect(taskManager.taskList).toContainText(mobileTask);

  // Close search, then delete the new task (initial IDs are 1, 2, 3)
  await taskManager.closeSearch();
  await taskManager.deleteTask(4);

  await expect(taskManager.taskCard(4)).toHaveCount(0);
  await expect(taskManager.taskCards).toHaveCount(3);
});
// 


import { test, expect } from './fixtures';
import { TaskManagerPage } from '../pages/TaskManagerPage.js';

// ============================================================
// ADD TASK TESTS
// ============================================================

test('adds a task', async ({ page }) => {
  const taskManager = new TaskManagerPage(page);

  await taskManager.addTask('New task 12');

  // await expect(taskManager.taskCards).toHaveCount(4);
  await expect(taskManager.taskCards).toHaveCount(5);
  await expect(taskManager.taskList).toContainText('New task 12');
});

test('does not add an empty task', async ({ page }) => {
  const taskManager = new TaskManagerPage(page);

  await taskManager.addTask(' ');

  await expect(taskManager.taskCards).toHaveCount(3);
});

// ============================================================
// DELETE TASK TESTS
// ============================================================

test('deletes a task', async ({ page }) => {
  const taskManager = new TaskManagerPage(page);

  await taskManager.deleteTask(1);

  await expect(taskManager.taskCard(1)).toHaveCount(0);
  await expect(taskManager.taskCards).toHaveCount(2);
});

test('deletes one task while other tasks remain visible', async ({ page }) => {
  const taskManager = new TaskManagerPage(page);

  await taskManager.deleteTask(1);

  await expect(taskManager.taskCard(1)).toHaveCount(0);
  await expect(taskManager.taskCard(2)).toBeVisible();
  await expect(taskManager.taskCard(3)).toBeVisible();
  await expect(taskManager.taskCards).toHaveCount(2);
});

test('deletes all tasks and shows empty state', async ({ page }) => {
  const taskManager = new TaskManagerPage(page);

  await taskManager.deleteTask(1);
  await taskManager.deleteTask(2);
  await taskManager.deleteTask(3);

  await expect(taskManager.taskCards).toHaveCount(0);
  await expect(taskManager.emptyState).toContainText('No tasks found');
});

// ============================================================
// TOGGLE COMPLETE TESTS
// ============================================================

test('marks a task as complete', async ({ page }) => {
  const taskManager = new TaskManagerPage(page);

  await taskManager.toggleTask(1);

  await expect(taskManager.taskText(1)).toHaveClass(/line-through/);
});

test('toggles a task complete twice', async ({ page }) => {
  const taskManager = new TaskManagerPage(page);

  await taskManager.toggleTask(1);
  await expect(taskManager.taskText(1)).toHaveClass(/line-through/);

  await taskManager.toggleTask(1);
  await expect(taskManager.taskText(1)).not.toHaveClass(/line-through/);
});

test('marks multiple tasks as complete', async ({ page }) => {
  const taskManager = new TaskManagerPage(page);

  await taskManager.toggleTask(1);
  await expect(taskManager.taskText(1)).toHaveClass(/line-through/);

  await taskManager.toggleTask(3);
  await expect(taskManager.taskText(3)).toHaveClass(/line-through/);
});

// ============================================================
// EDIT TASK TESTS
// ============================================================

test('opens edit mode', async ({ page }) => {
  const taskManager = new TaskManagerPage(page);

  await taskManager.startEdit(1);

  await expect(taskManager.editInput).toBeVisible();
  await expect(taskManager.saveEditButton).toBeVisible();
  await expect(taskManager.cancelEditButton).toBeVisible();
});

test('saves edited task text', async ({ page }) => {
  const taskManager = new TaskManagerPage(page);

  await taskManager.startEdit(1);
  await taskManager.saveEdit('Updated task text');

  await expect(taskManager.taskText(1)).toHaveText('Updated task text');
});

test('cancels edit without saving', async ({ page }) => {
  const taskManager = new TaskManagerPage(page);

  const originalText = await taskManager.taskText(1).innerText();

  await taskManager.startEdit(1);
  await taskManager.typeEditText('I will cancel this');
  await taskManager.cancelEdit();

  await expect(taskManager.taskText(1)).toHaveText(originalText);
});

test('saves an edit by pressing Enter', async ({ page }) => {
  const taskManager = new TaskManagerPage(page);

  await taskManager.startEdit(2);
  await taskManager.saveEditWithEnter('Enter key save');

  await expect(taskManager.taskText(2)).toHaveText('Enter key save');
});
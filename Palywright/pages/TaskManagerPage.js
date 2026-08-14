export class TaskManagerPage {
  constructor(page) {
    this.page = page;

    this.newTaskInput = page.getByTestId('new-task-input');
    this.addTaskButton = page.getByTestId('add-task-btn');
    this.searchToggle = page.getByTestId('search-toggle');
    this.searchInput = page.getByTestId('search-input');
    this.taskList = page.getByTestId('task-list');
    this.emptyState = page.getByTestId('empty-state');
    this.editInput = page.getByTestId('edit-input');
this.saveEditButton = page.getByTestId('save-edit-btn');
this.cancelEditButton = page.getByTestId('cancel-edit-btn');
  }

  get taskCards() {
    return this.page.locator('[data-testid^="task-card-"]');
  }

  taskCard(id) {
    return this.page.getByTestId(`task-card-${id}`);
  }

  taskText(id) {
    return this.page.getByTestId(`task-text-${id}`);
  }

  async addTask(text) {
    await this.newTaskInput.fill(text);
    await this.addTaskButton.click();
  }

  async addTaskWithEnter(text) {
    await this.newTaskInput.fill(text);
    await this.newTaskInput.press('Enter');
  }

  async deleteTask(id) {
    await this.page.getByTestId(`delete-task-${id}`).click();
  }

  async toggleTask(id) {
    await this.page.getByTestId(`toggle-task-${id}`).click();
  }

  async startEdit(id) {
    await this.page.getByTestId(`edit-task-${id}`).click();
  }

  async saveEdit(text) {
    await this.page.getByTestId('edit-input').fill(text);
    await this.page.getByTestId('save-edit-btn').click();
  }

  async cancelEdit() {
    await this.page.getByTestId('cancel-edit-btn').click();
  }

  async openSearch() {
    await this.searchToggle.click();
  }

  async searchTask(text) {
    await this.searchInput.fill(text);
  }

  async closeSearch() {
    await this.searchToggle.click();
  }
  async typeEditText(text) {
  await this.editInput.fill(text);
}

async saveEdit(text) {
  await this.typeEditText(text);
  await this.saveEditButton.click();
}

async saveEditWithEnter(text) {
  await this.typeEditText(text);
  await this.editInput.press('Enter');
}

async cancelEdit() {
  await this.cancelEditButton.click();
}
}
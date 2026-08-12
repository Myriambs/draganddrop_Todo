# Simple Task Manager — QA Automation Project

A React task-management application upgraded with manual testing, Playwright end-to-end automation, and AI-assisted exploratory testing.

## Technologies

- JavaScript
- React
- HTML
- CSS
- Node.js
- Playwright
- GitHub Actions
- Playwright MCP / GitHub Copilot MCP

## Features Tested

- Add tasks, including using Enter
- Edit, save, and cancel edits
- Complete and uncomplete tasks
- Delete individual tasks and all tasks
- Search and empty states
- Drag-and-drop task reordering

## Manual Testing

Manual test cases were designed and executed before automation.

See: [`docs/manual-test-cases.md`](docs/manual-test-cases.md)

Coverage includes positive, negative, keyboard, empty-state, search, edit, deletion, and drag-and-drop scenarios.

## Automated Testing

Playwright end-to-end tests are organised by feature:

```text
tests/
  smoke.spec.js
  tasks.spec.js
  search.spec.js
  drag-drop.spec.js
  fixtures.js
```

### Run All Tests

```bash
npx playwright test
```

### Run with the Visual Test Runner

```bash
npx playwright test --ui
```

### Run Tests with a Visible Browser

```bash
npx playwright test --headed
```

## Cross-Browser Testing

The test suite runs on Chromium, Firefox, and WebKit through Playwright.

## CI/CD

GitHub Actions runs the Playwright test suite automatically on every push and pull request.

## Playwright MCP

Playwright MCP was used for AI-assisted exploratory testing, UI inspection, and accessibility checks, including icon-button labels and keyboard behavior.

## Test Evidence

Add your screenshots in this folder:

```text
docs/
  evidence/
    mcp-exploratory-test.png
    empty-state.png
    mcp-test-report.png
```

Example evidence files:

- [`mcp-exploratory-test.png`](docs/evidence/mcp-exploratory-test.png)
- [`empty-state.png`](docs/evidence/empty-state.png)
- [`mcp-test-report.png`](docs/evidence/mcp-test-report.png)
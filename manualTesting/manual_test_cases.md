# Manual tets case 
 tester : Ben Salah Meriam 
 **Date** : 10/08/2026
 **Envirement**: windows 11 , Browser : Chrom 


 ## Test Execution summary : 
| Total | Passed | Failed | Not run |
| --- | --- | --- | --- |
| 18 |  |  |  |

**Status guide:** Change `Not run` to `Pass` or `Fail` after performing each test. Record what actually happened and any issue number in Notes.
## 1. Page loading

| Test ID | Feature | Steps | Expected result | Actual result | Status | Notes / bug reference |
| TC-LOAD-001 | Initial page load | 1. Open the application .<br>2. Wait until the page finishes loading. | The Simple Task Manager title, new-task input, Add button, search icon, and task list are visible. |  | Pass |  |
| TC-LOAD-002 | Initial tasks | 1. Open the application.<br>2. Inspect the task list. | Three tasks are shown: “Learn React basics,” “Build a todo app,” and “Practice JavaScript.” “Build a todo app” is marked complete. |  | Pass |  |

## 2. Add tasks

| Test ID | Feature | Steps | Expected result | Actual result | Status | Notes / bug reference |
| --- | --- | --- | --- | --- | --- | --- |
| TC-ADD-001 | Add Valid Task| 1. Open the application .<br>2. Wait until the page finishes loading.add " Prepare Manual test" in the new task inpout . Click "Add" button | The new task appear under the previous ones . The list now Containes 4 tasks  |  | Pass |  |
| TC-ADD-002 | Prevent empty task | 1. Type only spaces in the new-task input.<br>2. Click **Add**. | No task is added. The list remains at three tasks. |  | Pass |  |
| TC-ADD-003 | Add using Enter | 1. Type `Write manual tests` in the new-task input.<br>2. Press **Enter**. | The new task appears and the input is cleared. |  | Pass |  |

## 3. Delete tasks

| Test ID | Feature | Steps | Expected result | Actual result | Status | Notes / bug reference |
| --- | --- | --- | --- | --- | --- |
| TC-DELETE-001 | Delete one task | 1. Find “Learn React basics.”<br>2. Click its delete (trash) button. | Only “Learn React basics” is removed. The other two initial tasks remain visible. |  | Pass |  |
| TC-DELETE-002 | Delete all tasks | 1. Delete each task one by one.<br>2. Inspect the task-list area. | No task cards remain. The message “No tasks found” is visible. |  | Pass |  |

## 4. Complete tasks

| Test ID | Feature | Steps | Expected result | Actual result | Status | Notes / bug reference |
| --- | --- | --- | --- | --- | --- |
| TC-COMPLETE-001 | Mark task complete | 1. Find “Learn React basics.”<br>2. Click its completion button. | The task gains a checkmark and its text has a line-through style. |  | Pass |  |
| TC-COMPLETE-002 | Mark task incomplete | 1. Complete “Learn React basics.”<br>2. Click its completion button again. | The checkmark and line-through style are removed. |  | Pass |  |

## 5. Edit tasks

| Test ID | Feature | Steps | Expected result | Actual result | Status | Notes / bug reference |
| --- | --- | --- | --- | --- | --- |
| TC-EDIT-001 | Open edit mode | 1. Click the edit button for “Learn React basics.” | An input containing the current task text, a save button, and a cancel button are shown. |  | Pass |  |
| TC-EDIT-002 | Save edit | 1. Click edit for “Learn React basics.”<br>2. Replace the text with `Learn React and Playwright`.<br>3. Click save. | The edited text appears in the task list. Edit controls disappear. |  | Pass |  |
| TC-EDIT-003 | Cancel edit | 1. Click edit for “Learn React basics.”<br>2. Change the text to `This should not save`.<br>3. Click cancel. | The original task text remains unchanged. Edit controls disappear. |  | Pass |  |
| TC-EDIT-004 | Save edit with Enter | 1. Click edit for “Build a todo app.”<br>2. Change the text to `Build a tested todo app`.<br>3. Press **Enter**. | The edited text is saved and edit mode closes. |  | Pass |  |
| TC-EDIT-005 | Prevent blank edit | 1. Click edit for any task.<br>2. Remove all text or enter only spaces.<br>3. Click save. | The task text is not replaced by a blank value. |  | Pass |  |

## 6. Search and filtering

| Test ID | Feature | Steps | Expected result | Actual result | Status | Notes / bug reference |
| --- | --- | --- | --- | --- | --- | --- |
| TC-SEARCH-001 | Open search | 1. Click the search icon. | The search input becomes visible and receives focus. |  | Pass |  |
| TC-SEARCH-002 | Find matching task | 1. Open search.<br>2. Type `react`. | Only the task containing “React” is displayed. Search is case-insensitive. |  | Pass |  |
| TC-SEARCH-003 | No search results | 1. Open search.<br>2. Type `xyz123`. | No task cards are displayed and “No tasks found” is shown. |  | Pass |  |
| TC-SEARCH-004 | Close search | 1. Open search.<br>2. Type a search term.<br>3. Click the search icon again. | The search input closes, its value is cleared, and all tasks are visible again. |  | Pass |  |

## 7. Drag and drop

| Test ID | Feature | Steps | Expected result | Actual result | Status | Notes / bug reference |
| --- | --- | --- | --- | --- | --- | --- |
| TC-DRAG-001 | Reorder tasks | 1. Note the order of the three tasks.<br>2. Drag the first task onto the last task.<br>3. Release the mouse. | The list order changes; the originally first task moves to the final position. |  | Pass |  |
| TC-DRAG-002 | Keep task data after drag | 1. Drag one task to a new position.<br>2. Inspect its text and completion state. | The task keeps its original text and completion status after moving. |  |Pass |  |

## Defects found

| Bug ID | Related test ID | Description | Severity | Status |
| --- | --- | --- | --- | --- |
| BUG-001 |  |  | Low / Medium / High | Open | No But TO mention the app is at first version 
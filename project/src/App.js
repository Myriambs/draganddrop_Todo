import React, { useState, useRef, useMemo, useEffect } from "react";
import { Plus, Edit3, Trash2, Check, X } from "lucide-react";
import './App.css'

const TaskManager = () => {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Learn React basics", completed: false },
    { id: 2, text: "Build a todo app", completed: true },
    { id: 3, text: "Practice JavaScript", completed: false },
  ]);

  const [newTask, setNewTask] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const nextId = useRef(4);
  const dragItem = useRef(null);
  const dragOverItem = useRef(null);

  const filteredTasks = useMemo(() => {
    if (!searchQuery.trim()) return tasks;
    const lowerQuery = searchQuery.toLowerCase();
    return tasks.filter(task => task.text.toLowerCase().includes(lowerQuery));
  }, [tasks, searchQuery]);

  const handleDrop = () => {
    const copyTasks = [...tasks];
    const draggedItemContent = copyTasks[dragItem.current];
    copyTasks.splice(dragItem.current, 1);
    copyTasks.splice(dragOverItem.current, 0, draggedItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setTasks(copyTasks);
  };

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([
        ...tasks,
        { id: nextId.current++, text: newTask.trim(), completed: false },
      ]);
      setNewTask("");
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const startEdit = (id, text) => {
    setEditingId(id);
    setEditText(text);
  };

  const saveEdit = () => {
    if (editText.trim()) {
      setTasks(
        tasks.map((task) =>
          task.id === editingId ? { ...task, text: editText.trim() } : task
        )
      );
    }
    setEditingId(null);
    setEditText("");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText("");
  };

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
    if (isSearchVisible) {
      setSearchQuery('');
    }
  };

  useEffect(() => {
    if (isSearchVisible) {
      const input = document.getElementById('searchInput');
      if (input) input.focus();
    }
  }, [isSearchVisible]);

  return (
    // WHY: data-testid="app" → lets Playwright verify the whole app loaded
    <div data-testid="app" className="max-w-2xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Simple Task Manager (Drag & Drop ✅)
        </h1>

        {/* 
          WHY: data-testid="search-toggle" → Playwright needs to CLICK this icon
          to open the search bar. Without this, it's hard to target an SVG.
        */}
        <div
          data-testid="search-toggle"
          className="search-toggle cursor-pointer inline-block mb-4"
          onClick={toggleSearch}
        >
          <svg className="search-icon w-6 h-6 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
        </div>

        {/* 
          WHY: data-testid="search-bar" → lets Playwright check if the bar
          is visible or hidden (toBeVisible / toBeHidden)
        */}
        <div
          data-testid="search-bar"
          className={`search-bar mb-6 flex items-center gap-2 transition-all duration-300 ${
            isSearchVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
          }`}
        >
          {/* 
            WHY: data-testid="search-input" → Playwright types into this input
            to test filtering. This is the most important search element.
          */}
          <input
            type="text"
            id="searchInput"
            data-testid="search-input"
            placeholder="Filter tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg outline-none"
          />
        </div>

        {/* Input for Adding Tasks */}
        <div className="flex gap-2 mb-6">
          {/* 
            WHY: data-testid="new-task-input" → Playwright fills this to add a task.
            Most used element in ALL your tests.
          */}
          <input
            data-testid="new-task-input"
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && addTask()}
            placeholder="Add a new task..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
          />
          {/* 
            WHY: data-testid="add-task-btn" → Playwright clicks this to submit.
            Must be separate from the input so Playwright can click OR press Enter.
          */}
          <button
            data-testid="add-task-btn"
            onClick={addTask}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-1"
          >
            <Plus size={20} /> Add
          </button>
        </div>

        {/* 
          WHY: data-testid="task-list" → lets Playwright check the whole list
          e.g. how many tasks exist: page.locator('[data-testid="task-list"] > *')
        */}
        <div data-testid="task-list" className="space-y-2">
          {filteredTasks.map((task, index) => (
            /*
              WHY: data-testid={`task-card-${task.id}`} → unique ID per card.
              This lets Playwright target a SPECIFIC task, not just "any task".
              Example: page.locator('[data-testid="task-card-1"]')
              
              Also: data-index={index} → useful for drag & drop tests to know
              the current visual position of each card.
            */
            <div
              key={task.id}
              data-testid={`task-card-${task.id}`}
              data-index={index}
              draggable
              onDragStart={() => (dragItem.current = index)}
              onDragEnter={() => (dragOverItem.current = index)}
              onDragEnd={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              className={`flex items-center gap-3 p-4 border rounded-lg cursor-move ${
                task.completed ? "bg-gray-50" : "bg-white hover:bg-gray-100"
              }`}
            >
              {/* 
                WHY: data-testid={`toggle-task-${task.id}`} → Playwright clicks
                this to mark a task complete. Unique per task so we can target
                exactly which task to toggle.
              */}
              <button
                data-testid={`toggle-task-${task.id}`}
                onClick={() => toggleTask(task.id)}
                className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                  task.completed
                    ? "bg-green-500 border-green-500 text-white"
                    : "border-gray-300"
                }`}
              >
                {task.completed && <Check size={12} />}
              </button>

              {editingId === task.id ? (
                <div className="flex-1 flex gap-2">
                  {/* 
                    WHY: data-testid="edit-input" → Playwright types the new text here.
                    Only exists in DOM when editing, so name doesn't need to be unique.
                  */}
                  <input
                    data-testid="edit-input"
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && saveEdit()}
                    className="flex-1 px-2 py-1 border border-gray-300 rounded"
                    autoFocus
                  />
                  {/* 
                    WHY: data-testid="save-edit-btn" → Playwright clicks this to confirm edit.
                  */}
                  <button
                    data-testid="save-edit-btn"
                    onClick={saveEdit}
                    className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    <Check size={14} />
                  </button>
                  {/* 
                    WHY: data-testid="cancel-edit-btn" → Playwright clicks this to cancel.
                    Important to test that cancelling does NOT save changes.
                  */}
                  <button
                    data-testid="cancel-edit-btn"
                    onClick={cancelEdit}
                    className="px-2 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
                  >
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <>
                  {/* 
                    WHY: data-testid={`task-text-${task.id}`} → Playwright reads
                    this text to verify content. CRITICAL for drag & drop tests
                    where we check "is the right text in the right position?"
                  */}
                  <span
                    data-testid={`task-text-${task.id}`}
                    className={`flex-1 ${task.completed ? "line-through text-gray-500" : ""}`}
                  >
                    {task.text}
                  </span>
                  {/* 
                    WHY: data-testid={`edit-task-${task.id}`} → Playwright clicks
                    this to START editing a specific task.
                  */}
                  <button
                    data-testid={`edit-task-${task.id}`}
                    onClick={() => startEdit(task.id, task.text)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <Edit3 size={16} />
                  </button>
                  {/* 
                    WHY: data-testid={`delete-task-${task.id}`} → Playwright clicks
                    this to delete a specific task, then checks it's gone.
                  */}
                  <button
                    data-testid={`delete-task-${task.id}`}
                    onClick={() => deleteTask(task.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={16} />
                  </button>
                </>
              )}
            </div>
          ))}
        </div>

        {/* 
          WHY: data-testid="empty-state" → when all tasks are deleted or
          filtered out, Playwright can check this message appears.
          Add this below the task list.
        */}
        {filteredTasks.length === 0 && (
          <div data-testid="empty-state" className="text-center text-gray-400 py-8">
            No tasks found
          </div>
        )}

      </div>
    </div>
  );
};

export default TaskManager;
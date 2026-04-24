import React, { useState, useRef, useMemo, useEffect } from "react";
import { Plus, Edit3, Trash2, Check, X } from "lucide-react";
// Removed './TodoFilter.css' import since you're using Tailwind; add back if needed
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
  // Filter states
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const nextId = useRef(4);
  const dragItem = useRef(null); // index de l’élément qu’on déplace
  const dragOverItem = useRef(null); // index de l’élément sur lequel on passe

  // Computed filtered tasks (efficient with useMemo)
  const filteredTasks = useMemo(() => {
    if (!searchQuery.trim()) return tasks;
    const lowerQuery = searchQuery.toLowerCase();
    return tasks.filter(task => task.text.toLowerCase().includes(lowerQuery));
  }, [tasks, searchQuery]);

  // ➡️ Fonction pour réordonner (works on filteredTasks, but updates original tasks)
  const handleDrop = () => {
    const copyTasks = [...tasks]; // Always reorder the full tasks array
    const draggedItemContent = copyTasks[dragItem.current];

    // On enlève l’élément déplacé
    copyTasks.splice(dragItem.current, 1);
    // On l’insère à la nouvelle position
    copyTasks.splice(dragOverItem.current, 0, draggedItemContent);

    dragItem.current = null;
    dragOverItem.current = null;

    setTasks(copyTasks);
  };

  // Ajouter une tâche
  const addTask = () => {
    if (newTask.trim()) {
      setTasks([
        ...tasks,
        { id: nextId.current++, text: newTask.trim(), completed: false },
      ]);
      setNewTask("");
    }
  };

  // Supprimer une tâche
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Toggle completed
  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Edit start
  const startEdit = (id, text) => {
    setEditingId(id);
    setEditText(text);
  };

  // Save edit
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

  // Cancel edit
  const cancelEdit = () => {
    setEditingId(null);
    setEditText("");
  };

  // Toggle search bar visibility
  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
    if (isSearchVisible) {
      // Reset when hiding
      setSearchQuery('');
    }
  };

  // Handle search button click
  const handleSearch = () => {
    // Filtering is handled automatically via useMemo
  };

  // Handle Enter key in input
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      // Filtering is handled automatically via useMemo
    }
  };

  // Auto-focus input when search bar appears
  useEffect(() => {
    if (isSearchVisible) {
      const input = document.getElementById('searchInput');
      if (input) input.focus();
    }
  }, [isSearchVisible]);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Simple Task Manager (Drag & Drop ✅)
        </h1>
        {/* Search Toggle */}
        <div className="search-toggle cursor-pointer inline-block mb-4" onClick={toggleSearch}>
          <svg className="search-icon w-6 h-6 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
        </div>
        {/* Search Bar */}
        <div className={`search-bar mb-6 flex items-center gap-2 transition-all duration-300 ${isSearchVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}`}>
          <input
            type="text"
            id="searchInput"
            placeholder="Filter tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg outline-none"
          />
        
        </div>
        {/* Input for Adding Tasks */}
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && addTask()}
            placeholder="Add a new task..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
          />
          <button
            onClick={addTask}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            <Plus size={20} /> Add
          </button>
        </div>

        {/* Task List */}
        <div className="space-y-2">
          {filteredTasks.map((task, index) => (
            <div
              key={task.id}
              draggable
              onDragStart={() => (dragItem.current = index)}
              onDragEnter={() => (dragOverItem.current = index)}
              onDragEnd={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              className={`flex items-center gap-3 p-4 border rounded-lg cursor-move ${
                task.completed ? "bg-gray-50" : "bg-white hover:bg-gray-100"
              }`}
            >
              {/* Checkbox */}
              <button
                onClick={() => toggleTask(task.id)}
                className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                  task.completed
                    ? "bg-green-500 border-green-500 text-white"
                    : "border-gray-300"
                }`}
              >
                {task.completed && <Check size={12} />}
              </button>

              {/* Content */}
              {editingId === task.id ? (
                <div className="flex-1 flex gap-2">
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && saveEdit()}
                    className="flex-1 px-2 py-1 border border-gray-300 rounded"
                    autoFocus
                  />
                  <button
                    onClick={saveEdit}
                    className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    <Check size={14} />
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="px-2 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
                  >
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <>
                  <span
                    className={`flex-1 ${
                      task.completed ? "line-through text-gray-500" : ""
                    }`}
                  >
                    {task.text}
                  </span>
                  <button
                    onClick={() => startEdit(task.id, task.text)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <Edit3 size={16} />
                  </button>
                  <button
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
      </div>
    </div>
  );
};

export default TaskManager;

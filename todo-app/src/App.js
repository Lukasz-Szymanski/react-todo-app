import React, { useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setTasks([...tasks, { title: inputValue, completed: false, id: Date.now() }]);
    setInputValue("");
  };

  const handleEdit = (index, e) => {
    e.preventDefault();
    const updatedTasks = [...tasks];
    updatedTasks[index].title = editValue;
    setTasks(updatedTasks);
    setEditIndex(null);
    setEditValue("");
  };

  const handleDelete = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  return (
    <div className="main">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Wpisz zadanie"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit">Dodaj zadanie</button>
      </form>

      <ul>
        {tasks.map((task, index) => (
          <li key={task.id} id={`task-${task.id}`}>
            <div>
              {task.completed ? <del>{task.title}</del> : task.title}
              <button
                onClick={() =>
                  setTasks(
                    tasks.map((t) =>
                      t.id === task.id ? { ...t, completed: !t.completed } : t
                    )
                  )
                }
              >
                {task.completed ? "Nieukończone" : "Ukończone"}
              </button>
              <button type="button" onClick={() => setEditIndex(index)}>
                Edytuj
              </button>
              <button type="button" onClick={() => handleDelete(task.id)}>
                Usuń
              </button>
            </div>
            {editIndex !== index ? (
              ""
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleEdit(index, e);
                }}
              >
                <input
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                />
                <button type="submit">Zapisz</button>
              </form>

            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

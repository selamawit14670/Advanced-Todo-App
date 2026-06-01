import { useState } from "react";

function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (!title.trim()) return;

    onAddTask(title);

    setTitle("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add a task..."
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />

      <button type="submit">Add</button>
    </form>
  );
}

export default TaskForm;
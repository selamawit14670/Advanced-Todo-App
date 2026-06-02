import { useState } from "react";
import TaskMenu from "./TaskMenu";
import SubtaskItem from "./SubtaskItem";

function TaskItem({ task, tasks, setTasks }) {
  const [showMenu, setShowMenu] = useState(false);

  const [isEditing, setIsEditing] = useState(false);

  const [editedTitle, setEditedTitle] =
    useState(task.title);

  const [showDeadlineInput, setShowDeadlineInput] =
    useState(false);

  const [deadline, setDeadline] = useState(
    task.deadline || ""
  );

  const [showSubtaskInput, setShowSubtaskInput] =
    useState(false);

  const [subtaskTitle, setSubtaskTitle] =
    useState("");
  
  const [showEstimateInput, setShowEstimateInput] =
    useState(false);

  const [estimate, setEstimate] = useState(
    task.estimate || ""
  );

  const [showPriorityMenu, setShowPriorityMenu] =
    useState(false);

  const [showReminderInput, setShowReminderInput] =
    useState(false);

  const [reminder, setReminder] = useState(
    task.reminder || ""
  );

  const [showRecurrenceMenu, setShowRecurrenceMenu] =
    useState(false);

  async function changeRecurrence(type) {
  const updatedTask = {
    ...task,
    recurring: type,
  };

  try {
    const response = await fetch(
      `https://advanced-todo-app-wm53.onrender.com/tasks/${task.id}`,
      {
        method: "PUT",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify(
          updatedTask
        ),
      }
    );

    const data =
      await response.json();

    const updatedTasks = tasks.map(
      (currentTask) => {
        if (
          currentTask.id === task.id
        ) {
          return data;
        }

        return currentTask;
      }
    );

    setTasks(updatedTasks);

    setShowRecurrenceMenu(false);
  } catch (error) {
    console.log(error);
  }
}

  function openReminderInput() {
    setShowReminderInput(true);

    setShowMenu(false);
  }

  function saveReminder() {
  const updatedTasks = tasks.map(
    (currentTask) => {
      if (currentTask.id === task.id) {
        return {
          ...currentTask,
          reminder,
        };
      }

      return currentTask;
    }
  );

  setTasks(updatedTasks);

  setShowReminderInput(false);
}

 async function changePriority(
  priority
) {
  const updatedTask = {
    ...task,
    priority,
  };

  try {
    const response = await fetch(
      `https://advanced-todo-app-wm53.onrender.com/tasks/${task.id}`,
      {
        method: "PUT",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify(
          updatedTask
        ),
      }
    );

    const data =
      await response.json();

    const updatedTasks = tasks.map(
      (currentTask) => {
        if (
          currentTask.id === task.id
        ) {
          return data;
        }

        return currentTask;
      }
    );

    setTasks(updatedTasks);

    setShowPriorityMenu(false);

    setShowMenu(false);
  } catch (error) {
    console.log(error);
  }
}

  function openEstimateInput() {
  setShowEstimateInput(true);

  setShowMenu(false);
  }

  async function saveEstimate() {
  const updatedTask = {
    ...task,
    estimate,
  };

  try {
    const response = await fetch(
      `https://advanced-todo-app-wm53.onrender.com/tasks/${task.id}`,
      {
        method: "PUT",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify(
          updatedTask
        ),
      }
    );

    const data =
      await response.json();

    const updatedTasks = tasks.map(
      (currentTask) => {
        if (
          currentTask.id === task.id
        ) {
          return data;
        }

        return currentTask;
      }
    );

    setTasks(updatedTasks);

    setShowEstimateInput(false);
  } catch (error) {
    console.log(error);
  }
}

  function toggleMenu() {
    setShowMenu(!showMenu);
  }

  async function deleteTask() {
  try {
    await fetch(
      `https://advanced-todo-app-wm53.onrender.com/tasks/${task.id}`,
      {
        method: "DELETE",
      }
    );

    const updatedTasks =
      tasks.filter(
        (currentTask) =>
          currentTask.id !== task.id
      );

    setTasks(updatedTasks);
  } catch (error) {
    console.log(error);
  }
}

  async function toggleComplete() {
  const updatedTask = {
    ...task,
    completed: !task.completed,
  };

  try {
    const response = await fetch(
      `https://advanced-todo-app-wm53.onrender.com/tasks/${task.id}`,
      {
        method: "PUT",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify(
          updatedTask
        ),
      }
    );

    const data =
      await response.json();

    const updatedTasks = tasks.map(
      (currentTask) => {
        if (
          currentTask.id === task.id
        ) {
          return data;
        }

        return currentTask;
      }
    );

    setTasks(updatedTasks);
  } catch (error) {
    console.log(error);
  }
}

  function startEditing() {
    setIsEditing(true);

    setShowMenu(false);
  }

  async function saveEditedTask() {
  const updatedTask = {
    ...task,
    title: editedTitle,
  };

  try {
    const response = await fetch(
      `https://advanced-todo-app-wm53.onrender.com/tasks/${task.id}`,
      {
        method: "PUT",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify(
          updatedTask
        ),
      }
    );

    const data =
      await response.json();

    const updatedTasks = tasks.map(
      (currentTask) => {
        if (
          currentTask.id === task.id
        ) {
          return data;
        }

        return currentTask;
      }
    );

    setTasks(updatedTasks);

    setIsEditing(false);
  } catch (error) {
    console.log(error);
  }
}


  function openDeadlineInput() {
    setShowDeadlineInput(true);

    setShowMenu(false);
  }

  async function saveDeadline() {
  const updatedTask = {
    ...task,
    deadline,
  };

  try {
    const response = await fetch(
      `https://advanced-todo-app-wm53.onrender.com/tasks/${task.id}`,
      {
        method: "PUT",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify(
          updatedTask
        ),
      }
    );

    const data =
      await response.json();

    const updatedTasks = tasks.map(
      (currentTask) => {
        if (
          currentTask.id === task.id
        ) {
          return data;
        }

        return currentTask;
      }
    );

    setTasks(updatedTasks);

    setShowDeadlineInput(false);
  } catch (error) {
    console.log(error);
  }
}

  function openSubtaskInput() {
    setShowSubtaskInput(true);

    setShowMenu(false);
  }

  function addSubtask() {
    if (!subtaskTitle.trim()) return;

    const updatedTasks = tasks.map(
      (currentTask) => {
        if (currentTask.id === task.id) {
          return {
            ...currentTask,

            subtasks: [
              ...(currentTask.subtasks || []),

              {
                id: Date.now(),
                title: subtaskTitle,
                estimate: "",
              },
            ],
          };
        }

        return currentTask;
      }
    );

    setTasks(updatedTasks);

    setSubtaskTitle("");

    setShowSubtaskInput(false);
  }

  const isOverdue =
  task.deadline &&
  new Date(task.deadline) <
    new Date() &&
  !task.completed;

  return (
    <div
  className={`task-card
    ${
      task.recurrence === "Daily"
        ? "recurring-daily"
        : ""
    }

    ${
      task.recurrence === "Weekly"
        ? "recurring-weekly"
        : ""
    }

    ${
      task.recurrence === "Monthly"
        ? "recurring-monthly"
        : ""
    }
  `}
>
      <div className="task-content">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={toggleComplete}
        />

        <div className="task-info">
          <div
           className={`priority-badge ${task.priority}`}
          >
           {task.priority}
          </div>
          {isEditing ? (
            <input
              type="text"
              value={editedTitle}
              onChange={(event) =>
                setEditedTitle(
                  event.target.value
                )
              }
            />
          ) : (
            <p
              className="task-title"
              style={{
                textDecoration:
                  task.completed
                    ? "line-through"
                    : "none",

                opacity: task.completed
                  ? 0.5
                  : 1,
              }}
            >
              {task.title}
            </p>
          )}

          {task.estimate && (
            <p className="estimate-text">
               ⏱ {task.estimate}
            </p>
          )}

          {isOverdue && (
            <p className="overdue-text">
             ⚠️ Overdue
            </p>
          )}

          {task.deadline && (
            <p className="deadline-text">
              Deadline: {task.deadline}
            </p>
          )}

          {task.subtasks?.length > 0 && (
            <div className="subtasks-list">
              {task.subtasks.map((subtask) => (
                <SubtaskItem
                  key={subtask.id}
                  subtask={subtask}
                  task={task}
                  tasks={tasks}
                  setTasks={setTasks}
                />
             ))}
           </div>
          )}

          {showDeadlineInput && (
            <div className="deadline-container">
              <input
                type="date"
                value={deadline}
                onChange={(event) =>
                  setDeadline(
                    event.target.value
                  )
                }
              />

              <button onClick={saveDeadline}>
                Save Deadline
              </button>
            </div>
          )}

          {showSubtaskInput && (
            <div className="subtask-container">
              <input
                type="text"
                placeholder="Add subtask..."
                value={subtaskTitle}
                onChange={(event) =>
                  setSubtaskTitle(
                    event.target.value
                  )
                }
              />

              <button onClick={addSubtask}>
                Add
              </button>
            </div>
          )}

          {showEstimateInput && (
  <div className="estimate-container">
    <input
      type="text"
      placeholder="2h or 30m..."
      value={estimate}
      onChange={(event) =>
        setEstimate(event.target.value)
      }
    />

    <button onClick={saveEstimate}>
      Save Estimate
    </button>
  </div>
)}
        </div>
      </div>

      {isEditing ? (
  <button onClick={saveEditedTask}>
    Save
  </button>
) : (
  <>
    <button
      className="menu-button"
      onClick={toggleMenu}
    >
      ⋮
    </button>

    {showMenu && (
      <TaskMenu
        onDelete={deleteTask}
        onEdit={startEditing}
        onDeadline={openDeadlineInput}
        onSubtask={openSubtaskInput}
        onEstimate={openEstimateInput}
        onPriority={() =>
          setShowPriorityMenu(
            !showPriorityMenu
          )
        }
        onReminder={openReminderInput}
        onRecurrence={() =>
          setShowRecurrenceMenu(
            !showRecurrenceMenu
          )
        }
      />
    )}

    {showPriorityMenu && (
      <div className="priority-menu">
        <button
          onClick={() =>
            changePriority("High")
          }
        >
          🔴 High
        </button>

        <button
          onClick={() =>
            changePriority("Medium")
          }
        >
          🟡 Medium
        </button>

        <button
          onClick={() =>
            changePriority("Low")
          }
        >
          🟢 Low
        </button>
      </div>
    )}

    {showReminderInput && (
  <div className="reminder-container">
    <input
      type="datetime-local"
      value={reminder}
      onChange={(event) =>
        setReminder(event.target.value)
      }
    />

    <button onClick={saveReminder}>
      Save Reminder
    </button>
  </div>
)}

    {showRecurrenceMenu && (
  <div className="priority-menu">
    <button
      onClick={() =>
        changeRecurrence("Daily")
      }
    >
      Daily
    </button>

    <button
      onClick={() =>
        changeRecurrence("Weekly")
      }
    >
      Weekly
    </button>

    <button
      onClick={() =>
        changeRecurrence("Monthly")
      }
    >
      Monthly
    </button>
  </div>
)}
  </>
)}
    </div>
  );
}

export default TaskItem;
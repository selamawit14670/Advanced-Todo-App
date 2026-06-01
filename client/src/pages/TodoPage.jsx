import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

function TodoPage() {
  const navigate = useNavigate();

  const [tasks, setTasks] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [filter, setFilter] =
    useState("All");

  const [darkMode, setDarkMode] =
    useState(false);

  const [activeTab, setActiveTab] =
    useState("Daily");

  const [weeklyDay, setWeeklyDay] =
    useState("Monday");

  const [monthlyWeek, setMonthlyWeek] =
    useState("Week 1");

  // NOTIFICATION PERMISSION
  useEffect(() => {
    if (
      Notification.permission !==
      "granted"
    ) {
      Notification.requestPermission();
    }
  }, []);

  useEffect(() => {
  const token =
    localStorage.getItem("token");

  if (!token) {
    navigate("/login");
  }
}, [navigate]);

  useEffect(() => {
    fetchTasks();
  }, []);

  // OVERDUE NOTIFICATIONS
  useEffect(() => {
    tasks.forEach((task) => {
      const isOverdue =
        task.deadline &&
        new Date(task.deadline) <
          new Date() &&
        !task.completed;

      if (isOverdue) {
        new Notification(
          "⚠️ Task Reminder",
          {
            body: `${task.title} is overdue!`,
          }
        );
      }
    });
  }, [tasks]);

  useEffect(() => {
  const interval = setInterval(() => {
    tasks.forEach((task) => {
      if (
        task.reminder &&
        !task.completed
      ) {
        const now =
          new Date().toISOString().slice(
            0,
            16
          );

        const reminderTime =
          new Date(task.reminder)
            .toISOString()
            .slice(0, 16);

        if (now === reminderTime) {
          new Notification(
            "⏰ Reminder",
            {
              body: `Reminder for: ${task.title}`,
            }
          );
        }
      }
    });
  }, 60000);

  return () => clearInterval(interval);
}, [tasks]);

  useEffect(() => {
  const updatedTasks = tasks.map(
    (task) => {
      if (
        task.completed &&
        task.recurring !== "None"
      ) {
        return {
          ...task,
          completed: false,
        };
      }

      return task;
    }
  );

  setTasks(updatedTasks);
}, []);

  async function fetchTasks() {
  try {
    const token =
      localStorage.getItem("token");

    const response =
      await fetch(
        "http://localhost:5000/tasks",
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    const data =
      await response.json();

    if (Array.isArray(data)) {
      setTasks(data);
    } else {
      setTasks([]);
    }
  } catch (error) {
    console.log(error);
    setTasks([]);
  }
}

  async function addTask(title) {
  const newTask = {
    title,
    completed: false,
    deadline: "",
    subtasks: [],
    estimate: "",
    priority: "Medium",
    recurring: activeTab,
    weekly_day:
      activeTab === "Weekly"
        ? weeklyDay
        : "",

    monthly_week:
      activeTab === "Monthly"
        ? monthlyWeek
        : "",
  };

  try {
    const token =
  localStorage.getItem("token");

const response =
  await fetch(
    "http://localhost:5000/tasks",
    {
      method: "POST",

      headers: {
        "Content-Type":
          "application/json",

        Authorization:
          `Bearer ${token}`,
      },

      body: JSON.stringify(
        newTask
      ),
    }
  );

    const data =
      await response.json();

    setTasks([data, ...tasks]);
  } catch (error) {
    console.log(error);
  }
}

  const safeTasks =
  Array.isArray(tasks)
    ? tasks
    : [];

const completedTasks =
  safeTasks.filter(
    (task) => task.completed
  ).length;

  const progress =
    safeTasks.length === 0
      ? 0
      : (completedTasks / safeTasks.length) *
        100;

  const filteredTasks = safeTasks.filter(
  (task) => {
    const matchesSearch =
      task.title
        .toLowerCase()
        .includes(
          search.toLowerCase()
        );

    const matchesTab =
      task.recurring === activeTab;

    const matchesWeekly =
      activeTab !== "Weekly" ||
      task.weekly_day === weeklyDay;

    const matchesMonthly =
      activeTab !== "Monthly" ||
      task.monthly_week === monthlyWeek;

    if (filter === "Completed") {
      return (
        matchesSearch &&
        matchesTab &&
        matchesWeekly &&
        matchesMonthly &&
        task.completed
      );
    }

    if (filter === "Pending") {
      return (
        matchesSearch &&
        matchesTab &&
        matchesWeekly &&
        matchesMonthly &&
        !task.completed
      );
    }

    return (
      matchesSearch &&
      matchesTab &&
      matchesWeekly &&
      matchesMonthly
    );
  }
);

  return (
    <div
      className={
        darkMode
          ? "container dark"
          : "container"
      }
    >
      <div className="top-bar">
        <h1>Advanced Todo App</h1>

        <button
          className="dark-mode-btn"
          onClick={() =>
            setDarkMode(!darkMode)
          }
        >
          {darkMode
            ? "☀️ Light"
            : "🌙 Dark"}
        </button>

        <button
  onClick={() =>
    navigate("/profile")
  }
>
  👤 Profile
</button>

<button
  onClick={() =>
    navigate("/dashboard")
  }
>
  📊 Dashboard
</button>

<button
  onClick={() => {
    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "user"
    );

    navigate("/login");
  }}
>
  🚪 Logout
</button>
      </div>

      <div className="progress-container">
        <div className="progress-info">
          <h3>Task Progress</h3>

          <p>
            {completedTasks} /{" "}
            {tasks.length} completed
          </p>
        </div>

        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{
              width: `${progress}%`,
            }}
          ></div>
        </div>
      </div>

      <div className="tabs">
  <button
    className={
      activeTab === "Daily"
        ? "active-tab"
        : ""
    }
    onClick={() => setActiveTab("Daily")}
  >
    🌞 Daily
  </button>

  <button
    className={
      activeTab === "Weekly"
        ? "active-tab"
        : ""
    }
    onClick={() =>
      setActiveTab("Weekly")
    }
  >
    📅 Weekly
  </button>

  <button
    className={
      activeTab === "Monthly"
        ? "active-tab"
        : ""
    }
    onClick={() =>
      setActiveTab("Monthly")
    }
  >
    🗓 Monthly
  </button>
</div>
    
    {activeTab === "Weekly" && (
  <div className="sub-tabs">
    {[
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ].map((day) => (
      <button
        key={day}
        className={
          weeklyDay === day
            ? "active-sub-tab"
            : ""
        }
        onClick={() =>
          setWeeklyDay(day)
        }
      >
        {day}
      </button>
    ))}
  </div>
)}
    
    {activeTab === "Monthly" && (
  <div className="sub-tabs">
    {[
      "Week 1",
      "Week 2",
      "Week 3",
      "Week 4",
    ].map((week) => (
      <button
        key={week}
        className={
          monthlyWeek === week
            ? "active-sub-tab"
            : ""
        }
        onClick={() =>
          setMonthlyWeek(week)
        }
      >
        {week}
      </button>
    ))}
  </div>
)}

      <TaskForm onAddTask={addTask} />

      <div className="search-container">
        <input
          type="text"
          placeholder="🔍 Search tasks..."
          value={search}
          onChange={(event) =>
            setSearch(event.target.value)
          }
        />

        <div className="filter-buttons">
          <button
            onClick={() =>
              setFilter("All")
            }
          >
            All
          </button>

          <button
            onClick={() =>
              setFilter("Completed")
            }
          >
            Completed
          </button>

          <button
            onClick={() =>
              setFilter("Pending")
            }
          >
            Pending
          </button>
        </div>
      </div>

      <TaskList
        tasks={filteredTasks}
        setTasks={setTasks}
      />
    </div>
  );
}

export default TodoPage;
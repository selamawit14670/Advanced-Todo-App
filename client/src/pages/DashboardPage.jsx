function DashboardPage() {
  const tasks =
    JSON.parse(
      localStorage.getItem("tasks")
    ) || [];

  const completed =
    tasks.filter(
      (task) => task.completed
    ).length;

  return (
    <div className="container">
      <h1>Dashboard</h1>

      <div className="task-card">
        <h3>Total Tasks</h3>

        <p>{tasks.length}</p>
      </div>

      <div className="task-card">
        <h3>Completed</h3>

        <p>{completed}</p>
      </div>

      <div className="task-card">
        <h3>Pending</h3>

        <p>
          {tasks.length - completed}
        </p>
      </div>
    </div>
  );
}

export default DashboardPage;
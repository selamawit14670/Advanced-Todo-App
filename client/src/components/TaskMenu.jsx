function TaskMenu({
  onDelete,
  onEdit,
  onDeadline,
  onSubtask,
  onEstimate,
  onPriority,
  onReminder,
  onRecurrence,
}) {
  return (
    <div className="task-menu">
      <button onClick={onPriority}>
        Priority
      </button>

      <button onClick={onEstimate}>
        Estimate
      </button>

      <button onClick={onDeadline}>
        Add Deadline
      </button>

      <button onClick={onEdit}>
        Edit
      </button>

      <button onClick={onSubtask}>
        Add Subtask
      </button>

      <button onClick={onDelete}>
        Remove
      </button>

      <button onClick={onReminder}>
        ⏰ Reminder
      </button>

      <button onClick={onRecurrence}>
        🔁 Recurring
      </button>
    </div>
  );
}

export default TaskMenu;
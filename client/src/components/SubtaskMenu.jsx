function SubtaskMenu({
  onDelete,
  onEdit,
  onEstimate,
}) {
  return (
    <div className="task-menu">
      <button onClick={onEdit}>
        Edit
      </button>

      <button onClick={onEstimate}>
        Estimate
      </button>

      <button onClick={onDelete}>
        Delete
      </button>
    </div>
  );
}

export default SubtaskMenu;
import { useState } from "react";

import SubtaskMenu from "./SubtaskMenu";

function SubtaskItem({
  subtask,
  task,
  tasks,
  setTasks,
}) {
  const [showMenu, setShowMenu] =
    useState(false);

  const [isEditing, setIsEditing] =
    useState(false);

  const [editedTitle, setEditedTitle] =
    useState(subtask.title);

  const [showEstimateInput, setShowEstimateInput] =
    useState(false);

  const [estimate, setEstimate] =
    useState(subtask.estimate || "");

  function toggleMenu() {
    setShowMenu(!showMenu);
  }

  function deleteSubtask() {
    const updatedTasks = tasks.map(
      (currentTask) => {
        if (currentTask.id === task.id) {
          return {
            ...currentTask,

            subtasks:
              currentTask.subtasks.filter(
                (currentSubtask) =>
                  currentSubtask.id !==
                  subtask.id
              ),
          };
        }

        return currentTask;
      }
    );

    setTasks(updatedTasks);
  }

  function saveEditedSubtask() {
    const updatedTasks = tasks.map(
      (currentTask) => {
        if (currentTask.id === task.id) {
          return {
            ...currentTask,

            subtasks:
              currentTask.subtasks.map(
                (currentSubtask) => {
                  if (
                    currentSubtask.id ===
                    subtask.id
                  ) {
                    return {
                      ...currentSubtask,

                      title:
                        editedTitle,
                    };
                  }

                  return currentSubtask;
                }
              ),
          };
        }

        return currentTask;
      }
    );

    setTasks(updatedTasks);

    setIsEditing(false);
  }

  function openEstimateInput() {
    setShowEstimateInput(true);

    setShowMenu(false);
  }

  function saveEstimate() {
    const updatedTasks = tasks.map(
      (currentTask) => {
        if (currentTask.id === task.id) {
          return {
            ...currentTask,

            subtasks:
              currentTask.subtasks.map(
                (currentSubtask) => {
                  if (
                    currentSubtask.id ===
                    subtask.id
                  ) {
                    return {
                      ...currentSubtask,

                      estimate,
                    };
                  }

                  return currentSubtask;
                }
              ),
          };
        }

        return currentTask;
      }
    );

    setTasks(updatedTasks);

    setShowEstimateInput(false);
  }

  return (
    <div className="subtask-card">
      <div>
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
          <p>
            • {subtask.title}
          </p>
        )}

        {subtask.estimate && (
          <p className="estimate-text">
            ⏱ {subtask.estimate}
          </p>
        )}

        {showEstimateInput && (
          <div className="estimate-container">
            <input
              type="text"
              placeholder="2h..."
              value={estimate}
              onChange={(event) =>
                setEstimate(
                  event.target.value
                )
              }
            />

            <button onClick={saveEstimate}>
              Save
            </button>
          </div>
        )}
      </div>

      {isEditing ? (
        <button
          onClick={saveEditedSubtask}
        >
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
            <SubtaskMenu
              onDelete={deleteSubtask}
              onEdit={() =>
                setIsEditing(true)
              }
              onEstimate={
                openEstimateInput
              }
            />
          )}
        </>
      )}
    </div>
  );
}

export default SubtaskItem;
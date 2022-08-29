import React, { useState } from "react";
import { uuid } from "uuidv4";
import Board, { EDirection } from "./components/Board";
import NewTaskInput from "./components/NewTaskInput";
import { EBoard, ITask } from "./types/Task";

export function ChallengeComponent() {
  const [tasks, setTasks] = useState<ITask[]>([
    { id: uuid(), name: "Mow the lawn", currentBoard: EBoard.Todo },
    { id: uuid(), name: "Pull Weeds", currentBoard: EBoard.Progress },
    { id: uuid(), name: "Rake the leaves", currentBoard: EBoard.Done },
  ]);

  function onAddTask(taskName: string) {
    setTasks([
      ...tasks,
      { id: uuid(), name: taskName, currentBoard: EBoard.Todo },
    ]);
  }

  function onMoveTask(id: string, direction: EDirection) {
    let allTasks = tasks;
    allTasks = allTasks.map((task) => {
      if (task.id === id) {
        if (direction === EDirection.Right) {
          task.currentBoard += 1;
        } else {
          task.currentBoard -= 1;
        }
      }
      return task;
    });
    setTasks(allTasks);
  }

  const boards = [
    { id: EBoard.Todo, title: "Todo" },
    { id: EBoard.Progress, title: "Progress" },
    { id: EBoard.Done, title: "Done" },
  ];

  function filteredTasks(id: number) {
    return tasks.filter((task) => task.currentBoard === id);
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {boards.map((board) => (
          <Board
            title={board.title}
            tasks={filteredTasks(board.id)}
            onMoveTask={onMoveTask}
          />
        ))}
      </div>
      <NewTaskInput onAddTask={onAddTask} />
    </>
  );
}

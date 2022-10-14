import React, { useEffect, useState } from "react";
import { uuid } from "uuidv4";
import Board, { EDirection } from "./components/Board";
import NewTaskInput from "./components/NewTaskInput";
import { EBoard, ITask } from "./types/Task";
import axios from "axios";

interface IItem {
  id: string;
  title: string;
  state: string;
}

export function ChallengeComponent() {
  const [tasks, setTasks] = useState<ITask[]>([]);

  useEffect(() => {
    async function fetchTasks() {
      const { data } = await axios.get(
        "https://api.github.com/repos/every-io/demo-issues/issues?state=all"
      );

      setTasks(
        data.map((item: IItem) => ({
          id: item.id,
          name: item.title,
          currentBoard: item.state === "closed" ? EBoard.Done : EBoard.Todo,
        }))
      );
    }
    fetchTasks();
  }, []);

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
            key={JSON.stringify(board)}
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

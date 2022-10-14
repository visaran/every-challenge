import { ITask, EBoard } from "../types/Task";
import BaseButton from "../_ui/BaseButton";

export enum EDirection {
  Left = "left",
  Right = "right",
}

interface BoardProps {
  title: string;
  tasks: ITask[];
  onMoveTask: (arg1: string, arg2: EDirection) => void;
}

export default function Board({ title, tasks, onMoveTask }: BoardProps) {
  function moveTask(task: string, direction: EDirection) {
    onMoveTask(task, direction);
  }

  return (
    <div
      style={{
        boxShadow: "rgb(0 0 0 / 50%) 2px 2px 2px 2px",
        borderRadius: 8,
        padding: 20,
        flex: "0 0 25%",
        maxWidth: "25%",
      }}
    >
      <h1 style={{ margin: 0 }}>{title}</h1>
      <div>
        {tasks.map((task) => (
          <div
            key={JSON.stringify(task)}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              boxShadow: "rgb(0 0 0 / 50%) 2px 2px 2px 2px",
              borderRadius: 8,
              marginTop: 20,
              padding: 10,
            }}
          >
            <BaseButton
              style={{ backgroundColor: "red" }}
              disabled={task.currentBoard === EBoard.Todo}
              onClick={() => moveTask(task.id, EDirection.Left)}
            >
              &lsaquo;
            </BaseButton>
            <p>{task.name}</p>
            <BaseButton
              style={{ backgroundColor: "green" }}
              disabled={task.currentBoard === EBoard.Done}
              onClick={() => moveTask(task.id, EDirection.Right)}
            >
              &rsaquo;
            </BaseButton>
          </div>
        ))}
      </div>
    </div>
  );
}

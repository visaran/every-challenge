export enum EBoard {
  Todo = 1,
  Progress = 2,
  Done = 3,
}

export interface ITask {
  id: string;
  name: string;
  currentBoard: EBoard;
}

import { useState } from "react";
import BaseButton from "../_ui/BaseButton";

interface NewTaskInputProps {
  onAddTask: (arg: string) => void;
}

export default function NewTaskInput({ onAddTask }: NewTaskInputProps) {
  const [textInput, setTextInput] = useState("");

  function handleSubmit(e: any) {
    e.preventDefault();
    if (!textInput) return;
    onAddTask(textInput);
    setTextInput("");
  }
  return (
    <form
      onSubmit={handleSubmit}
      style={{ marginTop: 40, height: 60, display: "flex", flex: "0 0 25%" }}
    >
      <input
        type="text"
        value={textInput}
        placeholder="Add Task"
        onChange={(e) => setTextInput(e.target.value)}
        style={{ padding: 20 }}
      />
      <BaseButton style={{ backgroundColor: "blue", width: 60 }} type="submit">
        +
      </BaseButton>
    </form>
  );
}

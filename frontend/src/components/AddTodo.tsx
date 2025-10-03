import { Dispatch, SetStateAction, useState } from "react";

type Todo = {
  id: number;
  name: string;
  status: string;
  priority: number;
};

type AddTodoProps = {
  todosHandler: Dispatch<SetStateAction<Todo[]>>;
};

const AddTodo = ({ todosHandler }: AddTodoProps) => {
  const [newTodoName, setNewTodoName] = useState<string>("");
  const [newTodoPriority, setNewTodoPriority] = useState<number>(1);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodoName(e.target.value);
  };

  const handlePriorityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = Number(e.target.value);
    if (value < 1) value = 1;
    if (value > 10) value = 10;
    setNewTodoPriority(value);
  };

  const addNewTask = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newTodo = {
      name: newTodoName,
      priority: newTodoPriority,
    };

    try {
      await fetch(`http://localhost:8000/api/todos/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTodo),
      });

      const response = await fetch("http://localhost:8000/api/todos/");
      const result = await response.json();
      todosHandler(result.data);
    } catch (err) {
      console.log("error", err);
    }
  };

  return (
    <div>
      <form onSubmit={addNewTask}>
        <input
          type="text"
          required
          value={newTodoName}
          onChange={handleNameChange}
        />
        <input
          type="number"
          className="p-2"
          required
          min={1}
          max={10}
          onChange={handlePriorityChange}
          value={newTodoPriority}
        />
        <button>Add</button>
      </form>
    </div>
  );
};

export default AddTodo;

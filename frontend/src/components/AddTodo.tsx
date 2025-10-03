import { Dispatch, SetStateAction, useState } from "react";

type Todo = {
  id: number;
  name: string;
  status: string;
  priority: number;
};

type AddTodoProps = {
  todosHandler: Dispatch<SetStateAction<Todo[]>>;
  statusParam: "all" | "done" | "undone";
  sortParam: "asc" | "desc";
  searchParam: string;
};

const AddTodo = ({
  todosHandler,
  statusParam,
  sortParam,
  searchParam,
}: AddTodoProps) => {
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

      const response = await fetch(
        `http://localhost:8000/api/todos/?status=${statusParam}&sort=${sortParam}&search=${searchParam}`
      );
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
          placeholder="Do something great..."
          className="border-[#c4c4c4] rounded-[2px]  border-1 p-1"
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
        <button className="ml-3 border-1 p-2 rounded-xl duration-200 hover:scale-[1.1] border-[#c4c4c4] cursor-pointer ">
          Add
        </button>
      </form>
    </div>
  );
};

export default AddTodo;

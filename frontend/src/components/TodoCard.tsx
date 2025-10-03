import { IoIosCheckmark } from "react-icons/io";
import { FaTrashAlt } from "react-icons/fa";
import { Dispatch, SetStateAction, useState } from "react";

type Todo = {
  id: number;
  name: string;
  status: string;
  priority: number;
};

type TodoCardProps = {
  id: number;
  name: string;
  status: string;
  priority: number;
  todoHandler: Dispatch<SetStateAction<Todo[]>>;
};

const TodoCard = ({
  id,
  name,
  status,
  priority,
  todoHandler,
}: TodoCardProps) => {
  const [isPriorityModalOpen, setIsPriorityModalOpen] =
    useState<boolean>(false);

  const [newPriority, setNewPriority] = useState<number>(priority);

  const handleOpeningChangePriorityModal = () => {
    setIsPriorityModalOpen((prev) => !prev);
  };

  const changeTodoStatus = async () => {
    const newStatus = status === "undone" ? "done" : "undone";

    try {
      await fetch(`http://localhost:8000/api/todos/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      todoHandler((prev) =>
        prev.map((todo) =>
          todo.id === id ? { ...todo, status: newStatus } : todo
        )
      );
    } catch (err) {
      console.log("error", err);
    }
  };

  const deleteTodo = async () => {
    try {
      await fetch(`http://localhost:8000/api/todos/${id}`, {
        method: "DELETE",
      });

      todoHandler((prev) => prev.filter((todo) => todo.id !== id));
    } catch (err) {
      console.log("error", err);
    }
  };

  const isInRange = (value: number, min: number, max: number): boolean => {
    return value >= min && value <= max;
  };

  const changePriority = async (e) => {
    let value = Number(e.target.value);
    if (value < 1) value = 1;
    if (value > 10) value = 10;
    setNewPriority(value);

    try {
      const response = await fetch(`http://localhost:8000/api/todos/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priority: value }),
      });

      console.log(response);

      todoHandler((prev) =>
        prev.map((todo) =>
          todo.id === id ? { ...todo, priority: value } : todo
        )
      );
    } catch (err) {
      console.log("error", err);
    }
  };

  return (
    <div
      className={
        status === "undone"
          ? "flex mt-4 pb-2 justify-between text-[#818181] border-b-1  text-xl border-[#f3f3f3]"
          : "flex mt-4 pb-2 text-[#c4c4c4] justify-between border-b-1  text-xl border-[#f3f3f3]"
      }
    >
      <div className="flex gap-4 items-center">
        <button
          onClick={changeTodoStatus}
          className={
            status === "done"
              ? "border-1 cursor-pointer p-1 border-[#c4c4c4] rounded-[3px] duration-200 hover:scale-[1.1]"
              : "border-1 text-transparent cursor-pointer p-1 border-[#a3a3a3] rounded-[3px] duration-200 hover:scale-[1.1]"
          }
        >
          <IoIosCheckmark />
        </button>
        <p>{name}</p>
      </div>
      <div className="flex gap-8 items-center">
        <div className="ralative">
          <p
            onClick={handleOpeningChangePriorityModal}
            className={
              isInRange(priority, 1, 3)
                ? "bg-blue-400 text-white px-2 cursor-pointer duration-200 hover:scale-[1.1]"
                : isInRange(priority, 4, 7)
                ? "bg-green-400  text-white px-2 cursor-pointer duration-200 hover:scale-[1.1]"
                : "bg-red-400  text-white px-2 cursor-pointer duration-200 hover:scale-[1.1]"
            }
          >
            {priority}
          </p>
          <div
            className={
              isPriorityModalOpen
                ? "absolute border-1 bg-white shadow-2xl border-[#c4c4c4]"
                : "hidden"
            }
          >
            <input
              type="number"
              className="p-2"
              min={1}
              max={10}
              onChange={changePriority}
              value={newPriority}
            />
          </div>
        </div>
        <button
          className="cursor-pointer duration-200 hover:scale-[1.1]"
          onClick={deleteTodo}
        >
          <FaTrashAlt />
        </button>
      </div>
    </div>
  );
};

export default TodoCard;

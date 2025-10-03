"use client";

import ControlPanel from "@/components/ControlPanel";
import TodoCard from "@/components/TodoCard";
import { useEffect, useState } from "react";

type Todo = {
  id: number;
  name: string;
  status: "done" | "undone";
  priority: number;
};

const Home = () => {
  const [statusParam, setStatusParam] = useState<"all" | "done" | "undone">(
    "all"
  );
  const [sortParam, setSortParam] = useState<"asc" | "desc">("desc");
  const [searchParam, setSearchParam] = useState<string>("");

  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const getTodos = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/todos/?status=${statusParam}&sort=${sortParam}&search=${searchParam}`
        );

        if (!response.ok) {
          console.error("Failed to fetch: ", response.status);
          return;
        }
        const result = await response.json();
        setTodos(result.data);
      } catch (error) {
        console.error("Error", error);
      }
    };

    getTodos();
  }, [statusParam, searchParam, sortParam]);

  return (
    <main className="font-lato flex justify-center">
      <div className="px-20 pt-20 max-w-[1000px]">
        <ControlPanel
          statusParam={statusParam}
          handleStatusParam={setStatusParam}
          searchParam={searchParam}
          handleSearchParam={setSearchParam}
          sortParam={sortParam}
          handleSortParam={setSortParam}
          todosHandler={setTodos}
        />
        <div className="flex flex-col">
          {todos
            .slice()
            .sort((a, b) => {
              if (a.status === b.status) return 0;
              if (a.status === "undone") return -1;
              return 1;
            })
            .map((todo) => (
              <TodoCard
                key={todo.id}
                id={todo.id}
                name={todo.name}
                status={todo.status}
                priority={todo.priority}
                todoHandler={setTodos}
              />
            ))}
        </div>
      </div>
    </main>
  );
};

export default Home;

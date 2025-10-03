import { Dispatch, SetStateAction, useState } from "react";
import Filter from "./Filter";
import Sort from "./Sort";
import AddTodo from "./AddTodo";
import Search from "./Search";

type Todo = {
  id: number;
  name: string;
  status: string;
  priority: number;
};

type ControlPanelProps = {
  statusParam: "all" | "done" | "undone";
  handleStatusParam: Dispatch<SetStateAction<"all" | "done" | "undone">>;
  searchParam: string;
  handleSearchParam: Dispatch<SetStateAction<string>>;
  sortParam: "asc" | "desc";
  handleSortParam: Dispatch<SetStateAction<"asc" | "desc">>;
  todosHandler: Dispatch<SetStateAction<Todo[]>>;
};

const ControlPanel = ({
  statusParam,
  handleStatusParam,
  searchParam,
  handleSearchParam,
  sortParam,
  handleSortParam,
  todosHandler,
}: ControlPanelProps) => {
  const [inputMode, setInputMode] = useState<"add" | "search">("add");

  const changeInputMode = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setInputMode(e.target.value as "add" | "search");
  };

  return (
    <div>
      <Sort sortParam={sortParam} handleSortParam={handleSortParam} />
      <Filter statusParam={statusParam} handleStatusParam={handleStatusParam} />
      <select value={inputMode} onChange={changeInputMode}>
        <option value="add">Add</option>
        <option value="search">Search</option>
      </select>
      {inputMode === "add" ? (
        <AddTodo todosHandler={todosHandler} />
      ) : (
        <Search
          searchParam={searchParam}
          handleSearchParam={handleSearchParam}
        />
      )}
    </div>
  );
};

export default ControlPanel;

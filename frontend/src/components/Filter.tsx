import { Dispatch, SetStateAction } from "react";

type FilterProps = {
  statusParam: "all" | "done" | "undone";
  handleStatusParam: Dispatch<SetStateAction<"all" | "done" | "undone">>;
};

const Filter = ({ statusParam, handleStatusParam }: FilterProps) => {
  return (
    <div>
      <select
        name="sort"
        id="sort"
        value={statusParam}
        onChange={(e) => handleStatusParam(e.target.value)}
      >
        <option value="all">ALL</option>
        <option value="done">DONE</option>
        <option value="undone">UNDONE</option>
      </select>
    </div>
  );
};

export default Filter;

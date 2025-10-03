import { Dispatch, SetStateAction } from "react";
import Filter from "./Filter";
import Sort from "./Sort";

type ControlPanelProps = {
  statusParam: "all" | "done" | "undone";
  handleStatusParam: Dispatch<SetStateActions<"all" | "done" | "undone">>;
  searchParam: string;
  handleSearchParam: Dispatch<SetStateAction<string>>;
  sortParam: "asc" | "desc";
  handleSortParam: Dispatch<SetStateAction<"asc" | "desc">>;
};

const ControlPanel = ({
  statusParam,
  handleStatusParam,
  searchParam,
  handleSearchParam,
  sortParam,
  handleSortParam,
}: ControlPanelProps) => {
  return (
    <div>
      <Sort sortParam={sortParam} handleSortParam={handleSortParam} />
      <Filter statusParam={statusParam} handleStatusParam={handleStatusParam} />
    </div>
  );
};

export default ControlPanel;

import { Dispatch, SetStateAction } from "react";

type SortProps = {
  sortParam: "asc" | "desc";
  handleSortParam: Dispatch<SetStateAction<"asc" | "desc">>;
};

const Sort = ({ sortParam, handleSortParam }: SortProps) => {
  return (
    <div>
      <select
        name="sort"
        id="sort"
        value={sortParam}
        onChange={(e) => handleSortParam(e.target.value)}
      >
        <option value="desc">DESC</option>
        <option value="asc">ASC</option>
      </select>
    </div>
  );
};

export default Sort;

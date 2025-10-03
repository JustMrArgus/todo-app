import { Dispatch, SetStateAction } from "react";

type searchProps = {
  searchParam: string;
  handleSearchParam: Dispatch<SetStateAction<string>>;
};

const Search = ({ searchParam, handleSearchParam }: searchProps) => {
  const search = (e) => {
    handleSearchParam(e.target.value);
  };

  return (
    <div>
      <input type="text" value={searchParam} onChange={search} />
    </div>
  );
};

export default Search;

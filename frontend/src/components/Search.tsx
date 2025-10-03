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
    <input
      className="border-[#c4c4c4] rounded-[2px] w-full grow-1 border-1 p-1"
      type="text"
      value={searchParam}
      onChange={search}
      placeholder="Fry some eggs..."
    />
  );
};

export default Search;

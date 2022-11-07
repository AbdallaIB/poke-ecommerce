interface Props {
  value: string;
  placeholder: string;
  setValue: (value: string) => void;
}

const SearchBar = ({ value, setValue, placeholder }: Props) => {
  return (
    <div className="flex items-center justify-center w-full relative gap-4">
      <div className="relative">
        <label htmlFor="table-search" className="sr-only">
          Search
        </label>
        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
          <i className="bx bx-search-alt-2"></i>
        </div>
        <input
          id="table-search"
          className="block p-2 pl-10 w-80 text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    </div>
  );
};

export default SearchBar;

interface Props {
  items: string[];
  setFilter: (value: string) => void;
}

const Filter = ({ items, setFilter }: Props) => {
  return (
    <div className="select h-full">
      <select
        onChange={(e) => setFilter(e.target.value.toLowerCase())}
        className="inline-flex items-center h-full text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-normal rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        aria-label="Filter Countries By Region"
      >
        <option value="">All Types</option>
        {items.map((item, index) => (
          <option
            key={index}
            value={item}
            className="ml-2 w-full text-sm font-medium text-gray-900 rounded dark:text-gray-300"
          >
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filter;

/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

const ContentSearch = () => {
  return (
    <>
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <MagnifyingGlassIcon
            className="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </div>
        <input
          id="search-input"
          autoComplete="off"
          type="text"
          className="block w-full rounded-md border border-gray-500 bg-white py-2 pl-10 pr-3 placeholder-gray-500 focus:border-indigo-500 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
          placeholder="Search"
        />
      </div>
      <ul
        className="select is-multiple absolute z-10 max-h-80 w-80 overflow-auto rounded-md border border-solid bg-white"
        role="listbox"
      >
        <li
          onClick={() => {}}
          className={`relative cursor-pointer p-3 hover:bg-indigo-600 hover:text-white`}
        >
          <div className="truncate text-sm font-bold">Found Notes Title 1</div>
          <p className="truncate text-sm">Found Notes Desc 1</p>
          <span className="mt-2 rounded-xl bg-gray-800 px-2 py-1 text-xs text-white">
            notes
          </span>
        </li>
        <li
          onClick={() => {}}
          className={`relative cursor-pointer p-3 hover:bg-indigo-600 hover:text-white`}
        >
          <div className="truncate text-sm font-bold">
            Found Project Title 2
          </div>
          <p className="truncate text-sm">Found Project Desc 2</p>
          <span className="mt-2 rounded-xl bg-gray-800 px-2 py-1 text-xs text-white">
            projects
          </span>
        </li>
      </ul>
    </>
  );
};

export default ContentSearch;

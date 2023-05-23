/* eslint-disable no-debugger */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import Link from "next/link";
import { ChangeEvent, useEffect, useState, useRef } from "react";

import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

import contentIndexer from "@/lib/cient/ContentIndexer";
import { SearchContent } from "@/interfaces/SearchContent";

const ContentSearch = () => {
  const ref = useRef<HTMLInputElement>(null);
  const [results, setResults] = useState<SearchContent[]>([]);
  const [query, setQuery] = useState("");

  const handleClickOutside = () => {
    setResults([]);
    setQuery("");
  };

  useEffect(() => {
    const callback = (evt: MouseEvent) => {
      if (
        results.length > 0 &&
        ref.current &&
        !ref.current.contains(evt.target as Node)
      ) {
        handleClickOutside();
      }
    };

    const escapeKeyCallback = (evt: KeyboardEvent) => {
      if (evt.key === "Escape" && results.length > 0) {
        handleClickOutside();
      }
    };

    document.addEventListener("click", callback);
    document.addEventListener("keydown", escapeKeyCallback);

    return () => {
      document.removeEventListener("click", callback);
      document.removeEventListener("keydown", escapeKeyCallback);
    };
  }, [results]);

  const performSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setResults(contentIndexer.search(value));
  };

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
          ref={ref}
          value={query}
          id="search-input"
          onChange={performSearch}
          autoComplete="off"
          type="text"
          className="block w-full rounded-md border border-gray-500 bg-white py-2 pl-10 pr-3 placeholder-gray-500 focus:border-indigo-500 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
          placeholder="Search"
        />
      </div>
      {results && (
        <ul
          className="select is-multiple absolute z-10 max-h-80 w-80 overflow-auto rounded-md border border-solid bg-white"
          role="listbox"
        >
          {results.map((result) => (
            <li
              key={result.slug}
              className={`relative cursor-pointer p-3 hover:bg-indigo-600 hover:text-white`}
            >
              <Link href={`/${result.category}/${result.slug}`}>
                <div className="truncate text-sm font-bold">{result.title}</div>
                <p className="truncate text-sm">{result.description}</p>
                <span className="mt-2 rounded-xl bg-gray-800 px-2 py-1 text-xs text-white">
                  {result.category}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default ContentSearch;

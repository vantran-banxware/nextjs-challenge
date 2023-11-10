"use client";

import { FormEventHandler, Suspense, useState } from "react";

import { SearchMatch } from "./api/search/route";
import SearchResults from "./SearchResults";
import Fullbook from "./FullBook";

interface SearchResults {
  query: string;
  matches: SearchMatch[];
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResults>();

  const performSearch: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const response = await fetch(
      "/api/search?" +
        new URLSearchParams({
          q: query,
        }),
    );

    setResults({
      query,
      matches: await response.json(),
    });
  };

  const showFullBook = query !== "";

  return (
    <main className="container">
      <form onSubmit={performSearch}>
        <legend>
          <h1>Search</h1>
        </legend>
        <fieldset>
          <div className="form-group">
            <label htmlFor="q">Search Text</label>
            <input
              id="q"
              name="q"
              type="text"
              value={query}
              onChange={(e) => {
                e.preventDefault();
                setQuery(e.target.value);
              }}
            />
          </div>

          <div className="form-group">
            <button
              className="btn btn-default"
              type="submit"
              role="button"
              name="submit"
              id="submit"
            >
              Search
            </button>
          </div>
        </fieldset>
      </form>
      {showFullBook && results ? (
        <SearchResults matches={results.matches} query={results?.query} />
      ) : null}
      {!showFullBook && (
        <Suspense fallback="Loading book...">
          <Fullbook />
        </Suspense>
      )}
    </main>
  );
}

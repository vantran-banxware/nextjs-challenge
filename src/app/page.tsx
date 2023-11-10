"use client";
import { useState } from "react";

import styles from "./page.module.css";
import { SearchMatch } from "./api/search/route";

function renderContent(paragraph: string, query: string) {
  const parts = paragraph.split(query);

  const spans: JSX.Element[] = [];
  for (let i = 0; i < parts.length; i++) {
    spans.push(<text key={i}>{parts[i]}</text>);

    if (i < parts.length - 1) {
      spans.push(<b key={`hightlight-${i}`}>{query}</b>);
    }
  }

  return <>{spans}</>;
}

interface SearchResults {
  query: string;
  matches: SearchMatch[];
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResults>();

  return (
    <main className={styles.main}>
      <form
        onSubmit={async (e) => {
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
        }}
      >
        <input
          type="text"
          name="q"
          value={query}
          onChange={(e) => {
            e.preventDefault();
            setQuery(e.target.value);
          }}
        />
        <button type="submit">Search</button>
      </form>

      {results?.matches.map((x, i) => (
        <div key={i}>
          <div>{x.chapter}</div>
          <div>Paragraph: {x.paragraphPosition}</div>
          <p>{renderContent(x.paragraph, results.query)}</p>
        </div>
      ))}
    </main>
  );
}

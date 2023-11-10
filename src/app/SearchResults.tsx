"use client";

import { SearchMatch } from "./api/search/route";

function renderContent(paragraph: string, query: string) {
  const parts = paragraph.split(query);

  const spans: JSX.Element[] = [];
  for (let i = 0; i < parts.length; i++) {
    spans.push(<text key={i}>{parts[i]}</text>);

    if (i < parts.length - 1) {
      spans.push(
        <span className="hightlight" key={`hightlight-${i}`}>
          {query}
        </span>,
      );
    }
  }

  return <>{spans}</>;
}

export interface SearchResultsProps {
  query: string;
  matches: SearchMatch[];
}

export default function SearchResults({ query, matches }: SearchResultsProps) {
  return (
    <section>
      <header>
        <h2>Results</h2>
      </header>

      {matches.map((x, i) => (
        <>
          <div className="terminal-card" key={i}>
            <header>{x.chapter}</header>
            <div>
              <h2>Paragraph: {x.paragraphPosition}</h2>
              {renderContent(x.paragraph, query)}
            </div>
          </div>
          <br />
        </>
      ))}
    </section>
  );
}

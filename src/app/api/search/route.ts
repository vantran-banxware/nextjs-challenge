import { NextRequest } from "next/server";
import chapters from "@/MobyDick.json";

export interface SearchMatch {
  chapter: string;
  paragraph: string;
  paragraphPosition: number;
}

export function GET(request: NextRequest): Response {
  const query = request.nextUrl.searchParams.get("q");

  if (!query) {
    throw new Error("q search params is required!");
  }

  const matches: SearchMatch[] = [];
  for (const chapter of chapters) {
    for (let i = 0; i < chapter.paragraphs.length; i++) {
      const paragraph = chapter.paragraphs[i];
      // No match for this paragraph
      if (!paragraph.includes(query)) {
        continue;
      }

      matches.push({
        chapter: chapter.chapter,
        paragraph,
        paragraphPosition: i + 1,
      });
    }
  }

  return Response.json(matches);
}

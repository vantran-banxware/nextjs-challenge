import chapters from "@/MobyDick.json";

export default function Fullbook() {
  return chapters.map((chapter, i) => (
    <section key={i}>
      <h1>{chapter.chapter}</h1>
      {chapter.paragraphs.map((p, pi) => (
        <p key={pi}>{p}</p>
      ))}
    </section>
  ));
}

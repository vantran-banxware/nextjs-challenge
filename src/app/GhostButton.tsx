import { CSSProperties, useRef, useState } from "react";

interface Position {
  x: number;
  y: number;
}

export default function GhostButton() {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState<Position>();

  console.log("position", position);

  return (
    <button
      className="btn btn-default"
      type="submit"
      role="button"
      name="submit"
      id="submit"
      ref={ref}
      style={
        position && {
          position: "absolute",
          transform: `translate(${position.x}px, ${position.y}px)`,
        }
      }
      onMouseEnter={(e) => {
        e.preventDefault();
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) {
          return;
        }

        setPosition((prev) => ({
          x: (prev?.x ?? 0) + rect.width,
          y: (prev?.y ?? 0) + rect.height,
        }));
      }}
    >
      Search
    </button>
  );
}

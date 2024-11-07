import React, { useRef, useEffect, useState } from "react";

type ScaledLetterProps = {
  letter: string;
  color: string;
};

const ScaledLetter: React.FC<ScaledLetterProps> = ({ letter, color }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const letterRef = useRef<HTMLDivElement>(null);
  const [widthScale, setWidthScale] = useState(1);
  const [heightScale, setHeightScale] = useState(1);

  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current && letterRef.current) {
        // Get dimensions of the container
        const containerWidth = containerRef.current.offsetWidth;
        const containerHeight = containerRef.current.offsetHeight;

        // Get actual size of the letter
        const letterWidth = letterRef.current.offsetWidth;
        const letterHeight = letterRef.current.offsetHeight;
        console.log(letterWidth, letterHeight);

        // Calculate the scale factor to fit the letter within the container
        const calcWidthScale = containerWidth / letterWidth;
        const calcHeightScale = containerHeight / letterHeight;

        setWidthScale(calcWidthScale);
        setHeightScale(calcHeightScale);
      }
    };

    // Create a ResizeObserver to handle container resizing
    const resizeObserver = new ResizeObserver(updateScale);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    // Initial scale calculation on mount
    updateScale();

    // Cleanup on unmount
    return () => {
      resizeObserver.disconnect();
    };
  }, [letter]);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%", // Allows container to fill parent width
        height: "100%", // Allows container to fill parent height
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <div
        ref={letterRef}
        style={{
          transform: `scale(${widthScale}, ${heightScale})`,
          transformOrigin: "center",
          whiteSpace: "nowrap",
          color: color,
          lineHeight: "0.7",
        }}
      >
        {letter}
      </div>
    </div>
  );
};

export default ScaledLetter;

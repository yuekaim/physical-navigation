import React from "react";
import { useState, useEffect } from "react";
import ScaledLetter from "./ScaledLetter";
import { TailSpin } from "react-loader-spinner";

type CursorProps = {
  x: number;
  y: number;
};

const Cursor: React.FC<CursorProps> = ({ x, y }) => {
  const [dx, setDx] = useState(0);
  const [dy, setDy] = useState(0);

  // Record initial x and y
  const [initialX] = useState(x);
  const [initialY] = useState(y);

  const [active, setActive] = useState(false);

  const btnTop =
    document.getElementById("activate")?.getBoundingClientRect().top || 0;
  const btnLeft =
    document.getElementById("activate")?.getBoundingClientRect().left || 0;
  const btnBottom =
    document.getElementById("activate")?.getBoundingClientRect().bottom || 0;
  const btnRight =
    document.getElementById("activate")?.getBoundingClientRect().right || 0;

  const width = x * 3 + window.innerWidth / 2;
  const height = y * 5 + window.innerHeight / 2;

  // Update dx and dy whenever x or y changes
  useEffect(() => {
    setDx(x - initialX);
    setDy(y - initialY);
    setActive(
      width > btnLeft &&
        width < btnRight &&
        height > btnTop &&
        height < btnBottom
    );
  }, [x, y, initialX, initialY]);

  return (
    <>
      <div
        style={{
          width: "100vw",
          height: "100vh",
        }}
      >
        {/* <div
          style={{
            width: `calc(${x * 3}px + 50%)`,
            height: `calc(${y * 5}px + 50%)`,
            position: "fixed",
            left: "0",
            top: "0",
            backgroundColor: `${active ? "" : "black"}`,
            animation: `${active ? "strobe 0.2s step-start infinite" : ""}`,
          }}
        ></div> */}
        {/* <div
          style={{
            width: `calc(50% - ${x * 3}px)`,
            height: `calc(50% - ${y * 5}px)`,
            position: "fixed",
            left: `calc(${x * 3}px + 50%)`,
            top: `calc(${y * 5}px + 50%)`,
            backgroundColor: `${active ? "" : "black"}`,
            animation: `${active ? "strobe 0.2s step-start infinite" : ""}`,
          }}
        ></div> */}
        <div
          style={{
            top: "0",
            left: 0,
            position: "fixed",
            width: `calc(${x * 3}px + 50%)`,
            height: `calc(${y * 5}px + 50%)`,
            backgroundColor: `${active ? "" : "black"}`,
            animation: `${active ? "strobe 0.2s step-start infinite" : ""}`,
          }}
        >
          <ScaledLetter letter="low" color="white" />
        </div>
        <div
          style={{
            top: "0",
            left: `calc(${x * 3}px + 50%)`,
            position: "fixed",
            width: `calc(50% - ${x * 3}px)`,
            height: `calc(${y * 5}px + 50%)`,
            animation: `${active ? "strobe 0.2s step-start infinite" : ""}`,
          }}
        >
          <ScaledLetter letter="tech" color={active ? "red" : "black"} />
        </div>
        <div
          style={{
            top: `calc(${y * 5}px + 50%)`,
            left: "0",
            position: "fixed",
            width: `calc(${x * 3}px + 50%)`,
            height: `calc(50% - ${y * 5}px)`,
            // backgroundColor: `${active ? "" : "black"}`,
            animation: `${active ? "strobe 0.2s step-start infinite" : ""}`,
          }}
        >
          <ScaledLetter letter="COM" color={active ? "red" : "black"} />
        </div>
        <div
          style={{
            top: `calc(${y * 5}px + 50%)`,
            left: `calc(${x * 3}px + 50%)`,
            position: "fixed",
            width: `calc(50% - ${x * 3}px)`,
            height: `calc(50% - ${y * 5}px)`,
            backgroundColor: `${active ? "" : "black"}`,
            animation: `${active ? "strobe 0.2s step-start infinite" : ""}`,
          }}
        >
          <ScaledLetter letter="PUTER" color="white" />
        </div>

        {/* cursor */}
        <div
          style={{
            width: "2px",
            height: "100%",
            position: "fixed",
            left: `calc(${x * 3}px + 50%)`,
            backgroundColor: "black",
          }}
        ></div>
        <div
          style={{
            height: "2px",
            width: "100%",
            position: "fixed",
            top: `calc(${y * 5}px + 50%)`,
            backgroundColor: "black",
          }}
        ></div>
        {/* cursor circle */}
        <div
          style={{
            height: "20px",
            width: "20px",
            borderRadius: "100%",
            top: `calc(${y * 5}px + 50%)`,
            left: `calc(${x * 3}px + 50%)`,
            backgroundColor: "red",
            position: "fixed",
            transform: "translate(-50%, -50%)",
          }}
        ></div>
        {/* button */}
        <div
          id="activate"
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            padding: "0.5rem 1rem",
            backgroundColor: "#ffffff",
            // backdropFilter: "blur(10px)",
            borderRadius: "10px",
            border: "2px solid black",
            textWrap: "nowrap",
          }}
        >
          {active ? <div>lowtech.computer</div> : "enter"}
        </div>
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <TailSpin
            visible={active}
            height="200"
            width="200"
            color="#00ff00"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      </div>
    </>
  );
};

export default Cursor;

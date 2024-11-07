import { useEffect, useState, useCallback } from "react";
import "./styles.css";
import Cursor from "./Cursor";
import { isMobile } from "react-device-detect";

async function requestDeviceMotionEventPermission() {
  try {
    // @ts-ignore
    const response = await window.DeviceMotionEvent.requestPermission();
    return response;
  } catch (err) {}
}

export default function App() {
  const [[a, b, g], setRotation] = useState([0, 0, 0]);
  useEffect(() => {
    const callback = (e: DeviceOrientationEvent): void => {
      setRotation([e.alpha || 0, e.beta || 0, e.gamma || 0]);
    };
    window.addEventListener("deviceorientation", callback, true);
    return () =>
      window.removeEventListener("deviceorientation", callback, true);
  }, []);

  const y = parseFloat(b.toFixed(0));
  const x = parseFloat(g.toFixed(0));

  const hotspotTop = 200;
  const hotspotLeft = 100;
  const hotspotRight = hotspotLeft + 50;
  const hotspotBottom = hotspotTop + 50;
  // const hotspor

  const [isOpen, setIsOpen] = useState(false);

  // document.body.requestFullscreen();

  useEffect(() => {
    setIsOpen(
      hotspotTop < y * 5 + window.innerHeight / 2 &&
        hotspotBottom > y * 5 + window.innerHeight / 2 &&
        hotspotLeft < x * 3 + window.innerWidth / 2 &&
        hotspotRight > x * 3 + window.innerWidth / 2
    );
  }, [b, g]);

  return (
    <div className="App">
      <button
        style={{ zIndex: "10", position: "absolute" }}
        onClick={() => {
          requestDeviceMotionEventPermission();
        }}
      > 
        {"request permission"}
      </button>
      {/* <div
        className="hotspot"
        style={{
          fontSize: "50px",
          width: "50px",
          height: "50px",
          position: "fixed",
          top: `${hotspotTop - 50}px`,
          left: `${hotspotLeft + 50}px`,
        }}
      >
        {isOpen ? "Hello!" : "👀"}
        <div>
          {hotspotTop},{hotspotBottom},{y * 3}
        </div>
        {hotspotLeft},{hotspotRight},{x * 3 + window.innerWidth / 2}
      </div> */}
      <Cursor y={y} x={x} />
    </div>
  );
}

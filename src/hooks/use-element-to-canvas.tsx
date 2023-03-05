import { useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";

const useElementToCanvas = (
  divRef: React.RefObject<HTMLDivElement>,
  canvasRef: React.RefObject<HTMLCanvasElement>
) => {
  const [isCapturing, setIsCapturing] = useState(false);

  const handleCapture = async () => {
    setIsCapturing(true);

    const divElement = divRef.current;
    const canvasElement = canvasRef.current;

    if (!divElement || !canvasElement) return;

    const canvas = await html2canvas(divElement);

    canvasElement.width = canvas.width;
    canvasElement.height = canvas.height;

    const ctx = canvasElement.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(canvas, 0, 0);

    setIsCapturing(false);
  };

  return {
    capture: handleCapture,
    isCapturing,
  };
};

export default useElementToCanvas;

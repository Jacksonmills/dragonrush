import { useState } from "react";
import html2canvas from "html2canvas";
import { COLORS } from "@/constants";

const useElementToPip = (
  divRef: React.RefObject<HTMLDivElement>,
  canvasRef: React.RefObject<HTMLCanvasElement>,
) => {
  const [isCapturing, setIsCapturing] = useState(false);

  const handleCapture = async () => {
    setIsCapturing(true);

    const divElement = divRef.current;
    const canvasElement = canvasRef.current;

    if (!divElement || !canvasElement) return;

    const canvas = await html2canvas(divElement, { backgroundColor: COLORS.black });

    const scale = 0.25;
    canvasElement.width = canvas.width;
    canvasElement.height = canvas.height;

    const ctx = canvasElement.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(canvas, 0, 0);

    setIsCapturing(false);

    const stream = canvasElement.captureStream();

    const video = document.createElement("video");
    video.srcObject = stream;
    video.addEventListener("loadedmetadata", () => {
      const pip = video.requestPictureInPicture().then(() => video.requestPictureInPicture());
      video.play();
      pip.catch(() => {
        console.log("Failed to open Picture-in-Picture mode.");
      });
    });

    setIsCapturing(false);
  };

  return {
    capture: handleCapture,
    isCapturing,
  };
};

export default useElementToPip;


import { calculateBounds } from "./CalculateBounds";

export const drawFrame = (ctx: CanvasRenderingContext2D, x: number, y: number, startX: number, startY: number, scale: number) => {
    const { leftX, topY, width, height } = calculateBounds(startX, startY, x, y);
 
    const scaledLeftX = leftX * scale;
    const scaledTopY = topY * scale;
    const scaledWidth = width * scale;
    const scaledHeight = height * scale;

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = "white";
    ctx.fillRect(scaledLeftX, scaledTopY, scaledWidth, scaledHeight);
    ctx.strokeStyle = "black";
    ctx.strokeRect(scaledLeftX, scaledTopY, scaledWidth, scaledHeight);

    ctx.fillStyle = "black";
    ctx.font = "16px Arial";
    ctx.fillText("Frame 1", scaledLeftX + 5, scaledTopY - 5);
};


import { calculateBounds } from "./CalculateBounds";
export const drawFrame = (ctx: CanvasRenderingContext2D, x: number, y: number, startX: number, startY: number) => {
    const { leftX, topY, width, height } = calculateBounds(startX, startY, x, y);

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = "white";
    ctx.fillRect(leftX, topY, width, height);
    ctx.strokeStyle = "black";
    ctx.strokeRect(leftX, topY, width, height);

    ctx.fillStyle = "black";
    ctx.font = "16px Arial";
    ctx.fillText("Frame 1", leftX + 5, topY - 5);
};

import { calculateBounds } from "./CalculateBounds";
export const drawTriangle = (ctx: CanvasRenderingContext2D, x: number, y: number, startX: number, startY: number) => {
    const { leftX, topY, width, height } = calculateBounds(startX, startY, x, y);

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.beginPath();
    ctx.moveTo(leftX + width / 2, topY);
    ctx.lineTo(leftX, topY + height);
    ctx.lineTo(leftX + width, topY + height);
    ctx.closePath();
    ctx.stroke();
};

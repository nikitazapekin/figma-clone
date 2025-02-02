import { calculateBounds } from "./CalculateBounds";
export const drawTriangle = (ctx: CanvasRenderingContext2D, x: number, y: number, startX: number, startY: number, scale: number) => {
    const { leftX, topY, width, height } = calculateBounds(startX, startY, x, y);
    const scaledLeftX = leftX * scale;
    const scaledTopY = topY * scale;
    const scaledWidth = width * scale;
    const scaledHeight = height * scale;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.beginPath();
    ctx.moveTo(scaledLeftX + scaledWidth / 2, scaledTopY);
    ctx.lineTo(scaledLeftX, scaledTopY + scaledHeight);
    ctx.lineTo(scaledLeftX + scaledWidth, scaledTopY + scaledHeight);
    ctx.closePath();
    ctx.stroke();
};

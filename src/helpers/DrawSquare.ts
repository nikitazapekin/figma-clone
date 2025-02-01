import { calculateBounds } from "./CalculateBounds";
export const drawSquare = (ctx: CanvasRenderingContext2D, x: number, y: number, isShiftPressed: boolean, startX: number, startY: number) => {
    const { leftX, topY, width, height } = calculateBounds(startX, startY, x, y);
    const size = isShiftPressed ? Math.min(width, height) : width;

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.strokeRect(leftX, topY, size, size);
};

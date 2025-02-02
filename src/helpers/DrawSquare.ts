import { calculateBounds } from "./CalculateBounds";
/* export const drawSquare = (ctx: CanvasRenderingContext2D, x: number, y: number, isShiftPressed: boolean, startX: number, startY: number) => {
    const { leftX, topY, width, height } = calculateBounds(startX, startY, x, y);
    const size = isShiftPressed ? Math.min(width, height) : width;

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.strokeRect(leftX, topY, size, size);
};
 */
/* 
export const drawSquare = (ctx: CanvasRenderingContext2D, x: number, y: number, isShiftPressed: boolean, startX: number, startY: number, scale: number) => {
    const { leftX, topY, width, height } = calculateBounds(startX, startY, x, y);
    const size = isShiftPressed ? Math.min(width, height) : width;

    // Применяем масштаб
    const scaledSize = size * scale;

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.strokeRect(leftX, topY, scaledSize, scaledSize);
};
 */
/* 
export const drawSquare = (ctx: CanvasRenderingContext2D, x: number, y: number, isShiftPressed: boolean, startX: number, startY: number, scale: number) => {
    const { leftX, topY, width, height } = calculateBounds(startX, startY, x, y);
    const size = isShiftPressed ? Math.min(width, height) : width;
 
    const scaledLeftX = leftX * scale;
    const scaledTopY = topY * scale;
    const scaledSize = size * scale;

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.strokeRect(scaledLeftX, scaledTopY, scaledSize, scaledSize);
};
 */ 
export const drawSquare = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    isShiftPressed: boolean,
    startX: number,
    startY: number,
    scale: number
) => {
    const { leftX, topY, width, height } = calculateBounds(startX, startY, x, y);
    const size = isShiftPressed ? Math.min(width, height) : width;
    const scaledSize = size * scale;
    const scaledLeftX = leftX * scale;
    const scaledTopY = topY * scale;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.strokeRect(scaledLeftX, scaledTopY, scaledSize, scaledSize);
};

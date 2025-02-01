import { calculateBounds } from "./CalculateBounds";
/* export const drawTriangle = (ctx: CanvasRenderingContext2D, x: number, y: number, startX: number, startY: number) => {
    const { leftX, topY, width, height } = calculateBounds(startX, startY, x, y);

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.beginPath();
    ctx.moveTo(leftX + width / 2, topY);
    ctx.lineTo(leftX, topY + height);
    ctx.lineTo(leftX + width, topY + height);
    ctx.closePath();
    ctx.stroke();
};
 */
/* 
export const drawTriangle = (ctx: CanvasRenderingContext2D, x: number, y: number, startX: number, startY: number, scale: number) => {
    const { leftX, topY, width, height } = calculateBounds(startX, startY, x, y);

     
    const scaledWidth = width * scale;
    const scaledHeight = height * scale;

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.beginPath();
    ctx.moveTo(leftX + scaledWidth / 2, topY);
    ctx.lineTo(leftX, topY + scaledHeight);
    ctx.lineTo(leftX + scaledWidth, topY + scaledHeight);
    ctx.closePath();
    ctx.stroke();
};
 */

export const drawTriangle = (ctx: CanvasRenderingContext2D, x: number, y: number, startX: number, startY: number, scale: number) => {
    const { leftX, topY, width, height } = calculateBounds(startX, startY, x, y);

    // Масштабируем позицию и размер
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

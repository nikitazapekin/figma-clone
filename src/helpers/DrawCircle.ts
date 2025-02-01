 import { calculateBounds } from "./CalculateBounds";
 export const drawCircle = (ctx: CanvasRenderingContext2D, x: number, y: number, isShiftPressed: boolean, startX: number, startY: number) => {
        const { leftX, topY, width, height } = calculateBounds(startX, startY, x, y);
        const radius = isShiftPressed
            ? Math.min(width, height) / 2
            : Math.sqrt(width ** 2 + height ** 2) / 2;

        const centerX = leftX + width / 2;
        const centerY = topY + height / 2;

        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.stroke();
    };
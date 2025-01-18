import { useEffect, useRef, useState } from "react";
import styles from "./Canvas.module.scss";

const Canvas = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [startX, setStartX] = useState(0);
    const [startY, setStartY] = useState(0);
    const [isDown, setIsDown] = useState(false);

    const updateCanvasSize = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // Сохраняем текущий контекст
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const oldWidth = canvas.width;
        const oldHeight = canvas.height;

        // Сохраняем рисунок
        const imageData = ctx.getImageData(0, 0, oldWidth, oldHeight);

        // Устанавливаем новые размеры
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

        // Восстанавливаем рисунок
        ctx.putImageData(imageData, 0, 0);
    };

    useEffect(() => {
        updateCanvasSize();

        // Обновляем размеры канваса при изменении окна
        window.addEventListener("resize", updateCanvasSize);
        return () => window.removeEventListener("resize", updateCanvasSize);
    }, []);

    const drawOval = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.beginPath();
        ctx.moveTo(startX, startY + (y - startY) / 2);
        ctx.bezierCurveTo(startX, startY, x, startY, x, startY + (y - startY) / 2);
        ctx.bezierCurveTo(x, y, startX, y, startX, startY + (y - startY) / 2);
        ctx.closePath();
        ctx.stroke();
    };

    const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        setStartX(e.clientX - rect.left);
        setStartY(e.clientY - rect.top);
        setIsDown(true);
    };

    const handleMouseUp = () => {
        setIsDown(false);
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!isDown) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        drawOval(ctx, mouseX, mouseY);
    };

    return (
        <div className={styles.wrapper}>
            <canvas
                ref={canvasRef}
                className={styles.canvas}
                style={{ border: "1px solid blue" }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseOut={handleMouseUp}
            ></canvas>
        </div>
    );
};

export default Canvas;

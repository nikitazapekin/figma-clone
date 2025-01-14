
import { useEffect, useRef, useState } from "react";
import styles from "./Canvas.module.scss";
import CanvasTools from "@/features/CanvasTools/CanvasTools";

const Canvas = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [startPos, setStartPos] = useState<{ x: number; y: number } | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const context = canvas.getContext("2d");
        if (!context) return;

        const handleMouseDown = (event: MouseEvent) => {
            setIsDrawing(true);
            setStartPos({ x: event.offsetX, y: event.offsetY });
        };

        const handleMouseMove = (event: MouseEvent) => {
            if (!isDrawing || !startPos) return;

            const radiusX = Math.abs(event.offsetX - startPos.x);
            const radiusY = Math.abs(event.offsetY - startPos.y);

            context.clearRect(0, 0, canvas.width, canvas.height);

            context.beginPath();

            if (event.shiftKey) {
                const radius = Math.max(radiusX, radiusY);
                context.arc(startPos.x, startPos.y, radius, 0, Math.PI * 2);
            } else {
                context.ellipse(
                    startPos.x,
                    startPos.y,
                    radiusX,
                    radiusY,
                    0,
                    0,
                    Math.PI * 2
                );
            }

            context.stroke();
        };

        const handleMouseUp = () => {
            setIsDrawing(false);
            setStartPos(null);
        };

        canvas.addEventListener("mousedown", handleMouseDown);
        canvas.addEventListener("mousemove", handleMouseMove);
        canvas.addEventListener("mouseup", handleMouseUp);
        canvas.addEventListener("mouseleave", handleMouseUp);

        return () => {
            canvas.removeEventListener("mousedown", handleMouseDown);
            canvas.removeEventListener("mousemove", handleMouseMove);
            canvas.removeEventListener("mouseup", handleMouseUp);
            canvas.removeEventListener("mouseleave", handleMouseUp);
        };
    }, [isDrawing, startPos]);

    const handleDrop = (event: React.DragEvent<HTMLCanvasElement>) => {
        event.preventDefault();
        const canvas = canvasRef.current;
        if (!canvas) return;

        const context = canvas.getContext("2d");
        if (!context) return;

        const file = event.dataTransfer.files[0];
        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onload = () => {
                const img = new Image();
                img.onload = () => {
                    context.clearRect(0, 0, canvas.width, canvas.height);
                    context.drawImage(img, 0, 0, canvas.width, canvas.height);
                };
                if (reader.result) {
                    img.src = reader.result as string;
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDragOver = (event: React.DragEvent<HTMLCanvasElement>) => {
        event.preventDefault(); 
    };

    return (
        <div>
            <canvas
                ref={canvasRef}
                className={styles.canvas}
                width={800}
                height={600}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
            ></canvas>
            <CanvasTools />
        </div>
    );
};

export default Canvas;
 
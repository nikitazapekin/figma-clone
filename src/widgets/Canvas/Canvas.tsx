import { useEffect, useRef, useState } from "react";
import styles from "./Canvas.module.scss";
import CanvasTools from "@/features/CanvasTools/CanvasTools";
import { CanvasOptionSelector } from "@/pages/store/Selectors/CanvasSelector";
import { useSelector } from "react-redux";

const Canvas = () => {
    const selectedOption = useSelector(CanvasOptionSelector); 
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [startX, setStartX] = useState(0);
    const [startY, setStartY] = useState(0);
    const [isDown, setIsDown] = useState(false);
    const [isShiftPressed, setIsShiftPressed] = useState(false);

    const updateCanvasSize = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        const oldWidth = canvas.width;
        const oldHeight = canvas.height;
        const imageData = ctx.getImageData(0, 0, oldWidth, oldHeight);
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        ctx.putImageData(imageData, 0, 0);
    };

    useEffect(() => {
        updateCanvasSize();
        window.addEventListener("resize", updateCanvasSize);

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Shift") setIsShiftPressed(true);
        };
        const handleKeyUp = (e: KeyboardEvent) => {
            if (e.key === "Shift") setIsShiftPressed(false);
        };

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);

        return () => {
            window.removeEventListener("resize", updateCanvasSize);
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, []);

    const drawSquare = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
        const size = isShiftPressed ? Math.abs(x - startX) : x - startX;
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.strokeRect(startX, startY, size, isShiftPressed ? size : y - startY);
    };

    const drawCircle = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
        const radius = isShiftPressed
            ? Math.abs(x - startX) / 2
            : Math.sqrt((x - startX) ** 2 + (y - startY) ** 2) / 2;
        const centerX = (startX + x) / 2;
        const centerY = (startY + y) / 2;

        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.stroke();
    };

    const drawTriangle = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
        const base = isShiftPressed ? Math.abs(x - startX) : x - startX;
        const height = isShiftPressed ? base : y - startY;

        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.beginPath();
        ctx.moveTo(startX, startY);  
        ctx.lineTo(startX + base / 2, startY + height);  
        ctx.lineTo(startX - base / 2, startY + height);  
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

        switch (selectedOption) {
            case "square":
                drawSquare(ctx, mouseX, mouseY);
                break;
            case "round":
                drawCircle(ctx, mouseX, mouseY);
                break;
            case "triangle":
                drawTriangle(ctx, mouseX, mouseY);
                break;
            default:
                break;
        }
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
            />
            <CanvasTools />
        </div>
    );
};

export default Canvas;


/*
import { useEffect, useRef, useState } from "react";
import styles from "./Canvas.module.scss";
import CanvasTools from "@/features/CanvasTools/CanvasTools";
import { CanvasOptionSelector } from "@/pages/store/Selectors/CanvasSelector";
import {useSelector} from "react-redux"
const Canvas = () => {
    const selectedOption = useSelector(CanvasOptionSelector);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [startX, setStartX] = useState(0);
    const [startY, setStartY] = useState(0);
    const [isDown, setIsDown] = useState(false);

    const updateCanvasSize = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        const oldWidth = canvas.width;
        const oldHeight = canvas.height;
        const imageData = ctx.getImageData(0, 0, oldWidth, oldHeight);
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        ctx.putImageData(imageData, 0, 0);
    };

    useEffect(() => {
        updateCanvasSize();
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
            />
            <CanvasTools />
        </div>
    );
};

export default Canvas;
*/
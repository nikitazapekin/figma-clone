 
import { useEffect, useRef, useState } from "react";
import styles from "./Canvas.module.scss";
import CanvasTools from "@/features/CanvasTools/CanvasTools";
import { CanvasArrayOfFiguresSelector, CanvasOptionSelector } from "@/pages/store/Selectors/CanvasSelector";
import { useDispatch, useSelector } from "react-redux";
import { addFigure } from "@/pages/store/Reducers/CanvasReducer";
import LayoutPanel from "../LayoutPanel/LayoutPanel";

const Canvas = () => {
    const dispatch = useDispatch();
    const arrayOfFigures = useSelector(CanvasArrayOfFiguresSelector);
    const selectedOption = useSelector(CanvasOptionSelector);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

    const [startX, setStartX] = useState(0);
    const [startY, setStartY] = useState(0);
    const [isDown, setIsDown] = useState(false);
    const [isShiftPressed, setIsShiftPressed] = useState(false);
    const [canvasImageData, setCanvasImageData] = useState<ImageData | null>(null);

    const updateCanvasSize = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
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

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            ctxRef.current = canvas.getContext("2d");
        }
    }, []);

    const drawSquare = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
        const size = isShiftPressed ? Math.min(Math.abs(x - startX), Math.abs(y - startY)) : Math.abs(x - startX);
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.strokeRect(startX, startY, size, isShiftPressed ? size : y - startY);
    };

    const drawCircle = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
        const radius = isShiftPressed
            ? Math.min(Math.abs(x - startX), Math.abs(y - startY)) / 2
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

        const ctx = ctxRef.current;
        if (ctx) {
            setCanvasImageData(ctx.getImageData(0, 0, canvas.width, canvas.height));
        }
    };

    const handleMouseUp = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (e.button !== 0) return;

        setIsDown(false);
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = ctxRef.current;
        if (!ctx) return;

        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const width = Math.abs(mouseX - startX);
        const height = isShiftPressed ? width : Math.abs(mouseY - startY);

        dispatch(
            addFigure({
                coordX: startX,
                coordY: startY,
                type: selectedOption,
                width,
                height,
            })
        );
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!isDown) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = ctxRef.current;
        if (!ctx) return;

        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        if (canvasImageData) {
            ctx.putImageData(canvasImageData, 0, 0);
        }

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
    useEffect(() => {
        const ctx = ctxRef.current;
        if (ctx) {
          ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
          arrayOfFigures.forEach(figure => {
            ctx.beginPath();
            if (figure.type === "square") {
              ctx.strokeRect(figure.coordX, figure.coordY, figure.width, figure.height);
            } else if (figure.type === "round") {
              const radius = Math.max(figure.width, figure.height) / 2;
              ctx.arc(figure.coordX, figure.coordY, radius, 0, 2 * Math.PI);
            } else if (figure.type === "triangle") {
              const base = figure.width;
              const height = figure.height;
              ctx.moveTo(figure.coordX, figure.coordY);
              ctx.lineTo(figure.coordX + base / 2, figure.coordY + height);
              ctx.lineTo(figure.coordX - base / 2, figure.coordY + height);
              ctx.closePath();
            }
            ctx.stroke();
          });
        }
      }, [arrayOfFigures]);

    return (
        <div className={styles.wrapper}>
            <canvas
                ref={canvasRef}
                className={styles.canvas}
                style={{ border: "1px solid blue" }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
            />
            <CanvasTools />
            <LayoutPanel />
        </div>
    );
};

export default Canvas;

 
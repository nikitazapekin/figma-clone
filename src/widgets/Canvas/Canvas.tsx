import { useEffect, useRef, useState } from "react";
import styles from "./Canvas.module.scss";
import CanvasTools from "@/features/CanvasTools/CanvasTools";
import { CanvasArrayOfFiguresSelector, CanvasArrayOfLinesSelector, CanvasOptionSelector } from "@/pages/store/Selectors/CanvasSelector";
import { useDispatch, useSelector } from "react-redux";
import { addFigure, addFrame, addLine, updateFigure } from "@/pages/store/Reducers/CanvasReducer";
import LayoutPanel from "../LayoutPanel/LayoutPanel";
import { isSelectedElementSelector } from "@/pages/store/Selectors/StylesSelector";
import { setSelectedElement } from "@/pages/store/Reducers/StylesReducer";
import StyleTools from "@/features/StyleTools/StyleTools";
import ScaleComponent from "@/features/ScaleComponent/ScaleComponent";
import { ScaleSelector } from "@/pages/store/Selectors/SizeReducer";
import { calculateBounds } from "@/helpers/CalculateBounds";
import { drawSquare } from "@/helpers/DrawSquare";
import { drawCircle } from "@/helpers/DrawCircle";
import { drawTriangle } from "@/helpers/DrawTriangle";
import { drawFrame } from "@/helpers/DrawFrame";
import { setCloseLayout } from "@/pages/store/Reducers/LayoutReducer";
import { setCanvasElements } from "@/services/canvas";

interface Point {
    x: number;
    y: number;
}
interface CanvasProps {
    id: string
}
const Canvas = ({id}: CanvasProps) => {
    const dispatch = useDispatch();
    const arrayOfFigures = useSelector(CanvasArrayOfFiguresSelector);
    const arrayOfLines = useSelector(CanvasArrayOfLinesSelector);
    const selectedOption = useSelector(CanvasOptionSelector);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

    const [startX, setStartX] = useState(0);
    const [startY, setStartY] = useState(0);
    const [isDown, setIsDown] = useState(false);
    const [isShiftPressed, setIsShiftPressed] = useState(false);
    const [canvasImageData, setCanvasImageData] = useState<ImageData | null>(null);
    const [path, setPath] = useState<Point[]>([]);
    const [text, setText] = useState("");
    const [textPosition, setTextPosition] = useState<{ x: number; y: number } | null>(null);

    const [offsetX, setOffsetX] = useState(0);
    const [offsetY, setOffsetY] = useState(0);
    const [lastMouseX, setLastMouseX] = useState(0);
    const [lastMouseY, setLastMouseY] = useState(0);
    const [selectedFigure, setSelectedFigure] = useState<any>(null);

    const { isSelected, element } = useSelector(isSelectedElementSelector);
    const scale = useSelector(ScaleSelector);   

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
    }, [scale]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            ctxRef.current = canvas.getContext("2d");
        }
    }, []);

    const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        setStartX(e.clientX - rect.left);
        setStartY(e.clientY - rect.top);
        setIsDown(true);

        if (selectedOption === "hand") {
            setLastMouseX(e.clientX);
            setLastMouseY(e.clientY);
            setIsDown(true);
            return;
        }
        if (selectedOption === "move") {
            const foundFigure = arrayOfFigures.find(
                (fig) =>
                    x >= fig.coordX && x <= fig.coordX + fig.width * scale &&
                    y >= fig.coordY && y <= fig.coordY + fig.height * scale
            );
            if (foundFigure) {
                setSelectedFigure(foundFigure);
                setLastMouseX(x);
                setLastMouseY(y);
                setIsDown(true);
            }
            return;
        }
        const ctx = ctxRef.current;
        setPath([{ x, y }]);
        if (ctx && selectedOption === "pencil") {
            ctx.beginPath();
            ctx.moveTo(x, y);
        }
        if (ctx) {
            setCanvasImageData(ctx.getImageData(0, 0, canvas.width, canvas.height));
        }
        if (selectedOption === "text") {
            setText("");
            setTextPosition({ x, y });
            return;
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

        const { leftX, topY, width, height } = calculateBounds(startX, startY, mouseX, mouseY);
if(selectedOption!="move") {

    dispatch(
        addFigure({
                id: arrayOfFigures.length + 1,
                coordX: leftX,
                coordY: topY,
                type: selectedOption,
                width: width * scale,  
                height: height * scale,  
                border: 0,
                opacity: 1,
                stroke: 0,
                strokeColor: "#000",
                shadowColor: "#000",
                shadowX: 0,
                shadowY: 0,
                background: "#fff",
                layout: Math.max(arrayOfFigures.length, arrayOfLines.length)+1
            })
        );
    }
        if (selectedOption === "pencil" && path.length > 1) {
            const minX = Math.min(...path.map(p => p.x));
            const minY = Math.min(...path.map(p => p.y));
            const maxX = Math.max(...path.map(p => p.x));
            const maxY = Math.max(...path.map(p => p.y));
            dispatch(
                addLine({
                    id: arrayOfLines.length + 1,
                    coordX: minX,
                    coordY: minY,
                    type: "pencil",
                    width: (maxX - minX) * scale,  
                    height: (maxY - minY) * scale,  
                    path,

                    strokeWidth: 2,
                    color: "black",
                    layout: Math.max(arrayOfFigures.length, arrayOfLines.length)+1
                })
            );
        }
        if (selectedOption === "frame") {
            dispatch(
                addFrame({
                    id: arrayOfFigures.length + 1,
                    coordX: leftX,
                    coordY: topY,
                    width: width * scale, 
                    height: height * scale,   
                    type: "frame",
                    background: "#fff",
                    layout: Math.max(arrayOfFigures.length, arrayOfLines.length)+1
                })
            );
        }
        setSelectedFigure(null)
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        if (!isDown) return;
        if (selectedOption === "hand") {
            const dx = e.clientX - lastMouseX;
            const dy = e.clientY - lastMouseY;
            setOffsetX((prev) => prev + dx);
            setOffsetY((prev) => prev + dy);
            setLastMouseX(e.clientX);
            setLastMouseY(e.clientY);
            return;
        }
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const deltaX = mouseX - lastMouseX;
        const deltaY = mouseY - lastMouseY;
        const newFigure = { ...selectedFigure };
        newFigure.coordX += deltaX;
        newFigure.coordY += deltaY;
        newFigure.right = newFigure.coordX + newFigure.width;
        newFigure.bottom = newFigure.coordY + newFigure.height;
        dispatch(updateFigure(newFigure));
        setLastMouseX(mouseX);
        setLastMouseY(mouseY);
        const ctx = ctxRef.current;
        if (!ctx) return;
        if (canvasImageData) {
            ctx.putImageData(canvasImageData, 0, 0);
        }
        switch (selectedOption) {
            case "square":
                drawSquare(ctx, mouseX, mouseY, isShiftPressed, startX, startY, scale);
                break;
            case "round":
                drawCircle(ctx, mouseX, mouseY, isShiftPressed, startX, startY, scale);
                break;
            case "triangle":
                drawTriangle(ctx, mouseX, mouseY, startX, startY, scale);
                break;
            case "frame":
                drawFrame(ctx, mouseX, mouseY, startX, startY, scale);
                break;
            default:
                break;
        }

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (selectedOption === "pencil") {
            ctx.lineTo(x, y);
            ctx.stroke();
            setPath((prevPath) => [...prevPath, { x, y }]);
        }
        if (selectedOption === "move" && selectedFigure) {
            const updatedFigure = {
                ...selectedFigure,
                coordX: selectedFigure.coordX + deltaX,
                coordY: selectedFigure.coordY + deltaY
            };
            dispatch(updateFigure(updatedFigure));
            setSelectedFigure(updatedFigure);
            setLastMouseX(mouseX);
            setLastMouseY(mouseY);
        }
    };
 

    useEffect(() => {
        const ctx = ctxRef.current;
        if (ctx) {
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            ctx.save();
            ctx.translate(offsetX, offsetY);
    
             const sortedFigures = [...arrayOfFigures].sort((a, b) => a.layout - b.layout);
            const sortedLines = [...arrayOfLines].sort((a, b) => a.layout - b.layout);
    
            sortedFigures.forEach(figure => {
                ctx.beginPath();
                ctx.globalAlpha = figure.opacity;
                ctx.shadowColor = figure.shadowColor;
                ctx.shadowOffsetX = figure.shadowX;
                ctx.shadowOffsetY = figure.shadowY;
                ctx.lineWidth = figure.stroke;
                ctx.strokeStyle = figure.strokeColor;
                ctx.fillStyle = figure.background || "#fff";
                if (figure.type === "square") {
                    ctx.roundRect(
                        figure.coordX,
                        figure.coordY,
                        figure.width * scale,
                        figure.height * scale,
                        figure.border
                    );
                } else if (figure.type === "round") {
                    const radius = Math.max(figure.width, figure.height) / 2;
                    ctx.arc(
                        figure.coordX + figure.width * scale / 2,
                        figure.coordY + figure.height * scale / 2,
                        radius * scale,
                        0,
                        2 * Math.PI
                    );
                } else if (figure.type === "triangle") {
                    const base = figure.width * scale;
                    const height = figure.height * scale;
                    ctx.moveTo(figure.coordX + base / 2, figure.coordY);
                    ctx.lineTo(figure.coordX, figure.coordY + height);
                    ctx.lineTo(figure.coordX + base, figure.coordY + height);
                    ctx.closePath();
                } else if (figure.type === "frame") {
                    ctx.fillStyle = "white";
                    ctx.fillRect(figure.coordX, figure.coordY, figure.width * scale, figure.height * scale);
                    ctx.strokeStyle = "black";
                    ctx.strokeRect(figure.coordX, figure.coordY, figure.width * scale, figure.height * scale);
                    ctx.fillStyle = "black";
                    ctx.font = "16px Arial";
                    ctx.fillText("Frame 1", figure.coordX + 5, figure.coordY - 5);
                }
    
                ctx.fill();
                ctx.stroke();
            });
    
            sortedLines.forEach(line => {
                ctx.beginPath();
                ctx.strokeStyle = line.color;
                ctx.lineWidth = line.strokeWidth;
                line.path.forEach((point, index) => {
                    if (index === 0) {
                        ctx.moveTo(point.x, point.y);
                    } else {
                        ctx.lineTo(point.x, point.y);
                    }
                });
                ctx.stroke();
            });
    
            ctx.restore();

setCanvasElements(arrayOfFigures, arrayOfLines, id)


        }
    }, [arrayOfFigures, arrayOfLines, offsetX, offsetY, selectedFigure]);
    

    useEffect(() => {
        if (selectedFigure) {
            dispatch(setSelectedElement(selectedFigure));
            dispatch(setCloseLayout())
        }
    }, [selectedFigure]);

    useEffect(() => {
        if (selectedFigure) {
            const updatedFigure = arrayOfFigures.find(fig => fig.coordX === selectedFigure.coordX && fig.coordY === selectedFigure.coordY);
            if (updatedFigure) {
                setSelectedFigure(updatedFigure);
            }
        }
    }, [arrayOfFigures]);

    const handleTextSubmit = () => {
        if (text.trim() && textPosition) {
            setText("");
            setTextPosition(null);
        }
    };
    useEffect(() => {
        const updatedFigures = arrayOfFigures.map(figure => ({
            ...figure,
            coordX: figure.coordX * scale, 
            coordY: figure.coordY * scale,  
            width: figure.width * scale,    
            height: figure.height * scale, 
        }));
     
        updatedFigures.forEach((updatedFigure) => {
            dispatch(updateFigure(updatedFigure));
        });
    }, [scale, dispatch]);
    
    return (
        <div className={styles.wrapper}>
            <canvas
                ref={canvasRef}
                className={styles.canvas}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
            />
            {textPosition && (
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onBlur={handleTextSubmit}
                    style={{
                        position: "absolute",
                        left: `${textPosition.x}px`,
                        top: `${textPosition.y}px`,
                        border: "1px solid gray",
                        fontSize: "16px",
                        padding: "2px",
                    }}
                />
            )}
            <CanvasTools />
            <LayoutPanel />
            <ScaleComponent />
            {isSelected && <StyleTools type={element?.type} />}
        </div>
    );
};

export default Canvas;

 

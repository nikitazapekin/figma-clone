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
interface Point {
    x: number;
    y: number;
}
const Canvas = () => {
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


    const { isSelected, element } = useSelector(isSelectedElementSelector)
    const scale = useSelector(ScaleSelector)
   // const [zoom, setZoom] = useState(1);
    const updateCanvasSize = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        ctx.putImageData(imageData, 0, 0);
      //  ctx.scale(scale, scale); 
   //   ctx.scale(zoom * scale, zoom * scale);
  /*  ctx.setTransform(zoom * scale, 0, 0, zoom * scale, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height); */
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
    }, [scale ]);
 
    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            ctxRef.current = canvas.getContext("2d");
        }
    }, []);

    const calculateBounds = (x1: number, y1: number, x2: number, y2: number) => {
        const leftX = Math.min(x1, x2);
        const topY = Math.min(y1, y2);
        const width = Math.abs(x2 - x1);
        const height = Math.abs(y2 - y1);
        return { leftX, topY, width, height };
    };

    const drawSquare = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
        const { leftX, topY, width, height } = calculateBounds(startX, startY, x, y);
        const size = isShiftPressed ? Math.min(width, height) : width;

        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.strokeRect(leftX, topY, size, size);
    };

    const drawCircle = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
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

    const drawTriangle = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
        const { leftX, topY, width, height } = calculateBounds(startX, startY, x, y);

        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.beginPath();
        ctx.moveTo(leftX + width / 2, topY);
        ctx.lineTo(leftX, topY + height);
        ctx.lineTo(leftX + width, topY + height);
        ctx.closePath();
        ctx.stroke();
    };

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
                    x >= fig.coordX && x <= fig.coordX + fig.width &&
                    y >= fig.coordY && y <= fig.coordY + fig.height
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

        dispatch(
            addFigure({
                id: arrayOfFigures.length + 1,
                coordX: leftX,
                coordY: topY,
                type: selectedOption,
                width,
                height,
                border: 0,
                opacity: 1,
                stroke: 0,
                strokeColor: "#000",
                shadowColor: "#000",
                shadowX: 0,
                shadowY: 0,
                background: "#fff"
            })
        );


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
                    width: maxX - minX,
                    height: maxY - minY,
                    path,

                    strokeWidth: 2,
                    color: "black",
                })
            );


        }



        if (selectedOption === "frame") {
            dispatch(
                addFrame({
                    id: arrayOfFigures.length + 1,
                    coordX: leftX,
                    coordY: topY,
                    width,
                    height,
                    type: "frame",
                    background: "#fff"
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
                drawSquare(ctx, mouseX, mouseY);
                break;
            case "round":
                drawCircle(ctx, mouseX, mouseY);
                break;
            case "triangle":
                drawTriangle(ctx, mouseX, mouseY);
                break;

            case "frame":
                drawFrame(ctx, mouseX, mouseY);
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


    function drawRoundedTriangle(
        ctx: CanvasRenderingContext2D,
        x: number,
        y: number,
        width: number,
        height: number,
        borderRadius: number,
        color: string
    ) {
        function lerp(p1: [number, number], p2: [number, number], t: number): [number, number] {
            return [
                p1[0] * (1 - t) + p2[0] * t,
                p1[1] * (1 - t) + p2[1] * t
            ];
        }

        ctx.save();
        ctx.translate(x, y);
        ctx.beginPath();

        const p1: [number, number] = [width / 2, 0];
        const p2: [number, number] = [0, height];
        const p3: [number, number] = [width, height];


        const radius = Math.min(borderRadius, width / 4, height / 4);


        const q1 = lerp(p1, p2, radius / width);
        const q2 = lerp(p1, p3, radius / width);
        const q3 = lerp(p2, p3, radius / height);


        ctx.moveTo(q1[0], q1[1]);
        ctx.quadraticCurveTo(p1[0], p1[1], q2[0], q2[1])

        ctx.lineTo(p3[0], p3[1]);
        ctx.quadraticCurveTo(p3[0], p3[1], q3[0], q3[1]);

        ctx.lineTo(q1[0], q1[1]);
        ctx.quadraticCurveTo(p2[0], p2[1], q1[0], q1[1]);

        ctx.closePath();
        ctx.fillStyle = color;
        ctx.fill();
        ctx.stroke();
        ctx.restore();
    }

    useEffect(() => {
        const ctx = ctxRef.current;
        if (ctx) {
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            ctx.save();
            ctx.translate(offsetX, offsetY);
            arrayOfFigures.forEach(figure => {
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
                        figure.width,
                        figure.height,
                        figure.border
                    );
                } else if (figure.type === "round") {
                    const radius = Math.max(figure.width, figure.height) / 2;
                    ctx.arc(
                        figure.coordX + figure.width / 2,
                        figure.coordY + figure.height / 2,
                        radius,
                        0,
                        2 * Math.PI
                    );
                } else if (figure.type === "triangle") {
                    const base = figure.width;
                    const height = figure.height;
                    ctx.moveTo(figure.coordX + base / 2, figure.coordY);
                    ctx.lineTo(figure.coordX, figure.coordY + height);
                    ctx.lineTo(figure.coordX + base, figure.coordY + height);
                    ctx.closePath();
                }
                else if (figure.type === "frame") {
                    ctx.fillStyle = "white";
                    ctx.fillRect(figure.coordX, figure.coordY, figure.width, figure.height);
                    ctx.strokeStyle = "black";
                    ctx.strokeRect(figure.coordX, figure.coordY, figure.width, figure.height);
                    ctx.fillStyle = "black";
                    ctx.font = "16px Arial";
                    ctx.fillText("Frame 1", figure.coordX + 5, figure.coordY - 5);
                }


                ctx.fill();
                ctx.stroke();
            });

            arrayOfLines.forEach(line => {
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
        }
    }, [arrayOfFigures, arrayOfLines, offsetX, offsetY, selectedFigure]);

    const handleTextSubmit = () => {
        if (text.trim() && textPosition) {

            setText("");
            setTextPosition(null);
        }
    };

    useEffect(() => {
        if (selectedFigure) {

            dispatch(setSelectedElement(selectedFigure))
        }
    }, [selectedFigure])


    useEffect(() => {
        if (selectedFigure) {
            const updatedFigure = arrayOfFigures.find(fig => fig.coordX === selectedFigure.coordX && fig.coordY === selectedFigure.coordY);
            if (updatedFigure) {
                setSelectedFigure(updatedFigure);
            }
        }
    }, [arrayOfFigures]);





    const drawFrame = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
        const { leftX, topY, width, height } = calculateBounds(startX, startY, x, y);

        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.fillStyle = "white";
        ctx.fillRect(leftX, topY, width, height);
        ctx.strokeStyle = "black";
        ctx.strokeRect(leftX, topY, width, height);

        ctx.fillStyle = "black";
        ctx.font = "16px Arial";
        ctx.fillText("Frame 1", leftX + 5, topY - 5);
    };


   
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
            {isSelected && (
                <StyleTools
                    type={element?.type}
                />
            )}
        </div>
    );
};

export default Canvas;





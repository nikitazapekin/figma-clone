import styles from "./CanvasTools.module.scss"
import HandIcon from "@/assets/CanvasPanelIcons/hand-cursor.png"
import ArrowIcon from "@/assets/CanvasPanelIcons/cursor.png"
import ChatIcon from "@/assets/CanvasPanelIcons/chat.png"
import FrameIcon from "@/assets/CanvasPanelIcons/frame.png"
import PencilIcon from "@/assets/CanvasPanelIcons/pencil.png"
import RoundIcon from "@/assets/CanvasPanelIcons/round.png"
import SquareIcon from "@/assets/CanvasPanelIcons/square.png"
import TextIcon from "@/assets/CanvasPanelIcons/text.png"
import TriangleIcon from "@/assets/CanvasPanelIcons/triangle.png"
import CanvasToolList from "@/entities/CanvasToolList/CanvasToolList"
const buttons = [
    {
        id: 1,
        icon: ArrowIcon,
        value: "move",
        nestedButtons: [
            {
                id: 2,
                icon: ArrowIcon,
                value: "move",
            },
            {
                id: 3,
                icon: HandIcon,
                value: "hand",
            }
        ]
    },


    {
        id: 4,
        icon: FrameIcon,
        value: "frame",
        nestedButtons: null
    },


    {
        id: 5,
        icon: PencilIcon,
        value: "pencil",
        nestedButtons: null
    },


    {
        id: 6,
        icon: SquareIcon,
        value: "square",
        nestedButtons: [
            {
                id: 7,
                icon: SquareIcon,
                value: "square",
            },
            {
                id: 8,
                icon: RoundIcon,
                value: "round",
            },
            {
                id: 9,
                icon: TriangleIcon,
                value: "triangle",
            },
        ]
    },
    {
        id: 10,
        icon: TextIcon,
        value: "text",
        nestedButtons: null
    },
    {
        id: 11,
        icon: ChatIcon,
        value: "chat",
        nestedButtons: null
    },
]

const CanvasTools = () => {
    return (
        <div className={styles.canvas}>
            {
                buttons.map(item => (
                    <CanvasToolList
                        key={item.id}
                        item={item}
                    />
                ))
            }
        </div>);
}

export default CanvasTools;
import { FigureObject, LineObject } from "@/pages/store/Reducers/types";
import styles from "./LayoutItem.module.scss"
interface LayoutItemProps {
    item: FigureObject | LineObject
    onDragStart: (e: React.DragEvent<HTMLDivElement>, item: FigureObject | LineObject) => void;
    onDrop: (e: React.DragEvent<HTMLDivElement>, targetItem: FigureObject | LineObject) => void;
}
const LayoutItem = ({ item, onDragStart, onDrop }: LayoutItemProps) => {
    return (
        <div className={styles.item}
        draggable
        onDragStart={(e) => onDragStart(e, item)}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => onDrop(e, item)}
        >
            <h3 className={styles.item__title}>
                Item number: {item.id}, {item.type}
            </h3>
        </div>);
}

export default LayoutItem;
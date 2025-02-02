import { FigureObject, LineObject } from "@/pages/store/Reducers/types";
import styles from "./LayoutItem.module.scss"
interface LayoutItemProps {
    item: FigureObject | LineObject
}
const LayoutItem = ({ item }: LayoutItemProps) => {
    return (
        <div className={styles.item}>
            <h3 className={styles.item__title}>
                Item number {item.id}, {item.type}
            </h3>
        </div>);
}

export default LayoutItem;
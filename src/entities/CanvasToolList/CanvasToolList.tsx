import Image, { StaticImageData } from "next/image";
import styles from "./CanvasToolList.module.scss"
import DownArrow from "@/assets/CanvasPanelIcons/down-arrow1.png"
interface CanvasToolListNestedItem {
    id: number,
    icon: StaticImageData,
    value: string,
}
interface CanvasToolListItem {
    item: {
        id: number,
        icon: StaticImageData,
        value: string,
        nestedButtons: null | CanvasToolListNestedItem[]
    }
}
const CanvasToolList = ({ item }: CanvasToolListItem) => {
    return (
        <div className={styles.item}>
            <Image src={item.icon}
                className={styles.item__image}
                alt="Icon"
            /> {
                item.nestedButtons && (
                    <Image className={styles.item__downArrow}
                        src={DownArrow}
                        alt="Icon"
                    />
                )
            }
        </div>
    );
}

export default CanvasToolList;
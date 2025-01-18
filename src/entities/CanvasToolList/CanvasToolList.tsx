import Image, { StaticImageData } from "next/image";
import styles from "./CanvasToolList.module.scss"
import DownArrow from "@/assets/CanvasPanelIcons/down-arrow1.png"
import { useState } from "react";
import CanvasToolMenu from "@/features/CanvasToolMenu/CanvasToolMenu";
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

    const [isClicked, setIsClicked] = useState<boolean>(false)
    const handleClick = () => {
        setIsClicked(prev => !prev)
    }
    return (
        <div className={styles.item}>
            <Image src={item.icon}
                className={styles.item__image}
                alt="Icon"
            /> {
                item.nestedButtons && (
                    <Image className={styles.item__downArrow}
                        onClick={handleClick}
                        src={DownArrow}
                        alt="Icon"
                    />
                )
            }


            {
                isClicked && (
                    <CanvasToolMenu
                        nestedButtons={item.nestedButtons}
                    />
                )

            }
        </div>
    );
}

export default CanvasToolList;
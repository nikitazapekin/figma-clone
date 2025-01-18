import Image, { StaticImageData } from "next/image";
import styles from "./CanvasToolList.module.scss"
import DownArrow from "@/assets/CanvasPanelIcons/down-arrow1.png"
import { useState } from "react";
import CanvasToolMenu from "@/features/CanvasToolMenu/CanvasToolMenu";
import { useDispatch, useSelector } from 'react-redux';
import { selectOption } from "@/pages/store/Reducers/CanvasReducer";
import { CanvasOptionSelector } from "@/pages/store/Selectors/CanvasSelector";
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
    const dispatch = useDispatch()
    const [isClicked, setIsClicked] = useState<boolean>(false)
    const selectedOption = useSelector(CanvasOptionSelector);
    const handleOpen = () => {
        setIsClicked(prev => !prev)

    }

    const handleSelect = () => {
        dispatch(selectOption(item.value))

    }
    return (
        <div className={`${styles.item} ${selectedOption==item.value ? styles.item__active : "" }`} >
            <Image src={item.icon}
                className={styles.item__image}
                onClick={handleSelect}
                alt="Icon"
            /> {
                item.nestedButtons && (
                    <Image className={`${styles.item__downArrow} ${isClicked ? styles.item__downArrowReverse : ""}`}
                        onClick={handleOpen}
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
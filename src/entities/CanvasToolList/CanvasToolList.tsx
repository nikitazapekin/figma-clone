import Image, { StaticImageData } from "next/image";
import styles from "./CanvasToolList.module.scss"
import DownArrow from "@/assets/CanvasPanelIcons/down-arrow1.png"
import { useEffect, useState } from "react";
import CanvasToolMenu from "@/features/CanvasToolMenu/CanvasToolMenu";
import { useDispatch, useSelector } from 'react-redux';
import { selectOption, setOpenMenuToolbarList } from "@/pages/store/Reducers/CanvasReducer";
import { CanvasIsOpenMenuToolbarSelector, CanvasOptionSelector, CanvasOptionIdSelector } from "@/pages/store/Selectors/CanvasSelector";
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
    }, 
    index: number
}
const CanvasToolList = ({ item, index }: CanvasToolListItem) => {
    const dispatch = useDispatch()
    const [isClicked, setIsClicked] = useState<boolean>(false)
 
    const selectedOption = useSelector(CanvasOptionSelector);
    const selectedOptionId = useSelector(CanvasOptionIdSelector);
    const isOpenMenuToolbar = useSelector(CanvasIsOpenMenuToolbarSelector)
    const handleOpen = () => {
    
      dispatch(setOpenMenuToolbarList())
      dispatch(selectOption({value: item.value, id: item.id} ))
    }

    const handleSelect = () => {
        dispatch(selectOption({value: item.value, id: item.id} ))

      

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
               
                    isOpenMenuToolbar && index==selectedOptionId && (
                    <CanvasToolMenu
                    
                        nestedButtons={item.nestedButtons}
                    />


                )
                
            }
          
        </div>
    );
}

export default CanvasToolList;
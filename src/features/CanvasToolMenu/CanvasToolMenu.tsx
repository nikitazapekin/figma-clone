
import CanvasToolList from "@/entities/CanvasToolList/CanvasToolList";
import { StaticImageData } from "next/image"
import styles from "./CanvasToolMenu.module.scss"
import {useDispatch} from "react-redux"
import { setOpenMenuToolbarList } from "@/pages/store/Reducers/CanvasReducer";
interface CanvasToolListNestedItem {
    nestedButtons: {
        id: number,
        icon: StaticImageData,
        value: string,
    }[] | null,
 
}
const CanvasToolMenu = ({ nestedButtons }: CanvasToolListNestedItem) => {
    const dispatch = useDispatch()
    const handleClose =() => {
        dispatch(setOpenMenuToolbarList())
    }
    return (
        <div className={styles.toolbar} 
        onClick={handleClose}
        >
            {nestedButtons?.map((item, index) => (

                <CanvasToolList
                    item={{...item, nestedButtons: null}}
                    index={item.id}
                    key={index}
                />
            ))}
        </div>

    );
}

export default CanvasToolMenu;
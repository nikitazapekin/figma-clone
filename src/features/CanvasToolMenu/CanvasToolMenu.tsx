
import CanvasToolList from "@/entities/CanvasToolList/CanvasToolList";
import { StaticImageData } from "next/image"
import styles from "./CanvasToolMenu.module.scss"
interface CanvasToolListNestedItem {
    nestedButtons: {
        id: number,
        icon: StaticImageData,
        value: string,
    }[] | null
}
const CanvasToolMenu = ({ nestedButtons }: CanvasToolListNestedItem) => {
    return (
        <div className={styles.toolbar}>
            {nestedButtons?.map((item) => (

                <CanvasToolList
                    item={{...item, nestedButtons: null}}
                />
            ))}
        </div>

    );
}

export default CanvasToolMenu;
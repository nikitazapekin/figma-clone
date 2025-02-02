import Image from "next/image";
import styles from "./SidebarButton.module.scss"
import Menu from "@/assets/icons/menu.png"
import { useDispatch } from "react-redux"
import { setOpenLayotPanel } from "@/pages/store/Reducers/CanvasReducer";
interface SidebarButtonProps {
    handler: ()=> void
}
const SidebarButton = ({handler}: SidebarButtonProps) => {
    
  /*   const handleOpen = () => {
        dispatch(setOpenLayotPanel())
    } */
    return (
        <div className={styles.button}
            onClick={handler}
        >
            <Image
                className={styles.button__image}
                src={Menu}
                alt="Icon"
            />
        </div>
    );
}

export default SidebarButton;
import SidebarButton from "@/shared/SidebarButton/SidebarButton";
import styles from "./LayoutPanel.module.scss"
import LayoutPanelContent from "@/features/LayoutPanelContent/LayoutPanelContent";
import { useDispatch } from "react-redux";
import { setOpenLayout } from "@/pages/store/Reducers/LayoutReducer";
const LayoutPanel = () => {
const dispatch = useDispatch()
    const handleOpen =()=> {
        dispatch(setOpenLayout())
    }
    return (
        <div className={styles.panel}>
            <SidebarButton 
            handler={handleOpen}
            />
            <LayoutPanelContent />
        </div>
    );
}

export default LayoutPanel;
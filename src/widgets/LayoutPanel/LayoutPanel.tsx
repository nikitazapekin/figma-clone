import SidebarButton from "@/shared/SidebarButton/SidebarButton";
import styles from "./LayoutPanel.module.scss"
import LayoutPanelContent from "@/features/LayoutPanelContent/LayoutPanelContent";
const LayoutPanel = () => {
    return (
        <div className={styles.panel}>
            <SidebarButton 
            />
            <LayoutPanelContent />
        </div>
    );
}

export default LayoutPanel;
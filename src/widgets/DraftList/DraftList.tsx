import DraftListHeader from "@/features/DraftListHeader/DraftListHeader";
import styles from "./DraftList.module.scss"
const DraftList = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.draft}>
                <DraftListHeader />
            </div>
        </div>);
}

export default DraftList;
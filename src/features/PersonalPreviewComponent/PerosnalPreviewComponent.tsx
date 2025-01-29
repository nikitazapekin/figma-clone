import Avatar from "@/entities/Avatar/Avatar";
import styles from "./PerosnalPreviewComponent.module.scss"
const PersonalPrevviewCompoent = () => {
    return (
        <div className={styles.personal}>
            <Avatar />
            <h1 className={styles.personal__title}>
                user
            </h1>
        </div>);
}

export default PersonalPrevviewCompoent;
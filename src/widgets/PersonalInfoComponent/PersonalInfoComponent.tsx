import Avatar from "@/entities/Avatar/Avatar";
import styles from "./PersonalInfoComponent.module.scss"
import PersonalPrevviewCompoent from "@/features/PersonalPreviewComponent/PerosnalPreviewComponent";
const PersonalInfoComponent = () => {
    return (
        <div className={styles.personal}>
            <div className={styles.personal__container}>
             
                <PersonalPrevviewCompoent
                />
            </div>


        </div>
    );
}

export default PersonalInfoComponent;
import styles from "@/app/theme/wrappers.module.scss"
import DraftList from "@/widgets/DraftList/DraftList";



export default function DraftsPage() {
  return (
   <div className={styles.wrapperMax}>
      <DraftList />
   </div>
   
  );
}

 
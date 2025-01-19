import Canvas from "@/widgets/Canvas/Canvas";
import styles from "@/app/theme/wrappers.module.scss"
export default function CanvasPage() {
    return (
      <div  className={styles.wrapperMax}  >
    <Canvas />
      </div>
    );
  }
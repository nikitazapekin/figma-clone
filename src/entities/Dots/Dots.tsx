import Dot from "@/shared/Dot/Dot";
import styles from "./Dots.module.scss"
interface DotsProps {
    count: number,
    handleDot: (index: number)=> void
    active: number
}
const Dots = ({ count , handleDot, active}: DotsProps) => {
    return (
        <div className={styles.dots}>
            {Array.from({ length: count }, (_, index) => (
                <Dot 
                index={index}
                key={index} 
               handleDot={handleDot}
               active={active}
                />
            ))}
        </div>
    );
}

export default Dots;
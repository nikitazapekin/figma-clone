import Dot from "@/shared/Dot/Dot";
import styles from "./Dots.module.scss"
interface DotsProps {
    count: number
}
const Dots = ({ count }: DotsProps) => {
    return (
        <div className={styles.dots}>
            {Array.from({ length: count }, (_, index) => (
                <Dot 
                index={index}
                key={index} 
                
                />
            ))}
        </div>
    );
}

export default Dots;
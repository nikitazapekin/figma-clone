import styles from "./Dot.module.scss"
interface DotProps {
    index:number,
    handleDot: (index: number) => void
    active: number

}
const Dot = ({index, handleDot, active}: DotProps) => {
    return ( 
        <div className={`${styles.dot} ${active == index ? styles.active : ""}`} 
        data-name={index}
        onClick={()=>handleDot(index)}
        
        >
        
        </div>

        
     );
}
 
export default Dot;
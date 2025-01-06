import styles from "./Dot.module.scss"
interface DotProps {
    index:number
}
const Dot = ({index}: DotProps) => {
    return ( 
        <div className={styles.dot} 
        data-name={index}
        />

        
     );
}
 
export default Dot;
import styles from "./ActionButton.module.scss"
interface ActionButtonProps {
    text: string
}
const ActionButton = ({text}: ActionButtonProps) => {
    return ( 
        <div className={styles.button}>
            {text}
        </div>
     );
}
 
export default ActionButton;
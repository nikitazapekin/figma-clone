import styles from "./ScaleButton.module.scss"
interface ScaleBottonProps {
    text: string,
    handler: () => void
}
const ScaleButton = ({ text, handler }: ScaleBottonProps) => {
    return (
        <div onClick={handler}
        className={styles.btn}
        > 
            {text}
        </div>
    );
}

export default ScaleButton;
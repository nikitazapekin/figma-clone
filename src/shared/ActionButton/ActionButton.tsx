import Link from "next/link";
import styles from "./ActionButton.module.scss"
interface ActionButtonProps {
    text: string,
    link: string
}
const ActionButton = ({ text, link }: ActionButtonProps) => {
    return (
        <div className={styles.button}>
            <Link href={`${link}`}>
                {text}
            </Link>
        </div>
    );
}

export default ActionButton;
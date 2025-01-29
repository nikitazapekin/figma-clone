import { useRouter } from "next/router"
import styles from "./DraftListItem.module.scss"
interface DraftListItemProps {
    item: {
        ID: number,
        Name: string,
        Description: string,
        Likes: number,
        CreatedAt: string,
        AuthorID: number
    }
}
const DraftListItem = ({ item }: DraftListItemProps) => {
    const router = useRouter()
    const handleNavigate = () => {
        router.push(`/CanvasPage`)
    }
    return (<div className={styles.item}
        onClick={handleNavigate}
    >
        <h2 className={styles.item__title}>
            {item.Name}
        </h2>
        <h3 className={styles.item__created}>
            Создано: {item.CreatedAt}
        </h3>
        <h4 className={styles.item__decribtion}>
            Описание: {item.Description}
        </h4>

    </div>);
}

export default DraftListItem;
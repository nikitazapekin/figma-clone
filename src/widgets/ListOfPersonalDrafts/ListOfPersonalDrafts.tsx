import styles from "./ListOfPersonalDrafts.module.scss"
import DraftListItem from "@/features/DraftListItem/DraftListItem"
interface ListProps {
    drafts: {
        ID: number,
        Name: string,
        Description: string,
        Likes: number,
        CreatedAt: string,
        AuthorID: number
      }[]
}
const ListOfPersonalDrafts = ({drafts}: ListProps ) => {
    return ( 
        <div className={styles.wrapper}>
        <div className={styles.draft}>
            <div className={styles.draft__container}>
 
                <div className={styles.draft__cards}>
                    {drafts && drafts.map((item) => (
                        <DraftListItem
                            item={item}
                            key={item.ID}
                        />
                    ))}
                </div>
            </div>
        </div>
    </div> );
}
 
export default ListOfPersonalDrafts;
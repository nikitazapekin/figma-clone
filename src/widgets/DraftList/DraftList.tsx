import DraftListHeader from "@/features/DraftListHeader/DraftListHeader";
import styles from "./DraftList.module.scss";
import DraftListItem from "@/features/DraftListItem/DraftListItem";
import axios from "axios";

interface DraftsProps {
    drafts: Array<{
        ID: number;
        Name: string;
        Description: string;
        Likes: number;
        CreatedAt: string;
        AuthorID: number;
    }>;
}

const DraftList = ({ drafts }: DraftsProps) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.draft}>
                <div className={styles.draft__container}>
                    <DraftListHeader />
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
        </div>
    );
};

export default DraftList;

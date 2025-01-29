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

    const handleClick=async () => {
        try {
            const response = await axios.get(
              `http://${process.env.NEXT_PUBLIC_BASE_URL}:${process.env.NEXT_PUBLIC_PORT}/get-cookie`,
              {
              
                withCredentials: true,
              }
            );
            return response.data;  
          } catch (error) {
            if (axios.isAxiosError(error)) {
              const errorMessage = error.response?.data?.message || error.message || 'Неизвестная ошибка';
              throw new Error(errorMessage);
            }
            throw new Error('Произошла неизвестная ошибка.');
          }
    }
    return (
        <div className={styles.wrapper}>
            <div className={styles.draft}>
                <div className={styles.draft__container}>
                    <DraftListHeader />
                    <div className={styles.draft__cards}>
                        {drafts.map((item) => (
                            <DraftListItem
                                item={item}
                                key={item.ID}
                            />
                        ))}
                    </div>
                </div>
            </div>


            <button onClick={handleClick}>
                cliick
            </button>
        </div>
    );
};

export default DraftList;

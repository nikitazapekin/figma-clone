
import { useState } from "react";
import styles from "./StyleToolsItem.module.scss";
import { setNewStyle } from "@/pages/store/Thunk/SetNewStyle";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/pages/store/store";

interface NestedItem {
    id: number;
    title: string;
    value: string;
    placeholder: string;
    type: String[]
    field: string
}

interface StyleToolsItemProps {
    item: {
        id: number;
        title: string;
        value: string;
        placeholder: string;
        type: String[]
        nested?: NestedItem[];
        field: string
    },
    type: string
}

const StyleToolsItem = ({ item, type }: StyleToolsItemProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch<AppDispatch>()
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
       
        dispatch(setNewStyle({ field: e.target.name , value: e.target.value }))
       
    }
    return (
        <>
            {item.type.includes(type) && (
                <div className={styles.item}>
                    {!item.nested ? (
                        <div className={styles.singleItem}>
                            <h3 className={styles.item__title}>{item.title}</h3>
                            <input placeholder={item.placeholder} className={styles.item__input}
                                onChange={(e) => handleChange(e)}
                                name={item.field}
                            />
                        </div>
                    ) : (
                        <details
                            className={styles.item__details}
                            open={isOpen}
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            <summary className={styles.item__summary}>
                                {item.title}
                                {isOpen ? "▲" : "▼"}
                            </summary>
                            {item.nested.map((nested) => (
                                <div key={nested.id} className={styles.nestedItem}>
                                    <h3 className={styles.item__title}>{nested.title}</h3>
                                    <input
                                        placeholder={nested.placeholder}
                                        className={styles.item__input}
                                        onChange={(e) => handleChange(e)}
                                        name={nested.field}
                                    />


                                    {nested.field}
                                </div>
                            ))}
                        </details>
                    )}
                </div>
            )
            }
        </>
    );
};

export default StyleToolsItem;

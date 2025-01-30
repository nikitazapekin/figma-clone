import styles from "./StyleToolsItem.module.scss"
interface StyleToolsItemProps {
    item: {

        id: number,
        title: string,
        value: string,
        nested?: {
            id: number,
            title: string,
            value: string,
        }[]
    }
}
const StyleToolsItem = ({ item }: StyleToolsItemProps) => {
    return (

        <>
            {!item.nested ? (
                <div className={styles.item}>
                    <h3 className={styles.title}>
                        {item.title}
                    </h3>
                    <input

                    />


                </div>

            ) : (
                <summary>
                    {item.title}
                    <details>
                        {
                        item.nested.map(nested => (
                            <>
                                <h3 className={styles.title}>
                                    {nested.title}
                                </h3>
                                <input

                                />
                            </>
                        ))
                    }

                    </details>
                </summary>

            )
            }

        </>

    );
}

export default StyleToolsItem;
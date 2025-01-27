import styles from "./DraftListHeader.module.scss"
const DraftListHeader = () => {
    return (
        <div className={styles.header}>
            <div className={styles.header__container}>

                <h2 className={styles.header__title}>
                    Список чертежей
                </h2>
                <select className={styles.header__list}>
                    <option className={styles.header__option}>Самые новые</option>
                    <option className={styles.header__option}>Самые лучшие</option>
                </select>
            </div>
        </div>
    );
}

export default DraftListHeader;
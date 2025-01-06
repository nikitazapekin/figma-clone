import styles from "./AuthFormField.module.scss"
interface FieldProps {
    title: string,
    placeholder: string
}
const AuthFormField = ({ title, placeholder }: FieldProps) => {
    return (
        <div className={styles.field__wrapper}>
            <h3 className={styles.field__title}>
                {title}
            </h3>
            <div className={styles.field}>
                <input type="text"
                    className={styles.field__input}
                    placeholder={placeholder}
                />
            </div>
        </div>
    );
}

export default AuthFormField;
import React from "react";
import styles from "./AuthFormField.module.scss";

interface FieldProps {
    title: string;
    placeholder: string;
    field: string
    handleInputChange: (field: string, value: string) => void;
}

const AuthFormField: React.FC<FieldProps> = ({ title, placeholder, field,  handleInputChange }) => {
    return (
        <div className={styles.field__wrapper}>
            <h3 className={styles.field__title}>{title}</h3>
            <div className={styles.field}>
                <input
                    type="text"
                    name={field}
                    className={styles.field__input}
                    placeholder={placeholder}
                    onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                />
            </div>
        </div>
    );
};

export default AuthFormField;


/*
import styles from "./AuthFormField.module.scss"
interface FieldProps {
    title: string,
    placeholder: string,
    handleInputChange: (field: keyof FormData, value: string)=> void
}
const AuthFormField = ({ title, placeholder, handleInputChange }: FieldProps) => {
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

*/
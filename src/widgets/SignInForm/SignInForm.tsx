import { SignInConsts } from "@/mocks/SignInForm";
import styles from "./SignInForm.module.scss"
import AuthFormField from "@/features/AuthFormField/AuthFormField";
import AuthCarousel from "@/features/AuthCarousel/AuthCarousel";


const SignInForm = () => {
    return (
        <form className={styles.form}>
            <div className={styles.form__container}>
                <div className={styles.form__info}>
                    <AuthCarousel />
                </div>
                <div className={styles.form__auth}>
                    <h1 className={styles.form__title}>
                        Добро пожаловать
                    </h1>
                    <h3 className={styles.form__describtion}>
                        Авторизуйтесь в нашем приложении для пользования
                    </h3>
                    <div className={styles.form__fields}>
                        {SignInConsts.map((item => (
                            <AuthFormField title={item.title} placeholder={item.placeholder} />
                        )))}
                    </div>
                </div>
            </div>
        </form>);
}

export default SignInForm;
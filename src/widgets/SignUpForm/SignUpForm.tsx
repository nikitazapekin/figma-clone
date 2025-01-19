import { SignInConsts } from "@/mocks/SignInForm";
import styles from "./SignUpForm.module.scss"
import AuthFormField from "@/features/AuthFormField/AuthFormField";
import AuthCarousel from "@/features/AuthCarousel/AuthCarousel";
import Image from "next/image";
import Google from "@/assets/google.png"
import ActionButton from "@/shared/ActionButton/ActionButton";
import Link from "next/link";
const SignUpForm = () => {
    return (
        <form className={styles.form}>
            <div className={styles.form__container}>
                <div className={styles.form__info}>
                    <AuthCarousel />
                </div>
                <div className={styles.form__auth}>
                    <div className={styles.form__auth__content}>
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

                        <ActionButton

                        link={"CanvasPage"}
                            text={"Зарегистрироваться"}
                        />
                        <p className={styles.form__or}>
                            Или
                        </p>
                        <div className={styles.form__google}>
                            <Image
                                src={Google}
                                className={styles.form__google__image}
                                alt="Google"
                            />
                        </div>
                        <p className={styles.form__or}>
                            <Link href={`/SignIn`} className={styles.form__link}>
                        Войти
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </form>);
}

export default SignUpForm;
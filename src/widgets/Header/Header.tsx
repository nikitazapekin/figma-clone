
import Image from "next/image";
import styles from "./Header.module.scss"
import Link from "next/link";
import Logo from "@/assets/logo.png"
const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.header__container}>
                <Link href="#" className={styles.header__logo}>
                    <Image src={Logo}
                    className={styles.header__logo__image}
                    alt="Logo" />
                </Link>

                <nav className={styles.header__navigation}>
                    <ul className={styles.header__list}>
                        <li className={styles.header__item}>

                            <Link className={styles.header__link} href={`1`}>
                                Главная
                            </Link>
                        </li>

                        <li className={styles.header__item}>

                            <Link className={styles.header__link} href={`/SignIn`}>
                                Вход
                            </Link>
                        </li>


                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;

import Image from "next/image";
import styles from "./Header.module.scss"
import Link from "next/link";
const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.header__inner}>
                <Link href="#">
                    <Image src="" alt="Logo" />

                </Link>

                <nav className={styles.header__navigation}>
                    <ul className={styles.header__list}>
                        <li className={styles.header__item}>

                            <Link className={styles.header__link} href={`1`}>
                                Главная
                            </Link>
                        </li>

                        <li className={styles.header__item}>

                            <Link className={styles.header__link} href={`1`}>
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
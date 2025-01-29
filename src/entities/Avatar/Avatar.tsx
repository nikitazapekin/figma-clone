import Image from "next/image";
import styles from "./Avatar.module.scss"
import PlusIcon from "@/assets/icons/plus.png"
import AvatarIcon from "@/assets/icons/Avatar.png"
const Avatar = () => {
    return (
        <div className={styles.avatar}>
            <Image src={AvatarIcon} alt={"Logo"}
                className={styles.avatar__image}
            />
            <input className={styles.avatar__input}
                type="file"
                accept="image/*"
            />
            <div className={styles.avatar__plus__wrapper}>

                <Image src={PlusIcon} alt={"Logo"}

                    className={styles.avatar__plus}
                />
            </div>
        </div>);
}

export default Avatar;
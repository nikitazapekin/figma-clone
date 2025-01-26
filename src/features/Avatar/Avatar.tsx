import Image from "next/image";
import styles from "./Avatar.module.scss"
import PlusIcon from "@/assets/icons/plus.png"
const Avatar = () => {
    return (
        <div>
            <Image src={""} alt={"Logo"}
            />
            <input className={styles.avatar__input} 
            type=""
            />
              <Image src={PlusIcon} alt={"Logo"} 
              />
        </div>);
}

export default Avatar;
import React, { forwardRef } from "react";
import Image, { StaticImageData } from "next/image";
import styles from "./AuthCarouselItem.module.scss";

interface AuthCarouselItemProps {
    url: StaticImageData;
    title: string;
    describtion: string;
}

const AuthCarouselItem = forwardRef<HTMLDivElement, AuthCarouselItemProps>(
    ({ url, title, describtion }, ref) => {
        return (
            <div className={styles.card} ref={ref}>
                <Image className={styles.card__image} alt="Card" src={url} />
                <h3 className={styles.card__title}>{title}</h3>
                <h4 className={styles.card__describtion}>{describtion}</h4>
            </div>
        );
    }
);

 

export default AuthCarouselItem;

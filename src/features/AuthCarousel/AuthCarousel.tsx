import styles from "./AuthCarousel.module.scss";
import AuthCarouselItem from "@/entities/AuthCarouselItem/AuthCarouselItem";
import Brush from "@/assets/icons/brush.png";
import User from "@/assets/icons/user.png";
import Book from "@/assets/icons/book.png";
import Dots from "@/entities/Dots/Dots";
import { useRef, useEffect, useState } from "react";

export const AuthCarouselItems = [
    {
        id: 1,
        title: "Создай дизайн своего приложения",
        describtion: "Используй возможности нашего приложения для создания красивого дизайна",
        icon: Brush,
    },
    {
        id: 2,
        title: "История",
        describtion: "Отслеживай изменения своего дизайна с помощью истории",
        icon: Book,
    },
    {
        id: 3,
        title: "Многопользовательский режим",
        describtion: "Разрабатывай дизайн в команде",
        icon: User,
    },
];

const AuthCarousel = () => {
    const cardRef = useRef<HTMLDivElement | null>(null);
    const [cardWidth, setCardWidth] = useState<number>(0);

    useEffect(() => {
        if (cardRef.current) {
            setCardWidth(cardRef.current.offsetWidth);
        }
    }, []);

    return (
        <div className={styles.wrapper}>
            <div className={styles.slider}>
                <div className={styles.slider__carousel}>
                    {AuthCarouselItems.map((item, index) => (
                        <AuthCarouselItem
                            key={item.id}
                            title={item.title}
                            describtion={item.describtion}
                            url={item.icon}
                            ref={index === 0 ? cardRef : null}  
                        />
                    ))}
                </div>
            </div>
            <Dots count={AuthCarouselItems.length} />
            <p>Ширина карточки: {cardWidth}px</p>
        </div>
    );
};

export default AuthCarousel;

/*
"use client"
import styles from "./AuthCarousel.module.scss"
import AuthCarouselItem from "@/entities/AuthCarouselItem/AuthCarouselItem";
import Brush from "@/assets/icons/brush.png"
import User from "@/assets/icons/user.png"
import Book from "@/assets/icons/book.png"
import Dots from "@/entities/Dots/Dots";
import { useRef, useState } from "react";
export const AuthCarouselItems = [
    {
        id: 1,
        title: "Создай дизайн своего приложения",
        describtion: "Используй возможности нашего приложения для создания красивого дизайна",
        icon:  Brush
    },
    {
        id: 2,
        title: "История",
        describtion: "Отслеживай изменения своего дизайна с помощью истории",
        icon: Book
    },
    {
        id: 3,
        title: "Многопользовательский режим",
        describtion: "Разабатывай дизайн в команде",
        icon: User
    }
]


const AuthCarousel = () => {
    const [currentSlide, setCurrentSlide] = useState<number>(0)
    const [currentPosition, setCurrentPosition] = useState<number>(0)
    const card= useRef<HTMLDivElement | null | undefined>(null)
    const handleSetSlide=(index: number)=> {
//setCurrentPosition()
    }
    return (
        <div className={styles.wrapper}>
            <div className={styles.slider}>

                <div className={styles.slider__carousel}>
                    {AuthCarouselItems.map(item => (
                        <AuthCarouselItem title={item.title} describtion={item.describtion} url={item.icon}

                        card={card}
                        key={item.id}
                        />
                    ))}
                </div>
            </div>
     
            <Dots  count={ AuthCarouselItems.length} />
        </div>
    );
}

export default AuthCarousel;

*/
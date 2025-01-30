import StyleToolsItem from "@/entities/StyleToolsItem/StyleToolsItem";
import styles from "./StyleTools.module.scss"
interface StyleToolsProps {
    type?: string
}

export const styleTools = [
    {
        id: 1,
        //    icon: ArrowIcon,
        title: "coordX",
        value: "111",
        


    },
    {
        id: 2,
        title: "coordY",
        value: "111",
    },

    {
        id: 3,
        title: "Opacity",
        value: "1",
    },

    {
        id: 4,
        title: "Border",
        value: "0",
    },
    {
        id: 5,
        title: "Background",
        value: "#fff",
    },
    {
        id: 6,
        title: "Text",
        value: "",
    },

    {
        id: 7,
        title: "FontWeight",
        value: "400",
    },
    {
        id: 8,
        title: "FontSize",
        value: "22",
    },
    {
        id: 9,
        title: "FontFamily",
        value: "Roboto",
    },
    {
        id: 10,
        title: "Stroke",
        value: "1",
    },
    {
        id: 11,
        title: "Shadow",
        value: "#fff",
        nested: [
            {
                id: 12,
                title: "CoordX",
                value: "0",
            },
            {
                id: 13,
                title: "CoordY",
                value: "0",
            }
        ]
    }
]
const StyleTools = ({ type }: StyleToolsProps) => {
    return (
        <div className={styles.tools}>
            {
                styleTools.map(item => (
                    <StyleToolsItem
                        key={item.id}
                        item={item}
                    />
                ))
            }
        </div>
    );
}

export default StyleTools;
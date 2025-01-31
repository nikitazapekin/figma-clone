import StyleToolsItem from "@/entities/StyleToolsItem/StyleToolsItem";
import styles from "./StyleTools.module.scss"
import { styleTools } from "@/mocks/StyleTools";
interface StyleToolsProps {
    type?: string
}
 
const StyleTools = ({ type }: StyleToolsProps) => {
    return (
        <div className={styles.tools}>
            {
                
                styleTools.map( item=> (
                 
                        <StyleToolsItem
                            type={type!}
                            key={item.id}
                            item={item}
                        />
                ))
            }
        </div>
        
    );
}

export default StyleTools;

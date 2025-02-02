import LayoutItem from "@/entities/LayoutItem/LayoutItem";
import { CanvasArrayOfFiguresSelector, CanvasArrayOfLinesSelector } from "@/pages/store/Selectors/CanvasSelector";
import { useSelector } from "react-redux";
import styles from "./LayoutPanelContent.module.scss"
import { isOpenLayotSelector } from "@/pages/store/Selectors/LayoutSelector";
const LayoutPanelContent = () => {
  const arrayOfFigures = useSelector(CanvasArrayOfFiguresSelector);
  const arrayOfLines = useSelector(CanvasArrayOfLinesSelector);
  const isOpen = useSelector(isOpenLayotSelector)
  const sortedItems = [...arrayOfFigures, ...arrayOfLines].sort(
    (a, b) => a.layout - b.layout
  );
  return (
    <div className={styles.panel}
      style={{ transform: `translateX(${isOpen ? `0%` : `-100%`})` }}
    >
      {sortedItems.map((item, index) => (
        <LayoutItem
          key={index}
          item={item}
        />
      ))}
    </div>
  );
};

export default LayoutPanelContent;


import LayoutItem from "@/entities/LayoutItem/LayoutItem";
import { CanvasArrayOfFiguresSelector, CanvasArrayOfLinesSelector } from "@/pages/store/Selectors/CanvasSelector";
import { useDispatch, useSelector } from "react-redux";
import styles from "./LayoutPanelContent.module.scss"
import { isOpenLayotSelector } from "@/pages/store/Selectors/LayoutSelector";
import { useState } from "react";
import { FigureObject, LineObject } from "@/pages/store/Reducers/types";
import { setChangeLayout } from "@/pages/store/Reducers/CanvasReducer";
const LayoutPanelContent = () => {
  const dispatch = useDispatch()
  const arrayOfFigures = useSelector(CanvasArrayOfFiguresSelector);
  const arrayOfLines = useSelector(CanvasArrayOfLinesSelector);
  const isOpen = useSelector(isOpenLayotSelector)
  const [draggedItem, setDraggedItem] = useState<FigureObject | LineObject | null>(null);
  const sortedItems = [...arrayOfFigures, ...arrayOfLines].sort(
    (a, b) => a.layout - b.layout
  );
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, item: FigureObject | LineObject) => {
    setDraggedItem(item);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, targetItem: FigureObject | LineObject) => {
    e.preventDefault();
    if (draggedItem && draggedItem.id !== targetItem.id) {
     dispatch(setChangeLayout({ id: draggedItem.id, newLayout: targetItem.layout }));
    }
    setDraggedItem(null);
  };

  return (
    <div className={styles.panel}
      style={{ transform: `translateX(${isOpen ? `0%` : `-100%`})` }}
    >
      {sortedItems.map((item, index) => (
        <LayoutItem
          key={index}
          item={item}
          onDragStart={handleDragStart}
          onDrop={handleDrop}
        />
      ))}
    </div>
  );
};

export default LayoutPanelContent;






import { AppDispatch, RootState } from '../store'; 
import { updateFigure } from '../Reducers/CanvasReducer';
import { FigureObject, LineObject, FrameObject } from '../Reducers/types';

interface StyleList {
    field: string;
    value: string;
}

export const setNewStyle = ({ field, value }: StyleList) => 
(dispatch: AppDispatch, getState: () => RootState) => {
    console.log("start setNewStyle");

    const state = getState();
    const selectedElement = state.StylesReducer.selectedElement;

    if (!selectedElement || Object.keys(selectedElement).length === 0) {
        console.warn("Нет выбранного элемента или он пустой");
        return;
    }

    console.log("selectedElement:", selectedElement);

    const updatedElement = {
        ...selectedElement,
        [field]: value,  
    } as FigureObject;

    console.log("updatedElement:", updatedElement);
 
    if (["round", "square", "triangle"].includes(selectedElement.type)) {
        if (updateFigure) {
       
            dispatch(updateFigure(updatedElement));
        }  
    }
};


import {
    createSlice,
    PayloadAction
} from '@reduxjs/toolkit';
import { FigureObject, LineObject, FrameObject } from './types';
interface StyleList{
    field: string
   // selectedElement: FigureObject | LineObject
//fields: "coordX" | "coordY" | "opacity" | "border" | "background" | "text" | "fontWeight" | "fontSize" | "fontFamily" | "stroke" | "shadow"
}
interface StylesReducerTypes {
    isSelectedElement: boolean,
    selectedElement: FigureObject | LineObject | FrameObject | null
}
const initialState: StylesReducerTypes = {
    isSelectedElement: false,
    selectedElement: null
};
const StylesSlice = createSlice({
    name: 'styles',
    initialState,
    reducers: {
        setSelectedElement(state, action: PayloadAction<FigureObject | LineObject | FrameObject>) {
            state.isSelectedElement = true
            state.selectedElement = action.payload
        }, 
        setNewStyle(state, action: PayloadAction<StyleList>) {
         
        }
    },
});

export const {
setSelectedElement,
setNewStyle
} = StylesSlice.actions;
export default StylesSlice.reducer;
 
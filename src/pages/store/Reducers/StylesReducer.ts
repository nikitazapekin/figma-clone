
import {
    createSlice,
    PayloadAction
} from '@reduxjs/toolkit';
import { FigureObject, LineObject, FrameObject } from './types';

 
 
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
        }
  
    },
});

export const {
setSelectedElement
 
} = StylesSlice.actions;
export default StylesSlice.reducer;
 
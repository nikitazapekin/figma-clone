
import {
    createSlice,
    PayloadAction
} from '@reduxjs/toolkit';
import { FigureObject, LineObject, FrameObject } from './types';

 
 
interface LayoutReducerTypes {
    isOpenLayout: boolean,
    selectedElement: FigureObject | LineObject | FrameObject | null
}
const initialState: LayoutReducerTypes = {
    isOpenLayout: false,
    selectedElement: null
};
const LayoutSlice = createSlice({
    name: 'layout',
    initialState,
    reducers: {
        setSelectedElement(state, action: PayloadAction<FigureObject | LineObject | FrameObject>) {
    
            state.selectedElement = action.payload
        },
        setOpenLayout(state) {
            state.isOpenLayout =true
        },
        setCloseLayout(state) {
            state.isOpenLayout =false
        }
    },
});

export const {
setSelectedElement,
setOpenLayout, 
setCloseLayout
} = LayoutSlice.actions;
export default LayoutSlice.reducer;
 
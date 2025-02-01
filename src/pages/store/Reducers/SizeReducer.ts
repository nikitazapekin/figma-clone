
import {
    createSlice,
    PayloadAction
} from '@reduxjs/toolkit';
import { FigureObject, LineObject, FrameObject } from './types';



interface ScaleReducerTypes {
    scale: number
}
const initialState: ScaleReducerTypes = {
    scale: 1
};
const ScaleSlice = createSlice({
    name: 'size',
    initialState,
    reducers: {



        setScale(state, action: PayloadAction<number>) {
            state.scale = action.payload
        }
    },
});

export const {
   setScale

} = ScaleSlice.actions;
export default ScaleSlice.reducer;

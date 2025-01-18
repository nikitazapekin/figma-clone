import { RootState } from '../store';

export const CanvasOptionSelector = (state: RootState) => {
	const CanvasSlice = state.CanvasReducer;
    return CanvasSlice.selectedOption
 
};
export const CanvasArrayOfFiguresSelector = (state: RootState) => {
	const CanvasSlice = state.CanvasReducer;
    return CanvasSlice.arrayOfFigures
 
};
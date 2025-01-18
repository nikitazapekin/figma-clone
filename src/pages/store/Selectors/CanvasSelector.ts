import { RootState } from '../store';

export const CanvasOptionSelector = (state: RootState) => {
	const CanvasSlice = state.CanvasReducer;
    return CanvasSlice.selectedOption
 
};
import { RootState } from '../store';

export const CanvasOptionSelector = (state: RootState) => {
	const CanvasSlice = state.CanvasReducer;
    return CanvasSlice.selectedOption 
 
};

export const CanvasOptionIdSelector = (state: RootState) => {
	const CanvasSlice = state.CanvasReducer;
    return CanvasSlice.selectedOptionId 
 
};
export const CanvasArrayOfFiguresSelector = (state: RootState) => {
	const CanvasSlice = state.CanvasReducer;
    return CanvasSlice.arrayOfFigures
 
};

export const CanvasArrayOfLinesSelector = (state: RootState) => {
	const CanvasSlice = state.CanvasReducer;
    return CanvasSlice.arrayOfLines
 
};


export const CanvasIsOpenMenuToolbarSelector = (state: RootState) => {
	const CanvasSlice = state.CanvasReducer;
    return CanvasSlice.isOpenMenuToolbarList
 
};
export const CanvasIsOpenLayoutPanelSelector = (state: RootState) => {
	const CanvasSlice = state.CanvasReducer;
    return CanvasSlice.isOpenLayoutPanel
};
 
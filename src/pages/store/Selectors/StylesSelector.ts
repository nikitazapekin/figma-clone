import { RootState } from '../store';

export const isSelectedElementSelector = (state: RootState) => {
    const StylesSlice = state.StylesReducer;
    return { isSelected: StylesSlice.isSelectedElement, element: StylesSlice.selectedElement }
};

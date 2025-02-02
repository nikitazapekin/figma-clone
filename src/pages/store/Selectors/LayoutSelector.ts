import { RootState } from '../store';

export const isOpenLayotSelector = (state: RootState) => {
    const LayoutSlice = state.LayoutReducer;
    return  LayoutSlice.isOpenLayout
};

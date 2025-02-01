import { RootState } from '../store';
export const ScaleSelector = (state: RootState) => {
    const SizeSlice = state.ScaleReducer;
    return SizeSlice.scale
};
 
import {
  createSlice, //PayloadAction 
  PayloadAction
} from '@reduxjs/toolkit';

interface CanvasReducerTypes {
  isDark: boolean
  selectedOption: string
}
const initialState: CanvasReducerTypes = {
  isDark: false,
  selectedOption: "move"
};
const CanvasSlice = createSlice({
  name: 'canvas',
  initialState,
  reducers: {

    switchTheme: (state) => {
      state.isDark = !state.isDark
    },

    selectOption(state, action: PayloadAction<string>) {
      state.selectedOption = action.payload
    }
  },
});

export const { switchTheme, selectOption } = CanvasSlice.actions;

export default CanvasSlice.reducer;
import {
  createSlice,  
  PayloadAction
} from '@reduxjs/toolkit';

interface CanvasReducerTypes {
  
  selectedOption: string
}
const initialState: CanvasReducerTypes = {
   
  selectedOption: "move"
};
const CanvasSlice = createSlice({
  name: 'canvas',
  initialState,
  reducers: {

   

    selectOption(state, action: PayloadAction<string>) {
      state.selectedOption = action.payload
     
    }
  },
});

export const { selectOption } = CanvasSlice.actions;

export default CanvasSlice.reducer;
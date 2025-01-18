import {
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit';


interface FigureObject {
  coordX: number,
  coordY: number,
  type: string,
  width: number,
  height: number
}
interface CanvasReducerTypes {
  arrayOfFigures: FigureObject[],
  selectedOption: string
}
const initialState: CanvasReducerTypes = {
  arrayOfFigures: [

    {"coordX":306,"coordY":188,"type":"square","width":60,"height":60},
    {"coordX":506,"coordY":188,"type":"round","width":90,"height":60},
    {"coordX":306,"coordY":588,"type":"triangle","width":20,"height":20},
  ],
  selectedOption: "move"
};
const CanvasSlice = createSlice({
  name: 'canvas',
  initialState,
  reducers: {
    selectOption(state, action: PayloadAction<string>) {
      state.selectedOption = action.payload
      

    },
    addFigure(state, action: PayloadAction<FigureObject>) {
      state.arrayOfFigures.push(action.payload)
      console.log(state.arrayOfFigures)
    }
  },
});

export const { selectOption, addFigure } = CanvasSlice.actions;
export default CanvasSlice.reducer;
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
  selectedOption: string,
  selectedOptionId: number,
  isOpenMenuToolbarList: boolean
}
const initialState: CanvasReducerTypes = {
  arrayOfFigures: [

    {"coordX":306,"coordY":188,"type":"square","width":60,"height":60},
    {"coordX":506,"coordY":188,"type":"round","width":90,"height":60},
    {"coordX":306,"coordY":588,"type":"triangle","width":20,"height":20},
  ],
  selectedOption: "move",
  selectedOptionId: 0,
  isOpenMenuToolbarList: false
};
const CanvasSlice = createSlice({
  name: 'canvas',
  initialState,
  reducers: {
    selectOption(state, action: PayloadAction<{value: string, id: number}>) {
      state.selectedOption = action.payload.value
      state.selectedOptionId = action.payload.id
      console.log("ID", state.selectedOptionId)
     

    },
    addFigure(state, action: PayloadAction<FigureObject>) {
      state.arrayOfFigures.push(action.payload)
     
    },
   setOpenMenuToolbarList(state) {
   
     state.isOpenMenuToolbarList = !state.isOpenMenuToolbarList
      
    }
  },
});

export const { selectOption, addFigure, setOpenMenuToolbarList } = CanvasSlice.actions;
export default CanvasSlice.reducer;
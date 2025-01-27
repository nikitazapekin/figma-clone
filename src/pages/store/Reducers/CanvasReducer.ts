 
 
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
  isOpenMenuToolbarList: boolean,
  isOpenLayoutPanel: boolean
}
const initialState: CanvasReducerTypes = {
  arrayOfFigures: [
  ],
  selectedOption: "move",
  selectedOptionId: 0,
  isOpenMenuToolbarList: false,
  isOpenLayoutPanel: false
};
const CanvasSlice = createSlice({
  name: 'canvas',
  initialState,
  reducers: {
    selectOption(state, action: PayloadAction<{ value: string, id: number }>) {
      state.selectedOption = action.payload.value
      state.selectedOptionId = action.payload.id

    },
    addFigure(state, action: PayloadAction<FigureObject>) {
      state.arrayOfFigures.push(action.payload)

    },
    setOpenMenuToolbarList(state) {
      state.isOpenMenuToolbarList = !state.isOpenMenuToolbarList
    },


    setOpenLayotPanel(state) {
      state.isOpenLayoutPanel = !state.isOpenLayoutPanel
    }
  },
});

export const { selectOption, addFigure, setOpenMenuToolbarList, setOpenLayotPanel } = CanvasSlice.actions;
export default CanvasSlice.reducer;
 
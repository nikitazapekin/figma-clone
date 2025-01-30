 
 
import {
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit';
 


interface FigureObject {
 
  id: number;
  coordX: number,
  coordY: number,
  type: string,
  width: number,
  height: number
}

interface Point {
  x: number;
  y: number;
}

interface LineObject {
 
  

  coordX: number,
  coordY: number,
  type: string,
  width:  number,
  height: number,
 // path: number[],
  path: Point[],
  strokeWidth: number,
  color: string,
}


interface CanvasReducerTypes {
  arrayOfFigures: FigureObject[],
  arrayOfLines: LineObject[],
  selectedOption: string,
  selectedOptionId: number,
  isOpenMenuToolbarList: boolean,
  isOpenLayoutPanel: boolean
}
const initialState: CanvasReducerTypes = {
  arrayOfFigures: [
    { id: 1, coordX: 200, coordY: 200, type: "round", width: 200, height: 200 }
 //   {coordX: 200, coordY: 200, type: "round", width: 200, height: 200}
  ],
  arrayOfLines: [],
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
    addLine(state, action: PayloadAction<LineObject>) {
      state.arrayOfLines.push(action.payload)

    },
    updateFigure(state, action: PayloadAction<FigureObject>) {
      const index = state.arrayOfFigures.findIndex(fig => fig.id === action.payload.id);
      
      if (index !== -1) {
        state.arrayOfFigures[index] = action.payload;
      }
    },
    
    setOpenMenuToolbarList(state) {
      state.isOpenMenuToolbarList = !state.isOpenMenuToolbarList
    },


    setOpenLayotPanel(state) {
      state.isOpenLayoutPanel = !state.isOpenLayoutPanel
    }
  },
});

export const { selectOption, addFigure, setOpenMenuToolbarList, setOpenLayotPanel, addLine, updateFigure } = CanvasSlice.actions;
export default CanvasSlice.reducer;
 
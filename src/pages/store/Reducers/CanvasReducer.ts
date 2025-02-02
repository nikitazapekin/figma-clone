 
 
import {
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit';
 
 import { FigureObject, LineObject, FrameObject } from './types';
interface CanvasReducerTypes {
  arrayOfFigures: FigureObject[],
  arrayOfLines: LineObject[],
  arrayOfFrames: FrameObject[],
  selectedOption: string,
  selectedOptionId: number,
  isOpenMenuToolbarList: boolean,
  isOpenLayoutPanel: boolean
}  



const initialState: CanvasReducerTypes = {
  arrayOfFigures: [
 
  ],
  arrayOfLines: [],
  arrayOfFrames: [],
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
    addFrame(state, action: PayloadAction<FrameObject>) {
      state.arrayOfFrames.push(action.payload)

    },
    updateFigure(state, action: PayloadAction<FigureObject>) {
      const index = state.arrayOfFigures.findIndex(fig => fig.id === action.payload.id);
      
      if (index !== -1) {
        state.arrayOfFigures[index] = action.payload;
      }


      console.log(state.arrayOfFigures)
    },
    
    setOpenMenuToolbarList(state) {
      state.isOpenMenuToolbarList = !state.isOpenMenuToolbarList
    },


    setOpenLayotPanel(state) {
      state.isOpenLayoutPanel = !state.isOpenLayoutPanel
    },




    setChangeLayout(
      state,
      action: PayloadAction<{ id: number; newLayout: number }>
    ) {
      const { id, newLayout } = action.payload;
     
      const itemToMove =
        state.arrayOfFigures.find((fig) => fig.id === id) ||
        state.arrayOfLines.find((line) => line.id === id);
    
      if (!itemToMove) return;
    
      const oldLayout = itemToMove.layout;
      itemToMove.layout = newLayout;
    
    
      const allItems = [...state.arrayOfFigures, ...state.arrayOfLines];
    
      allItems.forEach((item) => {
        if (item.id !== id) {
          
          if (oldLayout < newLayout && item.layout > oldLayout && item.layout <= newLayout) {
            item.layout -= 1;
          }
         
          else if (oldLayout > newLayout && item.layout >= newLayout && item.layout < oldLayout) {
            item.layout += 1;
          }
        }
      });
     
      state.arrayOfFigures = allItems.filter((item) => "width" in item) as FigureObject[];
      state.arrayOfLines = allItems.filter((item) => "length" in item) as LineObject[];
    }
    


  },
});

export const { selectOption, addFigure, setOpenMenuToolbarList, setOpenLayotPanel, addLine, updateFigure,
addFrame,
setChangeLayout

 } = CanvasSlice.actions;
export default CanvasSlice.reducer;
 
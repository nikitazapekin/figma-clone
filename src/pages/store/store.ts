import { configureStore } from '@reduxjs/toolkit';
import CanvasReducer from "@/pages/store/Reducers/CanvasReducer"
import StylesReducer from "@/pages/store/Reducers/StylesReducer"
import ScaleReducer from "@/pages/store/Reducers/SizeReducer"
const store = configureStore({
  reducer: {

 CanvasReducer: CanvasReducer,
 StylesReducer: StylesReducer,
 ScaleReducer: ScaleReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
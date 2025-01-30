import { configureStore } from '@reduxjs/toolkit';
import CanvasReducer from "@/pages/store/Reducers/CanvasReducer"
import StylesReducer from "@/pages/store/Reducers/StylesReducer"
const store = configureStore({
  reducer: {

 CanvasReducer: CanvasReducer,
 StylesReducer: StylesReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
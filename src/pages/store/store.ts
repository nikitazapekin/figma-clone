import { configureStore } from '@reduxjs/toolkit';
import CanvasReducer from "@/pages/store/CanvasReducer/CanvasReducer"
const store = configureStore({
  reducer: {

 CanvasReducer: CanvasReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
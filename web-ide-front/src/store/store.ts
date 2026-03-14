import { configureStore } from "@reduxjs/toolkit";
import selectedPageReducer from '../slices/sideBarPageSlice';
import  activeFileReducer  from "../slices/currentActiveFile";
export const store= configureStore({
reducer:{
    page:selectedPageReducer,
    activeFile: activeFileReducer


}
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
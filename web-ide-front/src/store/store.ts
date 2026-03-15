import { configureStore } from "@reduxjs/toolkit";
import selectedPageReducer from '../slices/sideBarPageSlice';
import  activeFileReducer  from "../slices/currentActiveFileSlice";
import nodeSliceReducer from "../slices/nodeListSlice";
export const store= configureStore({
reducer:{
    page:selectedPageReducer,
    activeFile: activeFileReducer,
    nodeSlice:nodeSliceReducer


}
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
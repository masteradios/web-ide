import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    selectedPage:""
}
export const sideBarPageSlice =createSlice({
    name:"selectedPage",
    initialState,
    reducers:{
        setSelectedPage:(state,action)=>{

                state.selectedPage=action.payload;

        }
    }


})
export const {setSelectedPage} =sideBarPageSlice.actions;
export default sideBarPageSlice.reducer;
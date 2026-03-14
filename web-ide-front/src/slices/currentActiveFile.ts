import { createSlice } from "@reduxjs/toolkit";
const initialState ={
    activeFile:"script.js"
}

export const currentActiveFileSlice = createSlice({
    name:"currentActiveFileSlice",
    initialState,
    reducers:{
        setActiveFile :(state,action)=>{
            state.activeFile=action.payload;
        }
    }
    

});




export const {setActiveFile} = currentActiveFileSlice.actions;
export default currentActiveFileSlice.reducer;
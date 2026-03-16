import { dummyNodes } from "@/constants/Constants";
import type { INode } from "@/types/Node";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface currentActiveNodeState {
    activeNode:INode
}
const initialState :currentActiveNodeState={
activeNode:dummyNodes.filter((n)=>n.parent=="/")[0]
    
}

export const currentActiveNodeSlice = createSlice({
    name:"currentActiveFileSlice",
    initialState,
    reducers:{
        setActiveNode :(state,action:PayloadAction<INode>)=>{
            state.activeNode=action.payload;
        }
    }
    

});




export const {setActiveNode} = currentActiveNodeSlice.actions;
export default currentActiveNodeSlice.reducer;
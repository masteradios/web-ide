import { dummyNodes } from "@/constants/Constants";
import type { INode } from "@/types/Node";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface NodeState {
    nodeList: INode[]
}
const initialState: NodeState = {
    nodeList: dummyNodes
}

export const nodeSlice = createSlice({

    name: "nodeSlice",
    initialState,
    reducers: {
        addNode: (state, action:PayloadAction<INode>) => {
            state.nodeList.push(action.payload)
        },
        removeNode: (state, action:PayloadAction<INode>) => {
            state.nodeList = state.nodeList.filter((node) => action.payload.uri !== node.uri)
        },
        toggleExpanded: (state, action: PayloadAction<INode>) => {
            const node = state.nodeList.find(n => n.uri === action.payload.uri)
            if (node) node.isExpanded = !node.isExpanded
        }
    }

})
export default nodeSlice.reducer;
export const { addNode, removeNode,toggleExpanded } = nodeSlice.actions;
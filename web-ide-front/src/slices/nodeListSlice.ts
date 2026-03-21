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
        addNode: (state, action: PayloadAction<INode>) => {
            state.nodeList.push(action.payload)
        },
        removeNode: (state, action: PayloadAction<INode>) => {
            if (action.payload.isFile) {
                state.nodeList = state.nodeList.filter((node) => action.payload.uri !== node.uri)
            }
            else {
                state.nodeList = state.nodeList.filter((node) => action.payload.uri !== node.uri)
                state.nodeList = state.nodeList.filter((node) => action.payload.uri !== node.parent)

            }
        },
        toggleExpanded: (state, action: PayloadAction<INode>) => {
            const node = state.nodeList.find(n => n.uri === action.payload.uri)
            if (node) node.isExpanded = !node.isExpanded
        },

        renameNode: (state, action: PayloadAction<{
            oldNode: INode,
            newName: string
        }>) => {
            const { oldNode, newName } = action.payload
            const newUri = oldNode.uri.substring(0, oldNode.uri.lastIndexOf("/")) + "/" + newName

            state.nodeList = state.nodeList.map(n => {
                if (n.uri === oldNode.uri) return { ...n, name: newName, uri: newUri }
                if (n.parent === oldNode.uri) return { ...n, parent: newUri }
                return n
            })
        }

    }

})
export default nodeSlice.reducer;
export const { addNode, removeNode, toggleExpanded, renameNode } = nodeSlice.actions;
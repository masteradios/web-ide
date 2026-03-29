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
            const urisToRemove = new Set<string>()

            const collectUris = (uri: string) => {
                urisToRemove.add(uri)
                state.nodeList
                    .filter(n => n.parent === uri)
                    .forEach(child => collectUris(child.uri))
            }

            collectUris(action.payload.uri)
            state.nodeList = state.nodeList.filter(n => !urisToRemove.has(n.uri))
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
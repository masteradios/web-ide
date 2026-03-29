import type { INode } from "@/types/Node";
import NodeComponent from "./NodeComponent";
import { Box } from "@chakra-ui/react";

interface NodeExpandedViewProps {
    nodes: INode[]
    depth: number,
    setActiveContextNode: (node: INode) => void,
    setCoords: (coords: { x: number, y: number }) => void,
    setClicked: (v: boolean) => void,
    activeContextNode : INode | null
}

export default function NodeExpandedView({ nodes, depth = 0, setActiveContextNode,activeContextNode,setClicked,setCoords }: NodeExpandedViewProps) {
    return (<>
        {nodes.map((node) =>
            <Box key={node.uri} >
                <NodeComponent activeContextNode={activeContextNode} node={node} depth={depth} setActiveContextNode={setActiveContextNode} setCoords={setCoords} setClicked={setClicked} />
            </Box>
        )}
    </>);
};



//paddingLeft={`${depth * 6}px`}
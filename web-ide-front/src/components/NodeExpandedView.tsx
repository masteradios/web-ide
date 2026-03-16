import type { INode } from "@/types/Node";
import NodeComponent from "./NodeComponent";
import { Box } from "@chakra-ui/react";

interface NodeExpandedViewProps {
    nodes: INode[]
    depth:number
}

export default function NodeExpandedView({ nodes, depth = 0 }: NodeExpandedViewProps) {
    return (<>
        {nodes.map((node) =>
            <Box key={node.uri} paddingLeft={`${depth * 6}px`}>
                <NodeComponent node={node} depth={depth} />
            </Box>
        )}
    </>);
};
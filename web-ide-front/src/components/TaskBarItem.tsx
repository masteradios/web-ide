import type { INode } from "@/types/Node";
import { Box, Text } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { toggleExpanded } from "../slices/nodeListSlice";
import type { RootState } from "@/store/store";


interface TaskBarItemProps {
    node: INode
    isActive: boolean
}
export default function TaskBarItem({ node, isActive }: TaskBarItemProps) {
    const borderStyle = "1px solid rgba(128,128,128,0.4)";
    const nodeList = useSelector((state: RootState) => state.nodeSlice.nodeList)

    const dispatch = useDispatch();
    const onClick = () => {
        var nodeParent = node.parent; // /root/src/components/NavBar.tsx


    while (nodeParent && nodeParent !== "/") {
        const parentNode = nodeList.find(n => n.uri === nodeParent)
        if (parentNode) {
            if (!parentNode.isExpanded) {
                dispatch(toggleExpanded(parentNode))
            }
            nodeParent = parentNode.parent
        } else {
            break
        }
    }

    }
    return (
        <>
            <Box  onClick={onClick} padding={3} borderTop={isActive ? "1px solid blue" : borderStyle}
                borderX={borderStyle}>

                <Text fontSize={"sm"} width="fit-content" color="white" opacity={isActive ? "1" : "0.5"}>
                    {node.name}
                </Text>
            </Box>

        </>);
};
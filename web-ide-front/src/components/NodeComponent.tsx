import { setActiveNode } from "@/slices/currentActiveFileSlice";
import { toggleExpanded } from "@/slices/nodeListSlice";
import type { RootState } from "@/store/store";
import type { INode } from "@/types/Node"
import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { MdChevronRight, MdExpandMore } from "react-icons/md"

import { useDispatch, useSelector } from "react-redux";
import NodeExpandedView from "./NodeExpandedView";
import { VscFile } from "react-icons/vsc";

interface NodeComponentProps {

    node: INode,
    depth: number
}
export default function NodeComponent({ node,depth }: NodeComponentProps) {

    const activeNode = useSelector((state: RootState) => state.activeFile.activeNode);
    const dispatch = useDispatch();
    const onClick = () => {


        if (!node.isFile) {

            dispatch(setActiveNode(node))
            dispatch(toggleExpanded(node))

        }
        else {
            dispatch(setActiveNode(node));
        }
    }

    useEffect(() => { }, [])
    const nodeList = useSelector((state: RootState) => state.nodeSlice.nodeList)

    const children = nodeList.filter(n => n.parent === "/" + node.uri)
    return (
        <>
            <Flex onClick={onClick} borderWidth="1px"
                bgColor={activeNode && node.uri === activeNode.uri ? "gray.600" : "transparent"}
                borderColor={activeNode && node.uri === activeNode.uri ? "blue.400" : "transparent"} _hover={{ bgColor: "gray.600" }} direction={"row"} align={"center"}>

                {
                    !node.isFile ?


                        !node.isExpanded ? <Icon size={"md"}><MdChevronRight ></MdChevronRight></Icon> : <Icon size={"md"}><MdExpandMore ></ MdExpandMore></Icon>



                        : <Icon><VscFile></VscFile></Icon>}
                <Box width={"1"}></Box>
                <Text fontSize={"xs"} color={"white"}>{node.name}</Text>



            </Flex>

            {node.isExpanded ? <NodeExpandedView depth={(depth ?? 0) + 1} nodes={children}></NodeExpandedView> : null}

        </>

    )

}
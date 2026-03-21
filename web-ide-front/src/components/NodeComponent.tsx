import { setActiveNode } from "@/slices/currentActiveNodeSlice";
import { toggleExpanded } from "@/slices/nodeListSlice";
import type { RootState } from "@/store/store";
import type { INode } from "@/types/Node"
import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { MdChevronRight, MdExpandMore } from "react-icons/md"

import { useDispatch, useSelector } from "react-redux";
import NodeExpandedView from "./NodeExpandedView";
import { VscFile } from "react-icons/vsc";
import { fileLogo } from "@/constants/logo";

interface NodeComponentProps {
    node: INode,
    depth: number,
    setActiveContextNode: (node: INode) => void,
    setCoords: (coords: { x: number, y: number }) => void,
    setClicked: (v: boolean) => void
}
export default function NodeComponent({ node, depth, setActiveContextNode,setClicked,setCoords }: NodeComponentProps) {

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

    const children = nodeList.filter(n => n.parent === node.uri)
    const extensionIndex = node.name.lastIndexOf(".");
    const extension = node.name.substring(extensionIndex);

    const onContextMenu = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault()
        setClicked(true)
        setCoords({ x: e.pageX, y: e.pageY })
        setActiveContextNode(node)
    }
    return (
        <>
            <Box onContextMenu={onContextMenu} paddingLeft={"3"} onClick={onClick} borderWidth="1px" bgColor={activeNode && node.uri === activeNode.uri ? "gray.600" : "transparent"}
                borderColor={activeNode && node.uri === activeNode.uri ? "blue.400" : "transparent"} _hover={{ bgColor: "gray.600" }}>



                <Flex width={"full"}
                    direction={"row"} align={"center"} paddingLeft={`${depth * 16}px`}>

                    {
                        !node.isFile ?


                            !node.isExpanded ? <Icon size={"lg"}><MdChevronRight ></MdChevronRight></Icon> : <Icon  size={"lg"}><MdExpandMore ></ MdExpandMore></Icon>



                            : <Icon size={"sm"} paddingRight={"3px"}>{fileLogo[extension] || <VscFile />}</Icon>}
                    
                    <Text paddingLeft={"1px"} fontSize={"small"} color={"white"}>{node.name}</Text>



                </Flex>
            </Box>

            {node.isExpanded ? <NodeExpandedView setClicked={setClicked} setCoords={setCoords} setActiveContextNode={setActiveContextNode} depth={(depth ?? 0) + 1} nodes={children}></NodeExpandedView> : null}

        </>

    )

}

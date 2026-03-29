import type { RootState } from "@/store/store";
import { Box, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import NodeComponent from "./NodeComponent";
import { ContextMenu } from "./ContextMenu";
import { useContextMenu } from "@/hooks/useContextMenu";
import { menuDataforFile, menuDataforFolder } from "@/constants/Constants";

export default function FileExplorer() {

    const nodeList = useSelector((state: RootState) => state.nodeSlice.nodeList)
    const root = nodeList.find((node) => node.uri == "root");
    const { clicked, setClicked, coords, setCoords ,activeContextNode,setActiveContextNode} = useContextMenu()



    return (
        <Box textAlign={"start"} width={"full"} paddingTop={"1"}  >
            <Text paddingLeft={"3"} fontSize={"medium"} textAlign={"start"} >

                Explorer
            </Text>
            {(clicked && activeContextNode ) ? (
                <ContextMenu menuItems={activeContextNode.isFile?menuDataforFile:menuDataforFolder} node={activeContextNode} top={coords.y} left={coords.x} onClose={() => {
                    setClicked(false);
                    setActiveContextNode(null);
                }} />
            ) : <></>}
            <NodeComponent depth={0} node={root!}
                setActiveContextNode={setActiveContextNode}
                activeContextNode={activeContextNode}
                setCoords={setCoords}
                setClicked={setClicked}
            />

            {/* {nodeList.map((node)=><NodeComponent  key={node.uri} node={node} ></NodeComponent>)} */}


        </Box>)
}
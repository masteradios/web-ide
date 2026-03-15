import type { RootState } from "@/store/store";
import { Box, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import NodeComponent from "./NodeComponent";

export default function FileExplorer() {

        const nodeList = useSelector((state: RootState) => state.nodeSlice.nodeList)
        const root=nodeList.find((node) => node.uri =="root");

    return (
        <Box textAlign={"start"} width={"100%"} paddingTop={"1"} paddingLeft={"3"} >
            <Text fontSize={"medium"} textAlign={"start"} >

                Explorer
            </Text>

            <NodeComponent depth={0} key={root!.uri} node={root!}></NodeComponent>
            
             {/* {nodeList.map((node)=><NodeComponent  key={node.uri} node={node} ></NodeComponent>)} */}


        </Box>)
}
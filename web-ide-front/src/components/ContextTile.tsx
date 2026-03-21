
import type { INode } from "@/types/Node";
import { Box } from "@chakra-ui/react";
import { useState } from "react";
import { FileInfoDialogBox } from "./FileInfoDialogBox";

interface ContextTileProps {
    item: {
        id: number,
        name: string,
    },
    onClose: () => void,
    node: INode
}
export const ContextTile = ({ item, onClose, node }: ContextTileProps) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false)


    const onClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {


        e.stopPropagation()
        setIsDialogOpen(true);




    }
    return (<>

        <Box onClick={onClick} padding={2} _hover={{ bgColor: "gray.600" }} cursor="pointer">
            {item.name}
        </Box>
        <FileInfoDialogBox item={item} node={ node} isOpen={isDialogOpen} onClose={() => {
            setIsDialogOpen(false);
            onClose()
        }}></FileInfoDialogBox>

    </>);
}
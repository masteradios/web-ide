
import type { INode } from "@/types/Node";
import { Text } from "@chakra-ui/react";
import { useState } from "react";
import { ParentDialogBox } from "@/dialogBoxes/DialogBoxParent";

interface ContextTileProps {
    item: {
        id: number,
        action: string,
        name: string,
    },
    onClose: () => void,
    node: INode
}
export const ContextTile = ({ item, onClose, node }: ContextTileProps) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [dialogName, setDialogName] = useState<string | undefined>();


    const onClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {


        e.stopPropagation();
        setIsDialogOpen(true);
        switch (item.action) {
            case 'ADD_FILE':
                setDialogName("ADD")
                break;
            case 'REMOVE_NODE':
                setDialogName("DELETE")
                break;

            case 'RENAME_FILE':

                setDialogName("RENAME")
                break;

            case 'RENAME_FOLDER':

                setDialogName("RENAME")
                break;


            default:
                setDialogName(undefined);
                break;
        }





    }


    return (<>

        <Text paddingX={3} paddingY="6px" borderRadius="0.5px"
            fontSize="10px" color="rgba(255,255,255,0.85)"
            _hover={{ bgColor: "#094771" }} cursor="pointer" height={"fit-content"} onClick={onClick} width={"full"} >
            {item.name}
        </Text>
        <ParentDialogBox item={item} node={node} isOpen={isDialogOpen} onClose={() => {
            setIsDialogOpen(false);
            onClose();
        }} dialogBoxName={dialogName}></ParentDialogBox>

    </>);
}

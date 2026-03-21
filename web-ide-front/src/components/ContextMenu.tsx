import type { INode } from "@/types/Node"
import { Box } from "@chakra-ui/react"
import { ContextTile } from "./ContextTile";
interface ContextMenuProps {
    top: number,
    left: number,
    node: INode,
    menuItems: {
        id: number;
        action: string;
        name: string;
    }[],
    onClose: () => void
}
export const ContextMenu = ({ top, left, node, onClose, menuItems }: ContextMenuProps) => {



    return (

        <Box position="fixed" top={`${top}px`} left={`${left}px`} zIndex={1000}
            bg="#1f2028" border="1px solid rgba(128,128,128,0.2)" borderRadius="4px"
            minWidth="200px" padding="4px" boxShadow="0 4px 12px rgba(0,0,0,0.4)">
            {menuItems.map(item => (
                <ContextTile key={item.action} node={node} item={item} onClose={onClose}></ContextTile>
            ))}
        </Box>
    )
}



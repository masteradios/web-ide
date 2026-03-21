import { menuData } from "@/constants/Constants"
import type { INode } from "@/types/Node"
import { Box } from "@chakra-ui/react"
import { ContextTile } from "./ContextTile";
interface ContextMenuProps {
    top: number,
    left: number,
    node: INode,
    onClose: () => void
}
export const ContextMenu = ({ top, left, node, onClose }: ContextMenuProps) => {



    return (
        <Box position="fixed" top={`${top}px`} left={`${left}px`} zIndex={1000}
            bg="gray.700" borderRadius="md" padding={2} minWidth="150px">
            {menuData.map(item => (
                <ContextTile key={item.id} node={node} item={item} onClose={onClose}></ContextTile>
            ))}
        </Box>
    )
}



import { FileInfoDialogBox } from "./FileInfoDialogBox";
import type { INode } from "@/types/Node";
import { Dialog, Portal } from "@chakra-ui/react";
import { useRef } from "react";
import { NodeDeleteDialogBox } from "./NodeDeleteDialogBox";
import { NodeRenameDialogBox } from "./NodeRenameDialogBox";

interface ParentDialogBoxProps {
    isOpen: boolean,
    node: INode,
    item: {
        name: string,
        id: number,
        action: string
    },
    dialogBoxName: string | undefined

    onClose: () => void
}
export const ParentDialogBox = ({ isOpen, onClose, node, item, dialogBoxName }: ParentDialogBoxProps) => {
    const ref = useRef<HTMLInputElement | null>(null);

    return (
        <Dialog.Root placement={"center"} open={isOpen} onOpenChange={(e) => !e.open && onClose()} initialFocusEl={() => ref.current}>
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    {dialogBoxName && (
    dialogBoxName === "ADD" ? <FileInfoDialogBox ref={ref} node={node} item={item} onClose={onClose} /> :
    dialogBoxName === "DELETE" ? <NodeDeleteDialogBox node={node} onClose={onClose}/> :
    dialogBoxName === "RENAME" ? <NodeRenameDialogBox item={item} ref={ref} node={node} onClose={onClose} /> :
    null
)}
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    )
}
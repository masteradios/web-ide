import type { INode } from "@/types/Node";
import { Dialog, Button, CloseButton, Box } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { removeNode } from "../slices/nodeListSlice";
interface NodeDeleteDialogBoxProps {
    node: INode,
    onClose :()=>void
}
export function NodeDeleteDialogBox({ node,onClose }: NodeDeleteDialogBoxProps) {
    const dispatch = useDispatch();
    const onSubmit = () => {
        dispatch(removeNode(node));
onClose();

    }
    return (<>

        <Dialog.Content onClick={(e) => e.stopPropagation()}>
            <Dialog.Header>
                <Dialog.Title>Are you sure?</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
                <p>
                    {node.isFile ? "This action cannot be undone. Permanently delete this file ?" : "This action cannot be undone. Permanently delete this folder and its content ?"}
                </p>

                <Box marginTop={3}
                    padding={2}
                    borderRadius="md"
                    bg="rgba(255,255,255,0.05)"
                    border="1px solid rgba(255,255,255,0.1)"
                    fontSize="xs"
                    color="rgba(255,255,255,0.5)"
                    fontFamily="mono">{node.uri}</Box>

            </Dialog.Body>
            <Dialog.Footer>
                <Dialog.ActionTrigger asChild>
                    <Button variant="outline">Cancel</Button>
                </Dialog.ActionTrigger>
                <Button onClick={onSubmit} colorPalette="red">Delete</Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
            </Dialog.CloseTrigger>
        </Dialog.Content>

    </>);

}
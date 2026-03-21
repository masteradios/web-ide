"use client"
import { setActiveNode } from "@/slices/currentActiveNodeSlice";
import { addNode, toggleExpanded } from "@/slices/nodeListSlice";
import { useDispatch, useSelector } from "react-redux";

import type { INode } from "@/types/Node"
import { Button, Dialog, Field, Input, Portal, Stack } from "@chakra-ui/react"
import { useRef, useState } from "react"
import type { RootState } from "@/store/store";

// FileInfoDialogBox.tsx
interface FileInfoDialogBoxProps {
    isOpen: boolean,
    node: INode,
    item: {
        name: string,
        id: number
    }
    onClose: () => void
}

export const FileInfoDialogBox = ({ isOpen, onClose, node, item }: FileInfoDialogBoxProps) => {
    const ref = useRef<HTMLInputElement | null>(null);
    const [fileName, setFileName] = useState<string>("");
    const dispatch = useDispatch();
    const nodeList = useSelector((state: RootState) => state.nodeSlice.nodeList)

  const handleKeyDown = (event: { key: string; }) => {
    if (event.key === 'Enter') {
      console.log('do validate');
      onSubmit();
      onClose();
    }
  }

    const onSubmit = () => {
        switch (item.id) {

            case 1:
                console.log("Add a file");
                const newNode: INode = {
                    name: fileName,
                    isFile: true,
                    uri: node.uri + "/" + fileName,
                    isExpanded: false,
                    isSelected: false,
                    parent: node.uri
                }
                //

                dispatch(addNode(newNode));
                dispatch(setActiveNode(newNode));
                
        var nodeParent = newNode.parent; // /root/src/components/NavBar.tsx


    while (nodeParent && nodeParent !== "/") {
        const parentNode = nodeList.find(n => n.uri === nodeParent)
        if (parentNode) {
            if (!parentNode.isExpanded) {
                dispatch(toggleExpanded(parentNode))
            }
            nodeParent = parentNode.parent
        } else {
            break
        }
    }
                break;
            case 2:
                console.log("Add a folder");
                break;
            case 3:
                console.log("Remove a file");

        }
    }


    return (
        <Dialog.Root placement={"center"} open={isOpen} onOpenChange={(e) => !e.open && onClose()} initialFocusEl={() => ref.current}>
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>

                    <Dialog.Content onClick={(e) => e.stopPropagation()}>
                        <Dialog.Header>
                            <Dialog.Title>File Information</Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body pb="4">
                            <Stack gap="4">
                                <Field.Root>
                                    <Field.Label>File Name</Field.Label>
                                    <Input onKeyDown={handleKeyDown}  ref={ref} value={fileName}
                                        onChange={(e) => {
                                            setFileName(e.currentTarget.value.replaceAll(" ", "_"))
                                        }} placeholder="Enter File Name" />
                                </Field.Root>

                                <Field.Root>
                                    <Field.Label>File Location</Field.Label>
                                    <Input readOnly={true} placeholder={node.uri + "/" + fileName} />
                                </Field.Root>
                            </Stack>
                        </Dialog.Body>
                        <Dialog.Footer>
                            <Dialog.ActionTrigger asChild>
                                <Button variant="outline">Cancel</Button>
                            </Dialog.ActionTrigger>
                            <Dialog.ActionTrigger asChild>
                                <Button onClick={onSubmit} variant="outline">Save</Button>
                            </Dialog.ActionTrigger>

                        </Dialog.Footer>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    )
}
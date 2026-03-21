"use client"
import { setActiveNode } from "@/slices/currentActiveNodeSlice";
import { addNode, toggleExpanded } from "@/slices/nodeListSlice";
import { useDispatch, useSelector } from "react-redux";

import type { INode } from "@/types/Node"
import { Button, Dialog, Field, Input, Stack, Text } from "@chakra-ui/react"
import { useState } from "react"
import type { RootState } from "@/store/store";


interface FileInfoDialogBoxProps {
    node: INode,
    item: {
        name: string,
        id: number,
        action: string
    }
    onClose: () => void
    ref: React.Ref<HTMLInputElement> | undefined
}




export const FileInfoDialogBox = ({ onClose, node, item, ref }: FileInfoDialogBoxProps) => {
    const [fileName, setFileName] = useState<string>("");
    const dispatch = useDispatch();
    const nodeList = useSelector((state: RootState) => state.nodeSlice.nodeList)
    const [errorMessage, setErrorMessage] = useState<string>("");

    var newNode: INode | undefined;

    const handleKeyDown = (event: { key: string; }) => {
        if (event.key === 'Enter') {
            onSubmit();

        }
    }

    const onSubmit = () => {

        if (fileName == "" || null == fileName) {
            setErrorMessage("Name can't be empty");
        }
        else if (fileName.includes("/")) {
            setErrorMessage("Invalid Name")
        }
            else if (/[<>:"/\\|?*\x00-\x1f`~!@#$%^&()+=\[\]{};',]/.test(fileName)) {

            setErrorMessage("Invalid characters in name")
        }
        else if (nodeList.find((n) => n.uri == node.uri + "/" + fileName)) {
            setErrorMessage("File already Exists !")

        }

        else {

            console.log(item.action);
            newNode = {
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
            onClose();



        }

    }

    return (


        <Dialog.Content onClick={(e) => e.stopPropagation()}>
            <Dialog.Header>
                <Dialog.Title>{item.action == 'ADD_FILE' ? "File Information" : "Folder Information"}</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body pb="4">
                <Stack gap="4">
                    <Field.Root>
                        <Field.Label>{item.action == 'ADD_FILE' ? "File Name" : "Folder Name"}</Field.Label>
                        <Input ref={ref} onKeyDown={handleKeyDown} value={fileName}
                            onChange={(e) => {
                                if (e.currentTarget.value.includes("/")) {
                                    setErrorMessage("Invalid Name");
                                } else if (
                                    nodeList.find((n) => n.uri == node.uri.substring(0, node.uri.lastIndexOf("/")) + "/" + e.currentTarget.value)
                                ) {
                                    setErrorMessage("FIle already Exists !")
                                }

                                else { setErrorMessage("") }
                                setFileName(e.currentTarget.value.replaceAll(" ", "_").replaceAll(/[`~!@#$%^&*()_|+\-=?;:'",<>\{\}\[\]\\\/]/gi, "_"))
                            }}
                            placeholder="Enter Name" />

                    </Field.Root>

                    {errorMessage && <Text color={"red.400"}>

                        {errorMessage}
                    </Text>}




                    <Field.Root>
                        <Field.Label>Location</Field.Label>
                        <Input readOnly={true} placeholder={node.uri + "/" + fileName} />
                    </Field.Root>
                </Stack>
            </Dialog.Body>
            <Dialog.Footer>

                <Button onClick={() => onClose()} variant="outline">Cancel</Button>

                <Button onClick={onSubmit} variant="outline">Save</Button>

            </Dialog.Footer>
        </Dialog.Content>
    )
}
import { renameNode } from "@/slices/nodeListSlice"
import type { RootState } from "@/store/store"
import type { INode } from "@/types/Node"
import { Dialog, Stack, Field, Input, Button, Text } from "@chakra-ui/react"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"

interface NodeRenameDialogBoxProps {
    node: INode,
    item: {
        name: string,
        id: number,
        action: string
    }
    onClose: () => void
    ref: React.Ref<HTMLInputElement> | undefined
}
export const NodeRenameDialogBox = ({ node, item, onClose, ref }: NodeRenameDialogBoxProps) => {
    const [fileName, setFileName] = useState<string>("");
    const dispatch = useDispatch();
    const nodeList = useSelector((state: RootState) => state.nodeSlice.nodeList)
    const [errorMessage, setErrorMessage] = useState<string>("");


    const handleKeyDown = (event: { key: string; }) => {
        if (event.key === 'Enter') {
            onSubmit();

        }
    }

    const onSubmit = () => {

        if (fileName == "" || null == fileName) {
            setErrorMessage("Name can't be empty");
        }
        else if (/[<>:"/\\|?*\x00-\x1f`~!@#$%^&()+=\[\]{};',]/.test(fileName)) {

            setErrorMessage("Invalid characters in name")
        }
        else if (nodeList.find((n) => n.uri == node.uri.substring(0, node.uri.lastIndexOf("/")) + "/" + fileName)) {
            setErrorMessage("File already Exists !")

        }

        else {

            console.log(item.action);
            //

            dispatch(renameNode({ oldNode: node, newName: fileName }));

            onClose();



        }

    }

    return (
        <>
            <Dialog.Content onClick={(e) => e.stopPropagation()} bg="#1f2028" border="1px solid rgba(255,255,255,0.1)" borderRadius="8px">
                <Dialog.Header borderBottom="1px solid rgba(255,255,255,0.08)" pb={3}>
                    <Dialog.Title fontSize="sm" fontWeight="500" color="rgba(255,255,255,0.9)">
                        {item.action == 'RENAME_FILE' ? "Rename File" : "Rename Folder"}
                    </Dialog.Title>
                </Dialog.Header>
                <Dialog.Body pb="4" pt={4}>
                    <Stack gap="4">
                        <Field.Root>
                            <Field.Label fontSize="xs" color="rgba(255,255,255,0.5)" textTransform="uppercase" letterSpacing="wider">
                                {item.action == 'RENAME_FILE' ? "New File Name" : "New Folder Name"}
                            </Field.Label>
                            <Input
                                ref={ref}
                                onKeyDown={handleKeyDown}
                                value={fileName}
                                onChange={(e) => {
                                    if (e.currentTarget.value.includes("/")) {
                                        setErrorMessage("Invalid Name");
                                    } else if (
                                        nodeList.find((n) => n.uri == node.uri.substring(0, node.uri.lastIndexOf("/")) + "/" + e.currentTarget.value)
                                    ) {
                                        setErrorMessage("FIle already Exists !")
                                    }
                        
                                    else { setErrorMessage("") }
                                    setFileName(e.currentTarget.value.replaceAll(" ", "_").replaceAll(/[`~!@#$%^&*()_|+\-=?;:'",<>\{\}\[\]\\\/]/gi,"_"))
                                }}
                                placeholder={node.name}
                                bg="rgba(255,255,255,0.05)"
                                border="1px solid rgba(255,255,255,0.15)"
                                color="white"
                                fontSize="sm"
                                _focus={{ border: "1px solid #094771", boxShadow: "none" }}
                                _placeholder={{ color: "rgba(255,255,255,0.25)" }}
                            />
                        </Field.Root>
                        {errorMessage && (
                            <Text color="red.400" fontSize="xs">
                                {errorMessage}
                            </Text>
                        )}
                    </Stack>
                </Dialog.Body>
                <Dialog.Footer borderTop="1px solid rgba(255,255,255,0.08)" pt={3} gap={2}>
                    <Button onClick={() => onClose()} variant="outline" size="sm"
                        border="1px solid rgba(255,255,255,0.15)" color="rgba(255,255,255,0.7)"
                        _hover={{ bg: "rgba(255,255,255,0.05)" }}>
                        Cancel
                    </Button>
                    <Button onClick={onSubmit} size="sm"
                        bg="#094771" color="white"
                        _hover={{ bg: "#0a5a8a" }}>
                        Rename
                    </Button>

                </Dialog.Footer>
            </Dialog.Content>
        </>
    )

}
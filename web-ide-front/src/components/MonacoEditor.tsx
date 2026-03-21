import type { INode } from "@/types/Node";
import { Editor } from "@monaco-editor/react";
interface MonacoEditorProps {

    handleEditorMount: (editor: any) => void,
    file?: INode

}
export default function MonacoEditor({ handleEditorMount, file }: MonacoEditorProps) {
    // return (<>

    //     <Editor

    //         height="100%"
    //         width={"100%"}
    //         language="javascript"

    //         theme="myTheme"
    //         defaultValue='//Start Typing...'
    //         options={{
    //             scrollbar: {

    //                 horizontal: 'auto',

    //             },
    //             overviewRulerBorder: false,
    //             overviewRulerLanes: 0,
    //             quickSuggestions: true,

    //             suggestOnTriggerCharacters: true,
    //             acceptSuggestionOnEnter: "on",
    //             tabCompletion: "on",
    //             wordBasedSuggestions: "allDocuments",
    //         }}
    //     />

    // </>)

    const index = file!.name.lastIndexOf(".");
    const extension = file!.name.substring(index);
    var language: string;
    switch (extension) {

        case "jsx":
            language = "javascript"
            break;
        case "tsx":
            language = "typescript"
            break;
        case ".html":
            language = "html"
            break;
        default:
            language = "javascript"
    }

    return (
        <>

            <Editor
                onMount={handleEditorMount}

                height="100%"
                width="100%"
                theme="myTheme"
                path={file!.uri}
                defaultLanguage={language}
                defaultValue={""}
                options={{

                    overviewRulerBorder: false,
                    overviewRulerLanes: 0,
                    quickSuggestions: true,

                    suggestOnTriggerCharacters: true,
                    acceptSuggestionOnEnter: "on",
                    tabCompletion: "on",
                    wordBasedSuggestions: "allDocuments",
                }}
            />
        </>
    );
};

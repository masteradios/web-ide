import { Editor } from "@monaco-editor/react";
interface MonacoEditorProps {

    handleEditorMount:(editor:any)=>void,
    file :{
        name :string,
        language: string,
        value :string
    }

}
export default function MonacoEditor({handleEditorMount,file}:MonacoEditorProps) {
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




    return (
        <>

            <Editor
                onMount={handleEditorMount}

                height="100%"
                width="100%"
                theme="myTheme"
                path={file.name}
                defaultLanguage={file.language}
                defaultValue={file.value}
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

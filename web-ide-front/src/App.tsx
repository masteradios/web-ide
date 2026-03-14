import './App.css'
import { Box, Grid, GridItem } from '@chakra-ui/react'
import TaskBarItem from './components/TaskBarItem'
import { useEffect, useRef } from 'react'
import SideBar from './components/SideBar';
import SideBarPage from './components/SideBarPage';
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from './store/store';
//import { Provider } from 'react-redux'
import { Provider } from "@/components/ui/provider"
import { setActiveFile } from "./slices/currentActiveFile";
import { loader } from '@monaco-editor/react';
import MonacoEditor from './components/MonacoEditor';


loader.init().then((monaco) => {
  monaco.editor.defineTheme('myTheme', {
    base: 'vs-dark',
    inherit: true,

    rules: [],
    colors: {
      'editor.background': '#16171d',
    },
  });
});
function App() {

  const selectedPage = useSelector((state: RootState) => state.page.selectedPage)
  const fileExplorerBorder = selectedPage === "" ? "" : "1px solid gray"




  const dispatch = useDispatch();
  const files: Record<string, { name: string; language: string; value: string }> = {
  "script.js": {
    name: "script.js",
    language: "javascript",
    value: `console.log("Hello World");`
  },
  "style.css": {
    name: "style.css",
    language: "css",
    value: `body {\n  margin: 0;\n  font-family: sans-serif;\n}`
  },
  "index.html": {
    name: "index.html",
    language: "html",
    value: `<!DOCTYPE html>\n<html>\n  <head>\n    <link rel="stylesheet" href="style.css" />\n  </head>\n  <body>\n    <script src="script.js"></script>\n  </body>\n</html>`
  }
}
  const fileName = useSelector((state: RootState) => state.activeFile.activeFile)
  const file = files[fileName];
  const editorRef = useRef<any>(null);
  const cursorPositions = useRef<Record<string, any>>({});

  const handleEditorMount = (editor: any) => {
    editorRef.current = editor;
  }


  // restore cursor after file switch
  useEffect(() => {
    if (editorRef.current && cursorPositions.current[fileName]) {
      editorRef.current.setPosition(cursorPositions.current[fileName]);
      editorRef.current.focus();
    }
  }, [fileName]);
  const switchFile = (newFileName: string) => {
    // save current cursor before switching
    if (editorRef.current) {
      cursorPositions.current[fileName] = editorRef.current.getPosition();
    }
    dispatch(setActiveFile(newFileName));
  }

  return (
    <Provider >
      <Grid width="full" height="full" templateColumns={selectedPage === "" ? "60px 0px 1fr" : "60px 300px 1fr"}>
        <GridItem height="full" backgroundColor="gray.emphasized" >
          <SideBar></SideBar>

        </GridItem>

        <GridItem borderRight={fileExplorerBorder} borderTop="1px solid rgba(128,128,128,0.4)" height="full" overflow="hidden">
          {selectedPage === "" ? <></> : <SideBarPage pageName={selectedPage}></SideBarPage>}
        </GridItem>


        <GridItem height="full" display="flex" flexDirection="column" minWidth="0" overflow="hidden">
          <Box width="100%" display="flex" overflowX="auto" whiteSpace="nowrap" borderY="1px solid rgba(128,128,128,0.4)">
            {
            
            
            Object.entries(files).map(([key]) => (
              <Box minWidth="120px" cursor="pointer" key={key} onClick={() => switchFile(key)}>
                <TaskBarItem itemName={key} isActive={fileName === key} />
              </Box>
            ))}
          </Box>
          <Box flex="1" overflow="hidden">
            <MonacoEditor handleEditorMount={handleEditorMount } file= {file} ></MonacoEditor>
          </Box>
        </GridItem>
      </Grid>
    </Provider>

  )
}

export default App

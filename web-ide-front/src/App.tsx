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
import { setActiveNode } from "./slices/currentActiveFileSlice";
import { loader } from '@monaco-editor/react';
import MonacoEditor from './components/MonacoEditor';
import { dummyNodes } from './constants/Constants';
import type { INode } from './types/Node';


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


const activeNode = useSelector((state: RootState) => state.activeFile.activeNode)

  const nodeList = useSelector((state: RootState) => state.nodeSlice.nodeList)
  const file =activeNode&&   activeNode.isFile ? nodeList.find((node) => node.uri === activeNode.uri) : undefined;
  const editorRef = useRef<any>(null);
  const cursorPositions = useRef<Record<string, any>>({});

  const handleEditorMount = (editor: any) => {
    editorRef.current = editor;
  }


  // restore cursor after file switch
  useEffect(() => {
    if (editorRef.current && cursorPositions.current[activeNode.name]) {
      editorRef.current.setPosition(cursorPositions.current[activeNode.name]);
      editorRef.current.focus();
    }
  }, [activeNode]);

  const switchNode = (newNode: INode) => {
    // save current cursor before switching
    if (editorRef.current) {
      cursorPositions.current[activeNode.name] = editorRef.current.getPosition();
    }

    dispatch(setActiveNode(newNode));
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
            {dummyNodes.map((node) =>
              node.isFile ? (
                <Box minWidth="120px" cursor="pointer" key={node.uri} onClick={() => switchNode(node)}>
                  <TaskBarItem itemName={node.name} isActive={activeNode.name === node.name} />
                </Box>
              ) : null
            )}
          </Box>

          <Box flex="1" overflow="hidden">
            {file && <MonacoEditor handleEditorMount={handleEditorMount} file={file} ></MonacoEditor>}
          </Box>
        </GridItem>
      </Grid>
    </Provider >

  )
}

export default App

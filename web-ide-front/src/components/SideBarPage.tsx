
interface SideBarPageProps {

  pageName: string
}

import PerfectScrollbar from 'react-perfect-scrollbar'
import 'react-perfect-scrollbar/dist/css/styles.css'
import FileExplorer from "./FileExplorer";
import { Text } from '@chakra-ui/react';

export default function SideBarPage({ pageName }: SideBarPageProps) {
  return (
    <PerfectScrollbar style={{ height: '100%', width:'full'}}>
      {pageName === "File Explorer" ? <FileExplorer /> : <Text>Search</Text>}
    </PerfectScrollbar>
  )
}
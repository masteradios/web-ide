import { Text } from "@chakra-ui/react";

interface SideBarPageProps{

    pageName:string
}

import PerfectScrollbar from 'react-perfect-scrollbar'
import 'react-perfect-scrollbar/dist/css/styles.css'

export default function SideBarPage({ pageName }: SideBarPageProps) {
  return (
    <PerfectScrollbar style={{ height: '100%' }}>
      <Text>{pageName}</Text>
    </PerfectScrollbar>
  )
}
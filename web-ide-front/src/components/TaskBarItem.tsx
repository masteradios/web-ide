import { Box,Text } from "@chakra-ui/react";



interface TaskBarItemProps{
itemName :string,
isActive:boolean
}
export default function TaskBarItem ({itemName,isActive}:TaskBarItemProps){
    const borderStyle = "1px solid rgba(128,128,128,0.4)"
    return (<>
    <Box  padding={3} borderTop= {isActive? "1px solid blue" : borderStyle}
    borderX={borderStyle}
    >
   
        <Text width="fit-content" color="white" opacity={isActive?"1":"0.5"}>{itemName}</Text>
    </Box>
    
    </>);
};
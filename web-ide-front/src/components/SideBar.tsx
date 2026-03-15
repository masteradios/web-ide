import { Grid, GridItem, Icon } from "@chakra-ui/react";
import { VscFiles, VscSearch } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedPage } from "../slices/sideBarPageSlice";
import type { RootState } from "@/store/store";
import { pages } from "../constants/Constants.ts";
const iconMap: Record<string, React.ReactNode> = {
    "File Explorer": <VscFiles />,
    "Search": <VscSearch />
}



export default function SideBar() {
    const dispatch = useDispatch();
    const selectedPage = useSelector((state: RootState) => state.page.selectedPage)
    
    const onClick = (page: string) => {
        selectedPage === page ? dispatch(setSelectedPage("")) :
            dispatch(setSelectedPage(page))
    }

    return (<>

        <Grid gap={8} padding={3}>
            {pages.map((page) => (<>

                <GridItem key={page} cursor={"pointer"} onClick={() => {
                    onClick(page)
                }}>
                    <Icon color={selectedPage===page?"white":"gray.400"} size="lg" _hover={{ color: "white" }}> {iconMap[page]}</Icon>
                </GridItem>
            </>))}
        </Grid>


    </>);


};
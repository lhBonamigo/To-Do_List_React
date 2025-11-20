import { Flex, Heading, Icon } from "@chakra-ui/react";
import { FiMoreHorizontal } from "react-icons/fi";

// const BiExit = () => {
//     localStorage.removeItem('token');
//     window.location.href = '/Login';
//     window.location.reload();
// }

export const Header = () => {
    return (
        <>
            <Flex w={{ base: '100vw' }} alignItems={'center'} justifyContent={"space-between"} p={'10px'} bgColor={'#343E48'}>
                <Heading size={"4xl"}>To-Do List</Heading>
                <Icon ><FiMoreHorizontal/></Icon>
            </Flex>
        </>
    );
}

export default Header;
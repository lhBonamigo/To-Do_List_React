import { Button, Heading } from "@chakra-ui/react";

const BiExit = () => {
 localStorage.removeItem('token');
 window.location.href = '/Login';
 window.location.reload();
}

export const Header = () => {
    return (
        <>
            <Heading size={"4xl"}>Minha lista de tarefas</Heading>
            <Button onClick={BiExit}>Sair</Button>
        </>
    );
}

export default Header;
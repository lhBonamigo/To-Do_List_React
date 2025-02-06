import React, { useState, useContext, useEffect } from 'react';
import { Box, Input, Button, Heading, Text } from '@chakra-ui/react';
import { Field } from "../../components/ui/field.jsx";
import usePost from '../../Functions/usePost';
import { useNavigate } from 'react-router-dom';

const Cadastro = () => {
    const url = 'https://api-todo-ckia.onrender.com/CreateUser'
    const Navigate = useNavigate();
    const [pass, setPass] = useState('');
    const [usuario, setUsuario] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [errorMessage, setErrorMessage]=useState('');
    const { httpConfigPost, error , dataPost} = usePost(url);

    const createUser = (e) => {
        e.preventDefault();
        if (!usuario || !pass || !confirmPass) {
           setErrorMessage("Por favor, preencha todos os campos.");
            return;
        };

        if (pass != confirmPass) {
            setErrorMessage("As Senhas precisam ser iguais.");
            return;
        };
        const user = {
            usuario,
            pass,
        };

        httpConfigPost(user, "POST");
    };

    useEffect(()=>{
        if (error) {
            console.log(error)
            alert("Usuário Inválido ou em uso")
            setUsuario('');
        } 
    },[error])

    if(dataPost) {
        setErrorMessage("Usuário criado Faça login para continuar")
        Navigate('/');
    }

    return (
        <>
            {errorMessage ? (<Text background={'red'} textAlign={'center'} position={'sticky'}>{errorMessage}</Text>):(null)}
            <Heading size={'3xl'} textAlign={'Center'} mt={'1em'}>
                Criar Conta
            </Heading>
            <Box p={'1em'} w={'500px'} m={'auto'} mt={'1em'}>
                <form onSubmit={createUser}>
                    <Field label="Usuário:">
                        <Input type={"text"}
                            value={usuario}
                            onChange={(e) => { setUsuario(e.target.value) }}
                        />
                    </Field>
                    <Field label="Senha:">
                        <Input type={"password"}
                            value={pass}
                            onChange={(e) => { setPass(e.target.value) }}
                        />
                    </Field>
                    <Field label="Confirme a Senha:">
                        <Input
                            type={"password"}
                            value={confirmPass}
                            onChange={(e) => { setConfirmPass(e.target.value) }}
                        />
                    </Field>
                    <Button type='submit' mt={'1em'}>
                        Criar Conta
                    </Button>
                    <Button mt={'1em'} ml={'.3em'} variant={'outline'} onClick={()=> Navigate('/Login')}>
                        Fazer Login
                    </Button>
                </form>
            </Box>
        </>
    )
}

export default Cadastro

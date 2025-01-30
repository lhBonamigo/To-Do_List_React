import React, { useState, useContext, useEffect } from 'react';
import { Box, Input, Button, Heading } from '@chakra-ui/react';
import { Field } from "../../components/ui/field.jsx";
import usePost from '../../Functions/usePost';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../Functions/UserContext.jsx';

const Cadastro = () => {
    const url = 'http://localhost:5000/CreateUser'
    const [pass, setPass] = useState('');
    const [usuario, setUsuario] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const { httpConfigPost, error , dataPost} = usePost(url);
    const Navigate = useNavigate();

    const createUser = (e) => {
        e.preventDefault();
        if (!usuario || !pass || !confirmPass) {
            alert("Por favor, preencha todos os campos.");
            return;
        };

        if (pass != confirmPass) {
            alert("As Senhas precisam ser iguais.");
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
        alert("Usuário criado Faça login para continuar")
        Navigate('/');
    }

    return (
        <>
            <Heading size={'3xl'} textAlign={'Center'} mt={'1em'}>
                Criar Conta
            </Heading>
            <Box border={'1px solid black'} p={'1em'} borderRadius={'2xl'} w={'90vw'} m={'auto'} mt={'1em'}>
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
                    <Button mt={'1em'} ml={'.3em'} variant={'outline'}>
                        Fazer Login
                    </Button>
                </form>
            </Box>
        </>
    )
}

export default Cadastro

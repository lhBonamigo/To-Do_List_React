import { useState, useEffect, FormEvent } from 'react';
import { Button, Container, Flex, Heading, Text, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import LoginInput from '../../components/LoginInput/LoginInput'
import useFetch from '../../hooks/useFetch';
import { Toaster, toaster } from "../../components/ui/toaster";

const Cadastro = () => {
    const url = 'https://api-todo-ckia.onrender.com/user/register'
    const Navigate = useNavigate();
    const [pass, setPass] = useState('');
    const [usuario, setUsuario] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const { httpConfig, error, data, loading } = useFetch(url);

    const createUser = (e: FormEvent<HTMLDivElement>) => {

        e.preventDefault();
        if (!usuario || !pass || !confirmPass) {
            toaster.create({
                title: "Campos obrigatórios",
                description: "Por favor, preencha todos os campos.",
                type: "warning",
                duration: 3000,
            });
            return
        }
        if (pass.length < 6) {
            toaster.create({
                title: "Senha inválida",
                description: "A senha precisa ter no mínimo 6 caracteres",
                type: "warning",
                duration: 3000,
            });
        }
        if (pass !== confirmPass) {
            toaster.create({
                title: "Senha inválida",
                description: "As senhas precisam ser iguais",
                type: "warning",
                duration: 3000,
            });
        };

        const user = {
            usuario,
            pass,
        };
        httpConfig("POST", user);
    };

    useEffect(() => {
        if (error) {
            alert("Usuário Inválido ou em uso")
            setUsuario('');
        }
    }, [error])

    useEffect(() => {
        if (data) {
            setErrorMessage("Usuário criado Faça login para continuar")
            Navigate('/');
        }
    })

    return (
        <>
            {errorMessage ? (<Text background={'red'} textAlign={'center'} position={'sticky'}>{errorMessage}</Text>) : (null)}
            <Flex
                minH="100vh"
                align="center"
                justify="center"
                bg="#1F2630"
            >
                <Container maxW="md" color={"#B5BDC8"} p={8} bg="#343E48" borderRadius="lg" boxShadow="lg">
                    <Heading size={'3xl'} textAlign={'Center'} mt={'1em'}>
                        Criar Conta
                    </Heading>
                    <VStack as='form' onSubmit={(e: FormEvent<HTMLDivElement>) => { createUser(e) }}>
                        <LoginInput
                            labelInput={"Cadastro:"}
                            type='text'
                            width={'80%'}
                            value={usuario}
                            onChange={setUsuario}
                        />
                        <LoginInput
                            labelInput={"Senha:"}
                            value={pass}
                            width={'80%'}
                            type={'password'}
                            onChange={setPass}
                        />
                        <LoginInput 
                            labelInput={"confirme a senha:"} 
                            width={'80%'}
                            type={'password'} 
                            value={confirmPass} 
                            onChange={setConfirmPass} 
                        />
                        <Flex 
                            justify={'space-between'} 
                            mt={'1em'}
                            w={'100%'}
                        >
                            <Button    
                                mr={'.3em'}
                                variant={'outline'}
                                onClick={() => Navigate('/Login')}
                            >
                                Fazer Login
                            </Button>
                            <Button
                                type='submit'
                                loading={loading}
                            >
                                Criar Conta
                            </Button>
                        </Flex>
                    </VStack>
                    <Toaster />
                </Container>
            </Flex>
        </>
    )
}

export default Cadastro

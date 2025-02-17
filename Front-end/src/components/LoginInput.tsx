import React from 'react'
import { Field } from './ui/field';
import { Input } from '@chakra-ui/react';

interface propFunc{
    labelInput: string, 
    value: string, 
    onChange: (e: string) => void, 
    type: string
}

const LoginInput = ({labelInput, value, onChange, type}: propFunc) => {
    return (
        <>
            <Field label={labelInput}>
                <Input 
                    type={type}
                    value={value}
                    onChange={(e) => {onChange(e.target.value) }}
                />
            </Field>
        </>
    )
}

export default LoginInput

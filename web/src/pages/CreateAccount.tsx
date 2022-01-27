/**
 * @author  Sowa Takayanagi
 * @since   1/27/2022 6:42 AM
 * @version 1.0.0
 */
import {ChangeEvent, FC, FormEvent, useEffect, useState} from "react";
import {FormButton, FormContainer, FormTextField} from "../components/FormStyles";
import {Box, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {AuthenticationService} from "../service/api/authenticationService";
import {URLSearchParams} from "url";
import {useLocation} from "react-router";

type CreateAccountProps = {
    username: string
}

export const CreateAccount: FC = () => {
    const [username, setUsername] = useState('')
    const [loginUri, setLoginUri] = useState<URL | null>(null)
    const [error, setError] = useState<Error | null>(null)

    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {

    })

    const handleSubmit = (ev: FormEvent<HTMLFormElement>) => {
        ev.preventDefault()
        if (loginUri === null) {
            return
        }

        loginUri?.searchParams.set("username", username)
        navigate(loginUri.toString())
        const postData: CreateAccountProps = {
            username: username
        }
        AuthenticationService.createUser(postData)
            .then(data => {

            }).catch(err => {

        })

    }

    const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
        setUsername(ev.currentTarget.value)
    }


    return (
        <FormContainer>
            <Typography component={'h2'} sx={{marginBottom: '24px'}}>
                Welcome to flema!
            </Typography>
            <form onSubmit={handleSubmit}>

                <Box sx={{marginBottom: '24px'}}>
                    <FormTextField
                        label={'username'}
                        type={'text'}
                        variant={'outlined'}
                        value={username}
                        onChange={handleChange}
                        autoFocus
                    >

                    </FormTextField>
                </Box>

                <Box>
                    <FormButton
                        sx={{marginTop: '24px'}}
                        type={'submit'}
                        variant={'contained'}
                        color={'success'}
                    >
                        Create account
                    </FormButton>

                </Box>

            </form>
        </FormContainer>
    )
}
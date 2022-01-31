/**
 * @author  Sowa Takayanagi
 * @since   12/28/2021 3:17 AM
 * @version 1.0.0
 */
import {ChangeEvent, FC, FormEvent, useEffect, useState} from "react"
import {Email} from "../service/api/types"
import * as yup from "yup"
import {Alert, Box, Typography} from "@mui/material"
import {Link, useNavigate} from "react-router-dom"
import {FormButton, FormContainer, FormTextField} from "../components/FormStyles"
import {AuthenticationService} from "../service/api/authenticationService"
import {AppLogo} from "../components/Logo";

import logo from '../images/icons/flema-logo-svg-25100.svg'
//import {FailureSnackbar, SuccessSnackbar} from "../../components/SnackBars";
import {Progress} from "../components/Progress";
import {validateEmail} from "../utils/inputValidators";
import {fetchSignUp} from "../store/ducks/user/actionCreators";
import {useDispatch} from "react-redux";

const RegistrationFormSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Please enter a valid email"),
})

export type RegistrationProps = {
    username: string
    email: string
    password: string
}

export const Registration: FC = () => {
    const dispatch = useDispatch()
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [invalidEmailError, setInvalidEmailError] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [failure, setFailure] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        setUsername('')
        setEmail('')
        setPassword('')
        setPassword2('')
    }, [username, email, password, password2])

    const handleSubmit = (ev: FormEvent<HTMLFormElement>): void => {
        ev.preventDefault()

        const emailValidationError = validateEmail(email)
        if (emailValidationError) {
            setInvalidEmailError(true)
            return
        }

        const postData: RegistrationProps = {username: username, email: email, password}
        dispatch(fetchSignUp(postData))
    }

    return (
        <>
            {isLoading ? <Progress/> : null}
            {success ? <Alert severity={'success'}>Activation code is sent to your email</Alert> : null}
            {failure ? <Alert severity={'error'}>Failed to send verification code</Alert> : null}
            <FormContainer sx={{paddingTop: '24px', paddingBottom: '12px'}}>
                <form onSubmit={handleSubmit}>
                    <Box component={'div'} sx={{marginBottom: '12px'}}>
                        <Link to={'/'}>
                            <AppLogo src={logo} alt={''}/>
                        </Link>
                    </Box>
                    <Typography variant={'h4'} component={'div'} sx={{marginBottom: '24px'}}>
                        Sign up to continue
                    </Typography>
                    <Typography variant={'h6'} sx={{marginBottom: '24px', fontSize: '14px'}}>
                        Please enter your registration info here and receive account verification code.
                    </Typography>
                    <Box sx={{marginBottom: '24px'}}>
                        <FormTextField
                            name='username'
                            label='Username'
                            type='text'
                            variant='outlined'
                            autoFocus
                            onChange={(event: ChangeEvent<HTMLInputElement>) => setUsername(event.target.value)}
                            value={email}
                        />
                    </Box>
                    <br/>
                    <Box sx={{marginBottom: '24px'}}>
                        <FormTextField
                            name='email'
                            label='Email'
                            type='email'
                            variant='outlined'
                            onChange={(event: ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)}
                            value={email}
                        />
                    </Box>
                    <br/>
                    {invalidEmailError ? <Alert severity={'error'}>Email is invalid</Alert> : null}

                    <Box sx={{marginBottom: '24px'}}>
                        <FormTextField
                            name='password'
                            label='Password'
                            type='password'
                            variant='outlined'
                            onChange={(event: ChangeEvent<HTMLInputElement>) => setPassword(event.currentTarget.value)}
                            value={password}
                        />
                    </Box>
                    <br/>
                    <Box sx={{marginBottom: '24px'}}>
                        <FormTextField
                            name='password2'
                            label='Password (Confirm)'
                            type='password'
                            variant='outlined'
                            onChange={(event: ChangeEvent<HTMLInputElement>) => setPassword2(event.currentTarget.value)}
                            value={password}
                        />
                    </Box>
                    <br/>
                    <FormButton
                        type='submit'
                        variant='contained'
                        color='primary'
                        disabled={!(username && email && password && password2)}
                        onSubmit={handleSubmit}
                    >
                        Sign up
                    </FormButton>

                    <Link to='/account/signin'>
                        <Typography sx={{marginTop: '12px'}}>
                            Already have an account?
                        </Typography>
                    </Link>
                </form>
            </FormContainer>
        </>
    )
}
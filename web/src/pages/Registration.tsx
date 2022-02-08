/**
 * @author  Sowa Takayanagi
 * @since   12/28/2021 3:17 AM
 * @version 1.0.0
 */
import {ChangeEvent, FC, FormEvent, useState} from "react"
import * as yup from "yup"
import {Alert, Box, Typography} from "@mui/material"
import {Link} from "react-router-dom"
import {FormButton, FormContainer, FormTextField} from "../components/FormStyles"
import {AppLogo} from "../components/Logo";

import logo from '../images/icons/flema-logo-svg-25100.svg'
//import {FailureSnackbar, SuccessSnackbar} from "../../components/SnackBars";
import {Progress} from "../components/Progress";
import {validateUsername} from "../utils/inputValidators";
import {signUp} from "../store/ducks/user/thunks";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store/store";

const RegistrationFormSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Please enter a valid email"),
})

export type RegistrationProps = {
    username: string
    email: string
    password: string
    redirectUri: string
}

export const Registration: FC = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const loading = useSelector((state: RootState) => state.user.loading)
    const [success, setSuccess] = useState(false)
    const [failure, setFailure] = useState(false)

    const dispatch = useDispatch()

    const redirectUri = window.location.origin + '/access-callback'

    const handleSubmit = (ev: FormEvent<HTMLFormElement>): void => {
        ev.preventDefault()
        dispatch(signUp({username, email, password, redirectUri}))
    }

    const handleChangeUsername = (ev: ChangeEvent<HTMLInputElement>) => {
        if (ev.currentTarget) {
            setUsername(ev.currentTarget.value)
        }
        if (username !== null) {
            validateUsername(username)
        }
    }

    const handleChangeEmail = (ev: ChangeEvent<HTMLInputElement>) => {
        if (ev.currentTarget) {
            setEmail(ev.currentTarget.value)
        }
    }

    const handleChangePassword = (ev: ChangeEvent<HTMLInputElement>) => {
        if (ev.currentTarget) {
            setPassword(ev.currentTarget.value)
        }
    }
    const handleChangePassword2 = (ev: ChangeEvent<HTMLInputElement>) => {
        if (ev.currentTarget) {
            setPassword2(ev.currentTarget.value)
        }
    }


    return (
        <>
            {loading ? <Progress/> : null}
            {success ? <Alert severity={'success'}>Activation link is sent to your email</Alert> : null}
            {failure ? <Alert severity={'error'}>Failed to send verification code</Alert> : null}

            <FormContainer sx={{paddingTop: '24px', paddingBottom: '12px'}}>
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
                <form onSubmit={handleSubmit}>
                    <Box sx={{marginBottom: '24px'}}>
                        <FormTextField
                            label='Username'
                            variant='outlined'
                            value={username}
                            onChange={handleChangeUsername}
                        />
                    </Box>
                    <br/>
                    <Box sx={{marginBottom: '24px'}}>
                        <FormTextField
                            label='Email'
                            type='email'
                            variant='outlined'
                            value={email}
                            onChange={handleChangeEmail}
                        />
                    </Box>
                    <br/>

                    <Box sx={{marginBottom: '24px'}}>
                        <FormTextField
                            label='Password'
                            type='password'
                            variant='outlined'
                            value={password}
                            onChange={handleChangePassword}
                        />
                    </Box>
                    <br/>
                    <Box sx={{marginBottom: '24px'}}>
                        <FormTextField
                            label='Password (Confirm)'
                            type='password'
                            variant='outlined'
                            value={password2}
                            onChange={handleChangePassword2}
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
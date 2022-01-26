/**
 * @author  Sowa Takayanagi
 * @since   12/27/2021 3:06 AM
 * @version 1.0.0
 */
import {ChangeEvent, ElementType, FC, FormEvent, useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import {Link, useNavigate} from "react-router-dom"
import {AppState} from "../store/rootReducer"
import {NavigateFunction} from "react-router"
import {Alert, Box, Typography} from "@mui/material"
import {styled} from "@mui/material/styles"
import {FormButton, FormContainer, FormTextField} from "../components/FormStyles"
import {AppLogo} from "../components/Logo";

import logo from '../images/icons/flema-logo-svg-25100.svg'
import {validateEmail} from "../utils/inputValidators";
import {AuthData} from "../service/api/types";
import {AuthenticationService} from "../service/api/authenticationService";
import {Progress} from "../components/Progress";
//import {FailureSnackbar, SuccessSnackbar} from "../../components/SnackBars";


export const LoginFormError: ElementType = styled(Typography)`
  padding: 12px 16px;
  borderRadius: 12;
  marginBottom: 12;
  fontSize: 15;
  fontWeight: 400;
  backgroundColor: rgb(255, 210, 218);
`

export type LoginProps = {
    email: string
    navigate: NavigateFunction
}

export const Login: FC = () => {
    const [email, setEmail] = useState('')
    const [invalidEmailError, setInvalidEmailError] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [failure, setFailure] = useState(false)
    const isLoggedIn = useSelector((state: AppState) => state.user.isLoggedIn)
    const user = useSelector((state: AppState) => state.auth.user)


    const dispatch = useDispatch()
    const navigate = useNavigate()

    if ((localStorage.getItem("isLoggedIn")) || isLoggedIn) {
        navigate(`/@${user.username}`)
    }

    const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
        setEmail(ev.currentTarget.value)
    }

    const handleLogin = (ev: FormEvent<HTMLFormElement>) => {
        ev.preventDefault()
        const emailValidationError = validateEmail(email)
        if (emailValidationError) {
            setInvalidEmailError(true)
            return
        } else {
            setInvalidEmailError(false)
        }
        setIsLoading(true)
        const loginData: AuthData = {email: email}
        AuthenticationService.sendVerificationCode(loginData)
            .then((response) => {
                if (response.status === '204') {
                    setSuccess(true)
                    setIsLoading(false)
                    console.log("SUCCESS")
                    navigate('/account/verify-email', {state: {email: email}})
                }
            }).catch((error) => {
            console.log(error.response)
            setFailure(true)
            setIsLoading(false)
            console.log("FAILURE")
        })
    }

    return (
        <>
            {isLoading ? <Progress/> : null}
            {success ? <Alert severity={'success'}>Verification code is sent to your email</Alert> : null}
            {failure ? <Alert severity={'error'}>Failed to send verification code</Alert>  : null}

            <FormContainer sx={{paddingTop: '24px', paddingBottom: '12px'}}>
                <Box component={'div'} sx={{marginBottom: '12px'}}>
                    <Link to={'/'}>
                        <AppLogo src={logo} alt={''}/>
                    </Link>
                </Box>
                <Typography variant={'h4'} component={'div'} sx={{marginBottom: '24px'}}>
                    Sign in to flema
                </Typography>


                <Typography variant={'h6'} sx={{marginBottom: '24px', fontSize: '14px'}}>
                    Please enter your email and receive verification code.
                </Typography>

                <form onSubmit={handleLogin}>
                    <Box sx={{marginBottom: '24px'}}>
                        <FormTextField
                            label='Email'
                            type='email'
                            variant='outlined'
                            autoFocus
                            value={email}
                            onChange={handleChange}
                        />
                    </Box>

                    {invalidEmailError ? <Alert severity={'error'}>Email is invalid</Alert> : null}

                    <Box sx={{paddingBottom: '24px'}}>
                        <FormButton
                            sx={{paddingTop: '12px'}}
                            type='submit'
                            variant='contained'
                            color='primary'
                            disabled={!email}
                        >
                            Send verification code
                        </FormButton>
                    </Box>

                    <Link to='/account/signup'>
                        <Typography sx={{paddingTop: '12px'}}>
                            Don't have an account?
                        </Typography>
                    </Link>
                </form>
            </FormContainer>
        </>
    )
}
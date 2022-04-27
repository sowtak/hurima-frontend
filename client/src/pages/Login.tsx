/**
 * @author  Sowa Takayanagi
 * @since   12/27/2021 3:06 AM
 * @version 1.0.0
 */
import {ChangeEvent, ElementType, FC, FormEvent, useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import {Link, useNavigate} from "react-router-dom"
import {RootState} from "../store/store"
import {NavigateFunction} from "react-router"
import {Alert, Box, Typography} from "@mui/material"
import {styled} from "@mui/material/styles"
import {FormButton, FormContainer, FormTextField} from "../components/FormStyles"
import {AppLogo} from "../components/Logo";

import logo from '../images/icons/flema-logo-svg-25100.svg'
import {Progress} from "../components/Progress";
import {signIn} from "../store/ducks/user/thunks";


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
    password: string
    navigate: NavigateFunction
}

export const Login: FC = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [invalidEmailError, setInvalidEmailError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [failure, setFailure] = useState(false)
    const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn)
    const user = useSelector((state: RootState) => state.user.user)


    const dispatch = useDispatch()
    const navigate = useNavigate()

    if ((localStorage.getItem("isLoggedIn")) || isLoggedIn) {
        navigate(`/@${user.username}`)
    }

    const handleChangeEmail = (ev: ChangeEvent<HTMLInputElement>) => {
        if (ev.currentTarget) {
            setEmail(ev.currentTarget.value)
        }
    }

    const handleChangePassword = (ev: ChangeEvent<HTMLInputElement>) => {
        if (ev.currentTarget) {
            setPassword(ev.target.value)
        }
    }

    const handleLogin = (ev: FormEvent<HTMLFormElement>) => {
        ev.preventDefault()
        setLoading(true)
        dispatch(signIn({email, password, navigate}))
        setLoading(false)
    }

    return (
        <>
            {loading ? <Progress/> : null}
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

                    <Box sx={{paddingBottom: '12px'}}>
                        <FormButton
                            sx={{paddingTop: '12px'}}
                            type='submit'
                            variant='contained'
                            color='primary'
                            disabled={!email}
                        >
                            Sign in
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
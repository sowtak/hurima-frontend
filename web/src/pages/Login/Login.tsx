/**
 * @author  Sowa Takayanagi
 * @since   12/27/2021 3:06 AM
 * @version 1.0.0
 */
import {ChangeEvent, ElementType, FC, FormEvent, useEffect, useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import {Link, useNavigate} from "react-router-dom"
import {AppState} from "../../store/rootReducer"
import {NavigateFunction, useParams} from "react-router"
import {Box, Button, Container, TextField, Typography} from "@mui/material"
import {styled} from "@mui/material/styles"
import {FormButton, FormContainer, FormTextField} from "../../components/Form/FormStyles"
import {AppLogo} from "../../components/Logo";

import logo from '../../images/icons/flema-logo-svg-25100.svg'


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
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const error = useSelector((state: AppState) => state.auth.error)
  const success = useSelector((state: AppState) => state.auth.success)
  const isLoggedIn = useSelector((state: AppState) => state.user.isLoggedIn)
  const user = useSelector((state: AppState) => state.auth.user)

  const navigate = useNavigate()

  if ((localStorage.getItem("isLoggedIn")) || isLoggedIn) {
    navigate(`/@${user.username}`)
  }

  const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setEmail(ev.currentTarget.value)
  }

  const handleLogin = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault()

  }

  return (
    <FormContainer sx={{paddingTop: '24px', paddingBottom: '12px'}}>
      <div>
        <Link to={'/'}>
          <AppLogo src={logo} alt={''}/>
        </Link>
      </div>
      <Typography variant={'h4'} component={'div'}>
        Sign in to flema
      </Typography>
      {error && <LoginFormError>Email or password is wrong.</LoginFormError>}

      <p>Please enter your email and receive verification code.</p>

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

        <Box sx={{marginBottom: '24px'}}>
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
  )
}
/**
 * @author  Sowa Takayanagi
 * @since   12/28/2021 3:17 AM
 * @version 1.0.0
 */
import {ChangeEvent, FC, FormEvent, useEffect, useState} from "react"
import {AuthData} from "../service/api/types"
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

const RegistrationFormSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Please enter a valid email"),
})

export const Registration: FC = () => {
    const [email, setEmail] = useState<string>('')
    const [invalidEmailError, setInvalidEmailError] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [failure, setFailure] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        setEmail("")
    }, [])

    const onSubmit = (ev: FormEvent<HTMLFormElement>): void => {
        ev.preventDefault()
        const emailValidationError = validateEmail(email)
        if (emailValidationError) {
            setInvalidEmailError(true)
            return
        } else {
            setInvalidEmailError(false)
        }
        setIsLoading(true)

        const registrationData: AuthData = {email: email}
        AuthenticationService.sendVerificationCode(registrationData)
            .then((response) => {
                if (response.status === '204') {
                    setSuccess(true)
                    setIsLoading(false)
                    console.log("SUCCESS")
                    navigate('/account/verify-email', {state: registrationData})
                }
            }).catch((error) => {
            console.log(error.response)
            setFailure(true)
            setIsLoading(false)
            console.log("FAILURE")
        }).finally(() => {
            console.log("L")
        })
    }

    return (
        <>
            {isLoading ? <Progress/> : null}
            {success ? <Alert severity={'success'}>Activation code is sent to your email</Alert> : null}
            {failure ? <Alert severity={'error'}>Failed to send verification code</Alert> : null}
            <FormContainer sx={{paddingTop: '24px', paddingBottom: '12px'}}>
                <form onSubmit={onSubmit}>
                    <Box component={'div'} sx={{marginBottom: '12px'}}>
                        <Link to={'/'}>
                            <AppLogo src={logo} alt={''}/>
                        </Link>
                    </Box>
                    <Typography variant={'h4'} component={'div'} sx={{marginBottom: '24px'}}>
                        Sign up with email
                    </Typography>
                    <Typography variant={'h6'} sx={{marginBottom: '24px', fontSize: '14px'}}>
                        Please enter your email here and receive account verification code.
                    </Typography>
                    <Box sx={{marginBottom: '24px'}}>
                        <FormTextField
                            name='email'
                            label='Email'
                            type='email'
                            variant='outlined'
                            autoFocus
                            onChange={(event: ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)}
                            value={email}
                        />
                    </Box>
                    {invalidEmailError ? <Alert severity={'error'}>Email is invalid</Alert> : null}
                    <FormButton
                        type='submit'
                        variant='contained'
                        color='primary'
                        disabled={!(email)}
                        onClick={onSubmit}
                    >
                        Send activation code
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
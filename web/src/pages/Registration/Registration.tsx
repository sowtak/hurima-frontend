/**
 * @author  Sowa Takayanagi
 * @since   12/28/2021 3:17 AM
 * @version 1.0.0
 */
import {ChangeEvent, FC, useEffect, useState} from "react"
import {AuthData} from "../../service/api/types"
import * as yup from "yup"
import {Box, Typography} from "@mui/material"
import {Link} from "react-router-dom"
import {FormButton, FormContainer, FormTextField} from "../../components/Form/FormStyles"
import {AuthenticationService} from "../../service/api/authenticationService"
import {AppLogo} from "../../components/Logo";

import logo from '../../images/icons/flema-logo-svg-25100.svg'

const RegistrationFormSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Please enter a valid email"),
})

export const Registration: FC = () => {
    const [email, setEmail] = useState('')
    const [isLoading, setIsLoading] = useState(false)


    useEffect(() => {
        setEmail("")
    }, [])

    const onSubmit = (data: AuthData): void => {
        setIsLoading(true)
        const registrationData: AuthData = {email: data.email}
        AuthenticationService.sendActivationCode(registrationData)
            .then((response) => {
                setIsLoading(false)

            }).catch((error) => {
            console.log(error.response)
            setIsLoading(false)
        })
    }

    return (
        <FormContainer sx={{paddingTop: '24px', paddingBottom: '12px'}}>
            <div>
                <Link to={'/'}>
                    <AppLogo src={logo} alt={''}/>
                </Link>
            </div>
            <Typography variant={'h4'} component={'div'}>
                Sign up with email
            </Typography>
            <p>Please enter your email here and receive account activation code.</p>
            <Box sx={{paddingBottom: '24px'}}>
                <FormTextField
                    name='email'
                    label='Email'
                    variant='outlined'
                    autoFocus
                    onChange={(event: ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)}
                    value={email}
                />
            </Box>
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
        </FormContainer>
    )
}
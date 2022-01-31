/**
 * @author  Sowa Takayanagi
 * @since   1/29/2022 2:30 AM
 * @version 1.0.0
 */
import {ChangeEvent, FC, FormEvent, useState} from "react";
import {Typography} from "@mui/material";
import {FormTextField} from "../components/FormStyles";
import {validateEmail} from "../utils/inputValidators";
import {AuthenticationService} from "../service/api/authenticationService";
import {Email} from "../service/api/types";
import {useNavigate} from "react-router-dom";

export const ForgotPassword: FC = () => {
    const [email, setEmail] = useState('')
    const [invalidEmailError, setInvalidEmailError] = useState(false)
    const [emailFound, setEmailFound] = useState(false)

    const navigate = useNavigate()

    const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
        const invalidEmailError = validateEmail(email)
        if (email !== null && invalidEmailError) {
            setInvalidEmailError(true)
            return
        } else {
            setInvalidEmailError(false)
        }
        const postData: Email = {email: email}
        AuthenticationService.checkEmailValidity(postData)
            .then(resp => {
                if (resp.data.emailFound) {
                    setEmailFound(true)
                } else {
                    setEmailFound(false)
                }
            }).catch(err => {
            console.log(err)
        })

    }

    const handleSubmit = (ev: FormEvent<HTMLFormElement>) => {
        ev.preventDefault()
        if (!invalidEmailError) {
            const postData: Email = {email: email}
            AuthenticationService.sendPasswordResetCode(postData)
                .then(resp => {
                    if (resp.status === '200') {
                        navigate('/account/enter-password-reset-code')
                    }
                })
        }
    }

    return (
        <>
            <Typography component={'h2'} sx={{marginLeft: '12px', marginTop: '12px', marginBottom: '12px'}}>
                ForgotPassword
            </Typography>

            <FormTextField
                type={'email'}
                label={'Your email'}
                onChange
            >

            </FormTextField>
        </>
    )
}
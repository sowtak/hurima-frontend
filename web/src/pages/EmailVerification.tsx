import {ChangeEvent, FC, FormEvent, useState} from "react"
import {Box, Typography} from "@mui/material"
import {FormButton, FormTextField, InfoWrapper} from "../components/FormStyles"
import {useDispatch} from "react-redux"
import {useNavigate} from "react-router-dom";
import {VerificationData} from "../service/api/types";
import {useLocation} from "react-router";
import {AuthenticationService} from "../service/api/authenticationService";

/**
 * @author  Sowa Takayanagi
 * @since   1/21/2022 1:08 PM
 * @version 1.0.0
 */

export const EmailVerification: FC = () => {
    const [code, setCode] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [failure, setFailure] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location: any = useLocation()

    const email: string = location.state.email
    const username: string = location.state.username

    const handleSubmit = (ev: FormEvent<HTMLFormElement>) => {
        ev.preventDefault()
        setIsLoading(true)

        const postData: VerificationData = {
            email: email,
            verificationCode: code
        }
        AuthenticationService.checkVerificationCode(postData)
            .then((response) => {
                if (response.status == '200') {
                    setSuccess(true)
                    setIsLoading(false)
                    navigate('/', {})
                }
            }).catch(err => {
            console.log(err)

        })
    }

    const handleChange = (ev: ChangeEvent<HTMLFormElement>) => {
        setCode(ev.currentTarget.value)
    }


    return (
        <>
            <Typography component={'div'} sx={{fontSize: '23px', fontWeight: '700px', lineHeight: '36px'}}>
                Input verification code
            </Typography>
            <InfoWrapper>
                <Box sx={{marginBottom: '24px'}}>
                    <FormTextField
                        variant='outlined'
                        label='Verification code'
                        value={code}
                        autoFocus
                        onChange={handleChange}
                    >
                        Verification code
                    </FormTextField>
                </Box>

                <Box sx={{marginBottom: '24px'}}>
                    <FormButton
                        variant='contained'
                        onSubmit={handleSubmit}
                    >

                    </FormButton>
                </Box>

            </InfoWrapper>

        </>
    )
}
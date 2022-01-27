import {ChangeEvent, FC, FormEvent, useState} from "react"
import {Alert, Box, Stack, Typography} from "@mui/material"
import {FormButton, FormTextField, InfoWrapper} from "../components/FormStyles"
import {useDispatch} from "react-redux"
import {useNavigate} from "react-router-dom";
import {AuthData, VerificationData} from "../service/api/types";
import {AuthenticationService} from "../service/api/authenticationService";
import {Progress} from "../components/Progress";

/**
 * @author  Sowa Takayanagi
 * @since   1/21/2022 1:08 PM
 * @version 1.0.0
 */

export const EmailVerification: FC = () => {
    const [code, setCode] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [failure, setFailure] = useState(false)
    const [codeResent, setCodeResent] = useState(false)
    const [resendSuccess, setResendSuccess] = useState(false)
    const [resendFailure, setResendFailure] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmit = (ev: FormEvent<HTMLFormElement>) => {
        ev.preventDefault()
        setIsLoading(true)
        const postData: VerificationData = {verificationCode: code}
        AuthenticationService.checkVerificationCode(postData)
            .then(data => {
                if(data.status === '302') {
                    setIsLoading(false)
                    setFailure(false)
                    navigate('/account/create')
                } else {
                    console.log(data.status)
                    setIsLoading(false)
                    setFailure(false)
                    navigate('/doomed')
                }
            }).catch(err => {
            if (err.status === '302') {
                setIsLoading(false)
                setFailure(false)
                navigate('/account/create')
            } else {
                setIsLoading(false)
                setFailure(true)
            }
            console.log(err)
        })
    }

    const onClickResendButton = (ev: FormEvent<HTMLFormElement>) => {
        setIsLoading(true)

        const email = ''
        const postData: AuthData = {email: email}
        AuthenticationService.sendVerificationCode(postData)
            .then(response => {
                if (response.status === '204') {
                    console.log(response)
                    setIsLoading(false)
                    setCodeResent(true)
                    setResendSuccess(true)
                    setResendFailure(false)
                }
            }).catch(err => {
            setIsLoading(false)
            setCodeResent(false)
            setResendSuccess(false)
            setResendFailure(true)
            console.log(err)
        })
    }

    const handleChange = (ev: ChangeEvent<HTMLFormElement>) => {
        setCode(ev.currentTarget.value)
    }


    //{isEmailNull ? <Alert severity={'error'}>Email is null</Alert> : null}
    return (
        <>
            {isLoading ? <Progress/> : null}
            {failure ? <Alert severity={'error'}>Verification failed</Alert> : null}
            {resendFailure ? <Alert severity={'error'}>Could not re-send code</Alert> : null}
            {resendSuccess ? <Alert severity={'success'}>Code is sent</Alert> : null}
            <Typography component={'div'} sx={{
                fontSize: '40px',
                fontWeight: '700px',
                lineHeight: '36px',
                marginBottom: '24px',
                marginLeft: '12px',
                marginTop: '12px'
            }}>
                Input verification code
            </Typography>
            <InfoWrapper onSubmit={handleSubmit}>
                <Stack direction={'column'}>
                    <Typography component={'h6'} sx={{marginBottom: '24px'}}>
                        Email verification code is sent to your email.
                        <br/>
                        Please enter the code below to continue.
                    </Typography>
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
                            type='submit'
                            variant='contained'
                            disabled={!(code)}
                            onClick={handleSubmit}
                        >
                            Submit
                        </FormButton>
                    </Box>


                    <Box>
                        <Typography>
                            If verification code is not sent to your email, try re-sending.
                        </Typography>
                    </Box>

                    <Box sx={{marginTop: '24px'}}>
                        <FormButton
                            color={'success'}
                            onClick={onClickResendButton}
                            variant={'contained'}>
                            Re-send code
                        </FormButton>
                    </Box>

                </Stack>

            </InfoWrapper>

        </>
    )
}
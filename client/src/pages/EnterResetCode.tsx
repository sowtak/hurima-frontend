import {ChangeEvent, FC, FormEvent, useState} from "react"
import {Alert, Box, Stack, Typography} from "@mui/material"
import {FormButton, FormTextField, InfoWrapper} from "../components/FormStyles"
import {useDispatch} from "react-redux"
import {useNavigate} from "react-router-dom";
import {Email, ActivationLink} from "../service/api/types";
import {AuthenticationService} from "../service/api/authenticationService";
import {Progress} from "../components/Progress";
import {sendResetCode, VerifyResetCode} from "../store/ducks/user/thunks";
import {SendResetCodeProps} from "./ForgotPassword";

/**
 * @author  Sowa Takayanagi
 * @since   1/21/2022 1:08 PM
 * @version 1.0.0
 */

export type EnterResetCodeProps  = {
    verificationCode: string
}

export const EnterResetCode: FC = () => {
    const [code, setCode] = useState('')
    const [loading, setLoading] = useState(false)
    const [failure, setFailure] = useState(false)
    const [codeResent, setCodeResent] = useState(false)
    const [resendSuccess, setResendSuccess] = useState(false)
    const [resendFailure, setResendFailure] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmit = (ev: FormEvent<HTMLFormElement>) => {
        ev.preventDefault()
        setLoading(true)
        const postData: EnterResetCodeProps = {verificationCode: code}
        dispatch(VerifyResetCode(postData))
    }

    const handleChange = (ev: ChangeEvent<HTMLFormElement>) => {
        setCode(ev.currentTarget.value)
    }


    //{isEmailNull ? <Alert severity={'error'}>Email is null</Alert> : null}
    return (
        <>
            {loading ? <Progress/> : null}
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
                </Stack>
            </InfoWrapper>
        </>
    )
}
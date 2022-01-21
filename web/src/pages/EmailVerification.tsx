import {FC, FormEvent, useState} from "react"
import {Box, Typography} from "@mui/material"
import {FormButton, FormTextField, InfoWrapper} from "../components/FormStyles"
import {useDispatch} from "react-redux"

/**
 * @author  Sowa Takayanagi
 * @since   1/21/2022 1:08 PM
 * @version 1.0.0
 */

export const EmailVerification: FC = () => {
    const [code, setCode] = useState('')
    const dispatch = useDispatch()

    const handleSubmit = (ev: FormEvent<HTMLFormElement>) => {
        ev.preventDefault()

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
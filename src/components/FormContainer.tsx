import { Avatar, Box, createTheme, Grid, ThemeProvider, Typography } from "@mui/material"
import { ReactNode } from "react"
import { Logo } from "./Navbar/Logo"

const theme = createTheme()

type FormContainerProps = {
    formName: string
    children: ReactNode
}

export const FormContainer = (props: FormContainerProps) => {
    const {formName, children} = props
    return (
        <ThemeProvider theme={theme}>
            <Grid container justifyContent={'center'}>
                <Grid item xs={12} sm={8} md={6} lg={4}>
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alighItems: 'center',
                    }}>
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <Logo/>
                    </Avatar>
                    <Typography>
                        {formName}
                    </Typography>
                </Box>
                {children}
                </Grid>
            </Grid>
        </ThemeProvider>
    )
}
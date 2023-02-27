import {
  Box,
  createTheme,
  Grid,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { ReactNode } from "react";

const theme = createTheme();

type FormContainerProps = {
  formName: string;
  children: ReactNode;
};

export const FormContainer = (props: FormContainerProps) => {
  const { formName, children } = props;
  return (
    <ThemeProvider theme={theme}>
      <Grid container justifyContent={"center"} spacing={3} sx={{minHeight: '86vh'}}>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alighItems: "center",
            }}
          >
            <Typography
              fontFamily={"Averta"}
              marginBottom={3}
              align='center'
              variant='h4'
            >
              {formName}
            </Typography>
          </Box>
          {children}
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

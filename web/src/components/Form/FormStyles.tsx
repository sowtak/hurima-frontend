import {ElementType} from "react"
import {styled} from "@mui/material/styles"
import {Box, Button, Container, TextField,} from "@mui/material"

/**
 * @author  Sowa Takayanagi
 * @since   1/21/2022 1:20 PM
 * @version 1.0.0
 */


export const FormContainer: ElementType = styled(Container)`
    width: 340px;
    margin: 0px auto;
    fontWeight: bold;
`

export const FormTextField: ElementType = styled(TextField)`
    width: 340px;
    height: 40px;
    paddingBottom: 36px;
    border: '1px solid #e2e2e1';
    overflow: 'hidden';
    borderRadius: 4;
`

export const FormButton: ElementType = styled(Button)`
    height: 40px;
    width: 340px;
  
    % .MuiButton-label: {
        fontSize: 13;
    }
`

// ----- Wrapper ------

export const InfoWrapper: ElementType = styled('div')`
    marginTop: 30px;
    display: flex;
`
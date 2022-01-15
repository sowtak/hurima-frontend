/**
 * @author  Sowa Takayanagi
 * @since   1/11/2022 3:16 PM
 * @version 1.0.0
 */
import {FC} from "react";
import {
  InputContent, InputCount, RegistrationFormContainer,
  RegistrationInputLabel
} from "./RegistrationStyles";
import {InputLabel} from "@mui/material";

interface RegistrationInputProps {
  onChange: (...event: any[]) => void;
  value: string
  error?: boolean
  name: string
}

const RegistrationInput: FC<RegistrationInputProps> = ({
                                                         onChange, value, error, name
                                                       }) => {
  return (
    <RegistrationFormContainer>
      <InputContent>
        <InputCount>
          <RegistrationInputLabel>
            {value?.length === undefined ? 0 : value.length}
          </RegistrationInputLabel>
        </InputCount>
      </InputContent>
    </RegistrationFormContainer>
  )
}
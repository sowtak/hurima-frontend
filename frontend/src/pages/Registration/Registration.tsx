/**
 * @author  Sowa Takayanagi
 * @since   12/28/2021 3:17 AM
 * @version 1.0.0
 */
import {ChangeEvent, FC, FormEvent, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AuthErrors} from "../../service/api/types";
import {RegistrationData} from "../../service/api/types";
import {Dialog, DialogContent} from "@mui/material";
import {RegistrationDialogContent, RegistrationFormControl, Title} from "./RegistrationStyles";
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {AuthenticationService} from "../../service/api/authenticationService";
import {RegistrationService} from "../../service/api/registrationService";

type RegistrationModalProps = {
  open: boolean
  onClose: () => void
  onOpenCustomize: (value: boolean | ((prevVar: boolean) => boolean)) => void;
  onChangeRegistrationInfo: (data: RegistrationData) => void;
}

const RegistrationFormSchema = yup.object().shape({
  username: yup.string().min(1, "Your name").required(),
  email: yup.string().email("Invalid email").required("Please enter a valid email"),
  password: yup.string().min(8, "Password").max(40).required(),
  password2: yup.string().min(8, "Password (Confirm)").max(40).required(),
});


export const Registration: FC<RegistrationModalProps> = (
  {
    open,
    onClose,
    onOpenCustomize,
    onChangeRegistrationInfo
  }
) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [isLoading]

  const {control, register, handleSubmit, formState: {errors}} = useForm<RegistrationModalProps>({
    resolver: yupResolver(RegistrationFormSchema)
  });

  const dispatch = useDispatch();

  useEffect(() => {
    setEmail("");
    setUsername("");
    setPassword("");
    setPassword2("");
  }, []);

  const onSubmit = (data: RegistrationData): void => {

    const registrationData: RegistrationData
      = {username: data.username, email: data.email, password: data.password, password2: data.password2};
    RegistrationService.sendActivationCode(registrationData)
      .then((response) => {

      });

  }

  return (
    <>
      <Dialog
        transitionDuration={0}
        open={open}
        onClose={onClose}
        aria-labelledby='form-dialog-title'
      >
        <RegistrationDialogContent>
          <Title>Create your account</Title>
          <form onSubmit=>
            <RegistrationFormControl variant='outlined'>
              <Controller
                name="username"
                control={control}
            </RegistrationFormControl>
          </form>
        </RegistrationDialogContent>

      </Dialog>
    </>
  );
};
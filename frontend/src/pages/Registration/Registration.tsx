/**
 * @author  Sowa Takayanagi
 * @since   12/28/2021 3:17 AM
 * @version 1.0.0
 */
import {ChangeEvent, FC, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RegistrationData} from "../../service/api/types";
import {
  RegistrationFormContainer, RegistrationTextField,
} from "./RegistrationStyles";
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {RegistrationService} from "../../service/api/registrationService";

const RegistrationFormSchema = yup.object().shape({
  username: yup.string().min(1, "Your name").required(),
  email: yup.string().email("Invalid email").required("Please enter a valid email"),
  password: yup.string().min(8, "Password").max(40).required(),
  password2: yup.string().min(8, "Password (Confirm)").max(40).required(),
});

export const Registration: FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [isLoading, setIsLoading] = useState(false);


  const {control, register, handleSubmit, formState: {errors}} = useForm({
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
    setIsLoading(true);
    const registrationData: RegistrationData
      = {username: data.username, email: data.email, password: data.password, password2: data.password2};
    RegistrationService.sendActivationCode(registrationData)
      .then((response) => {
        setIsLoading(false);
      });

  }

  return (
    <RegistrationFormContainer>
      <h1>Sign up</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <RegistrationTextField
          label='Username'
          variant='filled'
          onChange={(event:ChangeEvent<HTMLInputElement>) => setUsername(event.target.value)}
          value={username}
        />
        <RegistrationTextField
          label='Email'
          variant='filled'
          onChange={(event:ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)}
          value={email}
        />
        <RegistrationTextField
          label='Password'
          variant='filled'
          onChange={(event:ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)}
          value={password}
        />
        <RegistrationTextField
          label='Password (Confirmation)'
          variant='filled'
          onChange={(event:ChangeEvent<HTMLInputElement>) => setPassword2(event.target.value)}
          value={password2}
        />
      </form>
    </RegistrationFormContainer>
  );
};
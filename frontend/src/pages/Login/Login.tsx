/**
 * @author  Sowa Takayanagi
 * @since   12/27/2021 3:06 AM
 * @version 1.0.0
 */
import {ChangeEvent, FC, FormEvent, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {AppState} from "../../store/rootReducer";
import {activateAccount, login} from "../../store/thunks/auth-thunks";
import {useParams} from "react-router";
import {LoginFormContainer, LoginFormError, LoginInputField, LoginSubmitButton} from "./LoginStyles";
import {UserData} from "../../types/types";

export const Login: FC = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const error = useSelector((state: AppState) => state.auth.error);
  const success = useSelector((state: AppState) => state.auth.success);
  const isRegistered = useSelector((state: AppState) => state.auth.isRegistered);
  const isLoggedIn= useSelector((state: AppState) => state.user.isLoggedIn);
  const loading: boolean = useSelector((state: AppState) => state.auth.loading);
  const user = useSelector((state: AppState) => state.auth.user);

  const {code} = useParams();
  const navigate = useNavigate();

  if ((localStorage.getItem("isLoggedIn")) || isLoggedIn){
    navigate(`/${user.username}`);
  }

  useEffect(() => {
    if (code) {
      console.log(success)
      console.log(isRegistered);
      dispatch(activateAccount(code));
    }
  }, []);

  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userData: UserData = {email, password};
    dispatch(login(userData));
  }

  return (
    <LoginFormContainer>
      <h1>Log in to HUrima</h1>
      {error && <LoginFormError>Email or password is wrong.</LoginFormError>}

      <form onSubmit={handleLogin}>
        <div style={{marginBottom: 24}}>
          <LoginInputField
            label='Email'
            type='email'
            variant='filled'
            onChange={(event: ChangeEvent<HTMLFormElement>) => setEmail(event.target.value)}
            value={email}
          />
        </div>
        <div style={{marginBottom: 24}}>
          <LoginInputField
            label='Password'
            type='password'
            variant='filled'
            onChange={(event: ChangeEvent<HTMLFormElement>) => setPassword(event.target.value)}
            />
        </div>
        <LoginSubmitButton
          type='submit'
          variant='contained'
          color='primary'
          disabled={!(email && password)}
          fullWidth
        >
          Log in
        </LoginSubmitButton>
      </form>
    </LoginFormContainer>
  );
};
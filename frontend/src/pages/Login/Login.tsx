/**
 * @author  Sowa Takayanagi
 * @since   12/27/2021 3:06 AM
 * @version 1.0.0
 */
import {ChangeEvent, FC, FormEvent, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {AppStateType} from "../../redux/reducers/root-reducer";
import {UserData} from "../../types/types";
import {activateAccount, formReset, login} from "../../redux/thunks/auth-thunks";
import {useParams} from "react-router";
import {useLoginStyles} from "./LoginStyles";
import {Error} from "@mui/icons-material";
import {Alert, Button, Typography} from "@mui/material";
import {LoginTextField} from "./LoginTextField";

export const Login: FC = () => {
  const classes = useLoginStyles();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const error = useSelector((state: AppStateType) => state.auth.error);
  const success = useSelector((state: AppStateType) => state.auth.success);
  const isRegistered = useSelector((state: AppStateType) => state.auth.isRegistered);
  const isLoggedIn = useSelector((state: AppStateType) => state.user.isLoggedIn);
  const loading: boolean = useSelector((state: AppStateType) => state.auth.loading);
  const user = useSelector((state: AppStateType) => state.auth.user);

  const {code} = useParams();
  const navigate = useNavigate();

  if ((localStorage.getItem("isLoggedIn")) || isLoggedIn) {
    navigate(`/${user.username}`);
  }

  useEffect(() => {
    dispatch(formReset());
    if (code) {
      console.log(success)
      console.log(isRegistered);
      dispatch(activateAccount(code));
    }
  }, []);

  const handleSignIn = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const userData: UserData = {email, password};
    dispatch(login(userData));
  }

  return (
    <div className={classes.container}>
      <h1>Login to HUrima</h1>
      <hr/>
      {error ? <Alert severity='error'>{error}</Alert> : null}
      {success ? <Alert severity='success'>{success}</Alert> : null}
      <form onSubmit={handleSignIn}>
        <div className={classes.input}>
          <LoginTextField
            label="Email"
            type="email"
            variant='filled'
            onChange={(event: ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)}
            value={email}
          />
        </div>
        <div className={classes.input}>
          <LoginTextField
            label="Password"
            type="password"
            variant='filled'
            onChange={(event: ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)}
            value={password}
          />
        </div>
        <Typography component={"span"}>
          <Link to="/forgot-password">Forgot password?</Link>
        </Typography>
        <Button
          className={classes.button}
          type="submit"
          variant="contained"
          color="primary"
          disabled={!(email && password)}
          fullWidth
        >
          Log in
        </Button>
      </form>

      <Typography component={"span"}>
        Don't have an account? <Link to="/registration">Sign up</Link>
      </Typography>

    </div>
  );
};
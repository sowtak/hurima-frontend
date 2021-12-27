/**
 * @author  Sowa Takayanagi
 * @since   12/27/2021 3:06 AM
 * @version 1.0.0
 */
import {ChangeEvent, FC, FormEvent, PropsWithChildren, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {FormContainer} from "../../components/FormContainer/FormContainer";
import {AppStateType} from "../../redux/reducers/root-reducer";
import {Message} from "../../components/Message/Message";
import {Button, Col, Form, Row} from "react-bootstrap";
import {UserData} from "../../types/types";
import {activateAccount, formReset, login} from "../../redux/thunks/auth-thunks";
import {FullPageLoader} from "../../components/FullPageLoader/FullPageLoader";


export const Login: FC = (props: PropsWithChildren<any>) => {

    const dispatch = useDispatch();
    const history = useNavigate();
    const [usernameOrEmail, setUsernameOrEmail] = useState('');
    const [password, setPassword] = useState('');
    const error: string = useSelector((state: AppStateType) => state.auth.error);
    const success: string = useSelector((state: AppStateType) => state.auth.success);
    const loading: boolean = useSelector((state: AppStateType) => state.auth.loading);

    useEffect(() => {
        dispatch(formReset());

        if (props.match.params.code) {
            dispatch(activateAccount(props.match.params.code));
        }
    }, []);

    const handleSignIn = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        const userData: UserData = {usernameOrEmail, password};
        dispatch(login(userData, history));
    }

    return (
        <div>
            <FormContainer>
                <h1>ログイン</h1>
                {error && <Message variant='alert alert-danger'>{JSON.stringify(error)}</Message>}
                {success && <Message variant='alert alert-success'>{JSON.stringify(success)}</Message>}
                <Form onSubmit={handleSignIn}>
                    <Form.Group controlId='usernameOrEmail'>
                        <Form.Label>メールアドレス</Form.Label>
                        <Form.Control
                            placeholder='メールアドレス'
                            value={usernameOrEmail}
                            onChange={(event: ChangeEvent<HTMLInputElement>) => setUsernameOrEmail(event.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId='password'>
                        <Form.Label>パスワード</Form.Label>
                        <Form.Control
                            placeholder='パスワード'
                            type='password'
                            value={password}
                            onChange={(event: ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)}
                        />
                    </Form.Group>

                    <Button type='submit' variant='primary'>
                        ログイン
                    </Button>
                </Form>

                <Row className='py-3'>
                    <Col>
                        新規登録は<Link to='/register'>登録</Link>
                    </Col>
                </Row>
            </FormContainer>
            {loading && <FullPageLoader/>}
        </div>
    );
};
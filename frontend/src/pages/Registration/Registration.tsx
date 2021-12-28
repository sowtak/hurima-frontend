/**
 * @author  Sowa Takayanagi
 * @since   12/28/2021 3:17 AM
 * @version 1.0.0
 */
import {ChangeEvent, FormEvent, PropsWithChildren, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/reducers/root-reducer";
import {formReset, registration} from "../../redux/thunks/auth-thunks";
import {UserRegistration} from "../../types/types";
import {Message} from "../../components/Message/Message";
import {Col, Container, Form, Row} from "react-bootstrap";

export const Registration = (props: PropsWithChildren<any>) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [message, setMessage] = useState('');

    const dispatch = useDispatch();
    const userData = useSelector((state: AppStateType) => state.auth);
    let loading = userData.loading;
    let error = userData.error;
    let userInfo = userData.user;

    const redirect = props.location.search ? props.location.search.substring(props.location.search.indexOf('=') + 1) : '/';

    useEffect(() => {
        dispatch(formReset());
    })

    useEffect(() => {
        if (userInfo) {
            props.history.push(redirect);
        }
    }, [props.history, userInfo, redirect])

    const handleRegister = (event: FormEvent<HTMLFormElement>) => {
        setMessage('');
        event.preventDefault();

        if (password != password2) {
            setMessage('パスワードが一致しません');
            dispatch(formReset());
        } else {
            const userRegistrationData: UserRegistration = {email, username, password, password2};
            dispatch(registration(userRegistrationData));
        }
    }

    return (
        <div>
            <Container>
                <Row>
                    <Col xs={12} md={6}>
                        <h1>新規登録</h1>
                        {message && <Message variant='danger'>{message}</Message>}
                        {error && <Message variant='danger'>{JSON.stringify(error)}</Message>}
                        <Form onSubmit={handleRegister}>

                            <Form.Group controlId='username'>
                                <Form.Label>ユーザ名</Form.Label>
                                <Form.Control
                                    required
                                    placeholder='ユーザ名'
                                    value={username}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group controlId='email'/>

                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
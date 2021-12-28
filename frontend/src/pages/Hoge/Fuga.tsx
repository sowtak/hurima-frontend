/**
 * @author  Sowa Takayanagi
 * @since   12/28/2021 4:39 PM
 * @version 1.0.0
 */
import {FC, FormEvent, useState} from "react";
import {Col, Container, Form, FormControl, FormGroup, FormLabel, Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/reducers/root-reducer";
import {LOADING_USER_INFO} from "../../redux/action-types/user-action-types";

export const Fuga: FC = () => {
  const [fuga, setFuga] = useState('');
  const dispatch = useDispatch();

  const handleFuga = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(LOADING_USER_INFO);
  }
  return (
    <Container>
      <Row>
        <Col xs={12} md={6}>
          <h1>FUGA</h1>
          <Form onSubmit={handleFuga}>
            <FormGroup controlId='fuga'>
              <FormLabel>Fuga</FormLabel>
              <FormControl id='Fuga'
                           onChange={(e) => setFuga(e.target.value)}/>
            </FormGroup>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}
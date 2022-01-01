/**
 * @author  Sowa Takayanagi
 * @since   1/1/2022 12:00 PM
 * @version 1.0.0
 */
import {FC} from "react";
import {Col, Container, Row} from "react-bootstrap";
import './FormContainer.css';

export const FormContainer: FC = ({children }) => {
  return (
    <Container className="center container-lg ">
      <Row md={12} className='border'>
        <Col xl={12} md={12}>
          {children}
        </Col>
      </Row>
    </Container>
  );
};
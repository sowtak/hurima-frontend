/**
 * @author  Sowa Takayanagi
 * @since   12/27/2021 4:03 AM
 * @version 1.0.0
 */
import {Col, Container, Row} from "react-bootstrap";
import {FC, PropsWithChildren} from "react";

export const FormContainer: FC = (children: PropsWithChildren<any>) => {
    return (
        <Container>
            <Row className='justify-content-md-center'>
                <Col xs={12} md={6}>
                    {children}
                </Col>
            </Row>
        </Container>
    )
}

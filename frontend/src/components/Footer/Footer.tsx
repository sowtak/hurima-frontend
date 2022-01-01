/**
 * @author  Sowa Takayanagi
 * @since   1/1/2022 2:46 PM
 * @version 1.0.0
 */
import {FC} from "react";
import {Container} from "react-bootstrap";
import {Link} from "react-router-dom";

export const Footer: FC = () => {
  return (
    <footer className="hurima-footer p-5 bg-black text-white">
      <Container>
        <div className='d-flex justify-content-between'>
          <div className='footer-left'>
            <h3>HUrima</h3>
          </div>
          <div className='footer-right'>
            <h3>Social media</h3>
            <Link to='https://twitter.com/tkyngs_swe'>
              <i className='fab fa-twitter fa-2x mr-3'/>
            </Link>
          </div>
        </div>
      </Container>
      <div className='mx-auto' style={{width: '200px'}}>
        <p>©Copyright tkyngs</p>
      </div>
    </footer>
  )
}
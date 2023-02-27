import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
const Footer = () => {
  return (
    <FooterContainer>
      <nav className='footer-nav'>
      <ul>
        <ul>
          <NavLink to={'privacy-policy'} color='black'>
            Privacy policy
          </NavLink>
        </ul>
        <ul>
          <NavLink to={'terms-of-service'} color='black'>
            Terms of Service
          </NavLink>
        </ul>
      </ul>

      </nav>

      <div className='footer-content'>
            <h5>
              &copy; {new Date().getFullYear()}
              <span> Hurima </span>
            </h5>
            <h5>
              {'  '}All rights reserved
        </h5>
      </div>
    </FooterContainer>
  )
}

const FooterContainer = styled.footer`

  position: relative;
  width: 100%;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #f5f5f5;

  span {
    color: var(--clr-primary-5);
  }
  h5 {
    color: var(--clr-white);
    margin: 0.1rem;
    font-weight: 400;
    text-transform: none;
    line-height: 1.25;
  }

  .footer-nav {
    flex: 1;
  }

  .footer-content {
    flex: 1;
    text-align: center;
  }
  
`

export default Footer
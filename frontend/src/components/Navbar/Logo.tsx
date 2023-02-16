import { Link } from "react-router-dom"
import styled from "styled-components"
import logo from '../../assets/icons/hurima-logo-transparent.png'

export const Logo = () => {
    return (
        <Link to='/'>
            <LogoWrapper src={logo} alt='hurima'/>
        </Link>
    )
}

const LogoWrapper = styled.img`
    height: auto;
    width: auto;
    max-height: 72px;
    max-width: 250px;
    padding-left: 50px;
`
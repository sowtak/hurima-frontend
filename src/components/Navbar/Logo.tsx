import { Link } from "react-router-dom"
import styled from "styled-components"
import logo from '../../assets/icons/hurima-logo-transparent.png'

export const Logo = () => {
    return (
        <Link to='/'>
            <LogoImg src={logo} alt='hurima'/>
        </Link>
    )
}

const LogoImg = styled.img`
    width: 175px;
`
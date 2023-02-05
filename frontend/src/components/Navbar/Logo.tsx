import { Link } from "react-router-dom"
import logo from '../../assets/icons/logo.png'

export const Logo = () => {
    return (
        <Link to='/'>
            <img src={logo} alt='hurima'/>
        </Link>
    )
}
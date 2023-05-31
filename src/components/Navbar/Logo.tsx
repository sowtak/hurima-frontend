import { Link } from "react-router-dom";
import logo from "../../assets/icons/hurima-logo-transparent.png";
import { Image } from "@chakra-ui/react"

export const Logo = () => {
  return (
    <Link to='/'>
      <Image width="175px" src={logo} alt='hurima' />
    </Link>
  );
};

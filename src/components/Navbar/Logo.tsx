import { Image, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export const Logo = () => {
  return (
    <Link to='/'>

      <Text
        bgGradient="linear(to-l, #7928CA, #FF0080)"
        bgClip="text"
        fontSize="6xl"
        fontWeight="extrabold"
        marginLeft={6}
      >
        Hurima
      </Text>

    </Link>
  );
};

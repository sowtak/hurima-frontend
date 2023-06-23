import { Box, Button } from "@chakra-ui/react"
import { Link } from "react-router-dom"

export const SignInButton = () => {
    return (
        <Box>
            <Link to="login" style={{ textDecoration: "none" }} color="black">
                <Button colorScheme="purple" size="md" variant="solid" ml="auto">
                    Sign in
                </Button>
            </Link>
        </Box>
    )
}
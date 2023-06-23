import { Box, Flex, Text, VStack } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box borderTop="1px solid #ccc" bgColor="#f5f5f5" as="footer">
      <Flex justify="center" alignItems="center" p={4}>
        <Flex className="footer-content" alignItems="center">
          <VStack>
            <Text>
              &copy; {new Date().getFullYear()} <Box>Hurima</Box>
            </Text>
            <Text>All rights reserved</Text>
          </VStack>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Footer;


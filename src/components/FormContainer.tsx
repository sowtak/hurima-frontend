import { Box, Grid, extendTheme, ChakraProvider, Text, GridItem } from "@chakra-ui/react";
import { ReactNode } from "react";

const theme = extendTheme();

type FormContainerProps = {
  formName: string;
  children: ReactNode;
};

export const FormContainer = (props: FormContainerProps) => {
  const { formName, children } = props;
  return (
    <ChakraProvider theme={theme}>
      <Grid justifyContent="center" gap={3}>
        <GridItem colSpan={{ base :12, sm: 6,  md: 4, lg: 3,}} minH="89vh">
          <Box mt={8} display="flex" flexDirection="column" alignItems="center">
            <Text fontFamily="Averta" mb={3} textAlign="center" fontSize="2xl">
              {formName}
            </Text>
          </Box>
          {children}
        </GridItem>
      </Grid>
    </ChakraProvider>
  );
};

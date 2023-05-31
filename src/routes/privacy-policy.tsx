import { Box, Heading, Text, UnorderedList, ListItem } from "@chakra-ui/react";

const PrivacyPolicy: React.FC = () => {
  return (
    <Box className='section-center' pb={6}>
      <Heading as="h1" size="xl" mb={4}>
        Hurima Privacy Policy
      </Heading>
      <Text>
        At Hurima, we take your privacy seriously. This privacy policy explains
        how we collect, use, and disclose information about you when you use our
        web app.
      </Text>
      <Heading as="h2" size="lg" mt={6} mb={2}>
        Information We Collect
      </Heading>
      <Text>
        When you use Hurima, we collect the following types of information:
      </Text>
      <UnorderedList ml={6}>
        <ListItem>
          Your email address and some basic information associated with your
          Google account or OpenID
        </ListItem>
        <ListItem>
          Automatically collected information about your device and how you
          interact with our web app, including your IP address, browser type,
          operating system, and pages viewed
        </ListItem>
      </UnorderedList>
      <Heading as="h2" size="lg" mt={6} mb={2}>
        Use of Information
      </Heading>
      <Text>
        We use the information we collect to provide and improve our web app,
        including:
      </Text>
      <UnorderedList ml={6}>
        <ListItem>Providing you with the services and products you request</ListItem>
        <ListItem>Communicating with you about your account or our web app</ListItem>
        <ListItem>
          Personalizing and improving our web app and providing content or
          features that match user profiles or interests
        </ListItem>
        <ListItem>
          Detecting, investigating, and preventing fraud and other illegal
          activities
        </ListItem>
      </UnorderedList>
      <Heading as="h2" size="lg" mt={6} mb={2}>
        Sharing of Information
      </Heading>
      <Text>
        We may share the information we collect in the following circumstances:
      </Text>
      <UnorderedList ml={6}>
        <ListItem>
          With service providers and other third-party vendors who perform
          services on our behalf
        </ListItem>
        <ListItem>With your consent or at your direction</ListItem>
        <ListItem>As required by law or to comply with legal process</ListItem>
        <ListItem>
          In connection with a merger, acquisition, or other business
          transaction
        </ListItem>
      </UnorderedList>
      <Heading as="h2" size="lg" mt={6} mb={2}>
        Data Security
      </Heading>
      <Text>
        We take reasonable measures to protect the information we collect, but
        no security measure is perfect and we cannot guarantee the security of
        your information.
      </Text>
      <Heading as="h2" size="lg" mt={6} mb={2}>
        Changes to this Privacy Policy
      </Heading>
      <Text>
        We may update this Privacy Policy from time to time. If we make material
        changes, we will notify you by email or by posting a notice on our web
        app. Your continued use of Hurima after the effective date of the
        revised Privacy Policy means that you accept the terms of the revised
        Privacy Policy.
      </Text>
      <Heading as="h2" size="lg" mt={6} mb={2}>
        Contact Us
      </Heading>
      <Text>
        If you have any questions or concerns about this Privacy Policy or our
        privacy practices, please contact us at{" "}
        <a href='mailto:hurima.dev@gmail.com'>hurima.dev@gmail.com</a>.
      </Text>
    </Box>
  );
};

export default PrivacyPolicy;

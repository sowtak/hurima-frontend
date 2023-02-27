import styled from "styled-components"

const PrivacyPolicy: React.FC = () => {
    return (
        <PrivacyPolicyContainer>
          <h1>Hurima Privacy Policy</h1>
          <p>At Hurima, we take your privacy seriously. This privacy policy explains how we collect, use, and disclose information about you when you use our web app.</p>
          <h2>Information We Collect</h2>
          <p>When you use Hurima, we collect the following types of information:</p>
          <ul>
            <li>Your email address and some basic information associated with your Google account or OpenID</li>
            <li>Automatically collected information about your device and how you interact with our web app, including your IP address, browser type, operating system, and pages viewed</li>
          </ul>
          <h2>Use of Information</h2>
          <p>We use the information we collect to provide and improve our web app, including:</p>
          <ul>
            <li>Providing you with the services and products you request</li>
            <li>Communicating with you about your account or our web app</li>
            <li>Personalizing and improving our web app and providing content or features that match user profiles or interests</li>
            <li>Detecting, investigating, and preventing fraud and other illegal activities</li>
          </ul>
          <h2>Sharing of Information</h2>
          <p>We may share the information we collect in the following circumstances:</p>
          <ul>
            <li>With service providers and other third-party vendors who perform services on our behalf</li>
            <li>With your consent or at your direction</li>
            <li>As required by law or to comply with legal process</li>
            <li>In connection with a merger, acquisition, or other business transaction</li>
          </ul>
          <h2>Data Security</h2>
          <p>We take reasonable measures to protect the information we collect, but no security measure is perfect and we cannot guarantee the security of your information.</p>
          <h2>Changes to this Privacy Policy</h2>
          <p>We may update this Privacy Policy from time to time. If we make material changes, we will notify you by email or by posting a notice on our web app. Your continued use of Hurima after the effective date of the revised Privacy Policy means that you accept the terms of the revised Privacy Policy.</p>
          <h2>Contact Us</h2>
          <p>If you have any questions or concerns about this Privacy Policy or our privacy practices, please contact us at <a href="mailto:hurima.dev@gmail.com">hurima.dev@gmail.com</a>.</p>
        </PrivacyPolicyContainer>
      )
}

const PrivacyPolicyContainer = styled.div`


  @media only screen and (max-width: 600px) {
  .privacy-policy-container {
    max-width: 100%;
    max-height: 100%;
  }
}
`

export default PrivacyPolicy
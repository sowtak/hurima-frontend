module Handler.Register where

import Data.ByteString.Lazy.Char8 qualified as BL
import Data.Text qualified as T
import Data.Text.Encoding qualified as TE
import Database.Persist.Postgresql qualified as P
import Import
import Network.Mail.Mime qualified as Mail
import Network.Mail.SMTP qualified as SMTP

postApiAuthRegisterR :: Handler Value
postApiAuthRegisterR = do
  -- Get username, email, and password from request body
  registerData <- requireCheckJsonBody :: Handler RegisterData
  let username = registerDataUsername registerData
      email = registerDataEmail registerData
      password = registerDataPassword registerData

  -- Check if the username or email is already taken
  mExistingUsername <- runDB $ getBy $ UniqueUserUsername username
  mExistingEmail <- runDB $ getBy $ UniqueUserEmail email
  case (mExistingUsername, mExistingEmail) of
    (Just _, _) -> sendResponseStatus status409 $ object ["message" .= ("Username already taken" :: Text)]
    (_, Just _) -> sendResponseStatus status409 $ object ["message" .= ("Email already registered" :: Text)]
    (Nothing, Nothing) -> do
      -- Create new user record
      let hash = TE.decodeUtf8 $ hashPassword password
          user =
            User
              { userUsername = username,
                userEmail = email,
                userPassword = hash,
                userVerified = False
              }
      userId <- runDB $ insert user

      -- Generate user token and send verification email
      token <- liftIO $ generateToken userId
      verificationUrl <- liftIO $ getVerificationUrl token
      sendVerificationEmail email verificationUrl

      -- Return success response
      sendResponseStatus status201 $ object ["message" .= ("User registration successful" :: Text)]

sendVerificationEmail :: Text -> Text -> Handler ()
sendVerificationEmail email verificationUrl = do
  -- Load Hamlet template for the verification email
  html <- withUrlRenderer (hamletFile "templates/verification-email.hamlet")
  let subject = "Please verify your account"
      to = [Mail.Address Nothing email]
      body = Mail.plainTextPart "Please enable HTML to view this email." : Mail.htmlPart (BL.pack $ T.unpack html)
      message = Mail.simpleMail (Mail.Address (Just "MyApp") "noreply@myapp.com") to [] [] subject body
  -- Send email using MIME and SES
  manager <- liftIO $ newManager tlsManagerSettings
  creds <- liftIO loadCredentialsFromEnv
  let ses = Mail.awsSesSMTP creds manager
  liftIO $ SMTP.sendMailSES ses message
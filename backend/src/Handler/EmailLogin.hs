module Handler.Auth where

import Data.ByteString.Lazy.Char8 qualified as BL
import Data.Text qualified as T
import Data.Text.Encoding qualified as TE
import Database.Persist.Postgresql qualified as P
import Import

data LoginData = LoginData
  { loginDataEmail :: Text,
    loginDataPassword :: Text
  }
  deriving (Generic)

instance FromJSON LoginData

instance ToJSON LoginData

postApiAuthEmailLoginR :: Handler Value
postApiAuthEmailLoginR = do
  -- Get email and password from request body
  loginData <- requireCheckJsonBody :: Handler LoginData
  let email = loginDataEmail loginData
      password = loginDataPassword loginData

  -- Check if the email is already registered
  mUser <- runDB $ getBy $ UniqueUserEmail email
  case mUser of
    Nothing -> sendResponseStatus status404 $ object ["message" .= ("Email not registered" :: Text)]
    Just (Entity userId user) -> do
      -- Verify password
      let hash = TE.encodeUtf8 $ userPassword user
      if verifyPassword (TE.encodeUtf8 password) hash
        then -- Return success response with user token
        do
          token <- liftIO $ generateToken userId
          sendResponseStatus status200 $ object ["token" .= token]
        else -- Return error response if password is incorrect
          sendResponseStatus status401 $ object ["message" .= ("Incorrect password" :: Text)]

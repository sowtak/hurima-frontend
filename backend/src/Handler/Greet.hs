{-# LANGUAGE NoImplicitPrelude #-}
{-# LANGUAGE OverloadedStrings #-}
{-# LANGUAGE TemplateHaskell #-}
{-# LANGUAGE MultiParamTypeClasses #-}
{-# LANGUAGE TypeFamilies #-}
{-# LANGUAGE QuasiQuotes #-}
module Handler.Greet where

import Import
import ClassyPrelude.Yesod (Html, Yesod (defaultLayout), setTitle, whamlet)

getGreetR :: Text -> Handler Html
getGreetR age = do
    defaultLayout $ do
        setTitle "Hello There!"
        [whamlet|<p>Hello there!|]

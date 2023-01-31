{-# LANGUAGE OverloadedStrings #-}
{-# LANGUAGE QuasiQuotes #-}
{-# LANGUAGE TemplateHaskell #-}
{-# LANGUAGE TypeFamilies #-}

import Data.Aeson (ToJSON, object, (.=))
import Data.Text (Text)
import Database.Persist.Sql (Entity(..))
import Yesod

-- Product data type
data Product = Product
    { productId :: Text
    , productName :: Text
    , productPrice :: Double
    } deriving (Show)

instance ToJSON Product where
    toJSON (Product id name price) =
        object ["id" .= id, "name" .= name, "price" .= price]

-- Cart data type
data Cart = Cart
    { cartId :: Text
    , cartItems :: [Product]
    } deriving (Show)

instance ToJSON Cart where
    toJSON (Cart id items) =
        object ["id" .= id, "items" .= items]

-- Define the Yesod app
data App = App
    { products :: [Product]
    , carts :: [Cart]
    }

mkYesod "App" [parseRoutes|
/products ProductsR GET
/cart CartR POST
|]

instance Yesod App

-- ProductsR handler
getProductsR :: Handler Value
getProductsR = returnJson $ products app

-- CartR handler
postCartR :: Text -> Double -> Handler Value
postCartR itemId itemPrice = do
    let newCart = Cart itemId [Product itemId itemName itemPrice]
    returnJson newCart

-- Run the app
main :: IO ()
main = do
    let products =
            [ Product "1" "Shirt" 20.0
            , Product "2" "Pants" 30.0
            ]
    let carts = []
    warp 3000 App {products, carts}

{-This example defines a simple Product data type with three fields: productId, productName, and productPrice. The Product data type is then converted to JSON using the ToJSON type class.
It also defines a simple Cart data type with two fields cartId and cartItems which is list of products.
The App data type contains two fields products and carts which are used to store the list of products and shopping carts respectively.

The mkYesod function is used to create the Yesod app, and two routes are defined: /products, which returns a JSON list of products, and /cart, which adds a product to a cart. The getProductsR handler returns the list of products in JSON format, and the postCartR handler takes a product ID and price as input and creates a new cart with that product.

Finally, the app is run on port 3000 using the warp function.

This is a very basic example of Yesod web API for e-commerce, it can be extended to include more complex features such as authentication, database integration and more routes to handle different e-commerce operations. -}
--------------------------------------------------------------------------------
{-# LANGUAGE OverloadedStrings #-}

-- import           Data.Monoid (mappend)
import Hakyll

--------------------------------------------------------------------------------
main :: IO ()
main = hakyll $ do
  match "css/*" $ do
    route idRoute
    compile compressCssCompiler

  match "data/**" $ do
    route idRoute
    compile copyFileCompiler

  match "*.html" $ do
    route idRoute
    compile copyFileCompiler

  match "*.md" $ do
    route $ setExtension "html"
    compile $
      pandocCompiler
        >>= loadAndApplyTemplate "templates/default.html" defaultContext
        >>= relativizeUrls

  match "templates/*" $ compile templateBodyCompiler

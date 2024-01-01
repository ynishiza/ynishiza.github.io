--------------------------------------------------------------------------------
{-# LANGUAGE OverloadedStrings #-}

import Hakyll
import Text.Pandoc.Extensions
import Text.Pandoc.Options

config :: Configuration
config =
  defaultConfiguration
    { providerDirectory = "pages/"
    }

pandocOptions :: ReaderOptions
pandocOptions =
  defaultHakyllReaderOptions
    { readerExtensions = readerExtensions defaultHakyllReaderOptions <> githubMarkdownExtensions
    }

main :: IO ()
main = hakyllWith config $ do
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
      pandocCompilerWith pandocOptions defaultHakyllWriterOptions
        >>= loadAndApplyTemplate "templates/default.html" defaultContext
        >>= relativizeUrls

  match "templates/*" $ compile templateBodyCompiler

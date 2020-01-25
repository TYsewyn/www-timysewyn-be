import React from 'react'
import {Helmet} from 'react-helmet'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import useSiteMetadata from './SiteMetadata'
import {withPrefix} from 'gatsby'
import {
  Container,
  createMuiTheme,
  CssBaseline,
  makeStyles,
  responsiveFontSizes,
  ThemeProvider
} from '@material-ui/core';
import {OutboundLink} from "gatsby-plugin-google-analytics";
import {MDXProvider} from "@mdx-js/react";
import {useSelector} from "react-redux";
import themeOptions from "../styles/theme";
import "./layout.css";
import Blockquote from "./Blockquote"
import Code from "./Code"

import profile from '../img/profile.jpg'

require('../styles/icons');

const useStyles = makeStyles(theme => ({
  main: {
    [theme.breakpoints.down('md')]: {
      padding: 0,
    },
  }
}));

const Literal = (data) => data.children;

const TemplateWrapper = ({children}) => {
  const {description, site_name, siteUrl} = useSiteMetadata();

  const components = {
    a: Literal, // Fix for link within link
    blockquote: Blockquote, // Fix for paragraph within blockquote
    OutboundLink: OutboundLink,
    pre: Code,
  };

  const appearance = useSelector(state => state.appearance);
  const theme = responsiveFontSizes(createMuiTheme(themeOptions(appearance)));
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <MDXProvider components={components}>
        <CssBaseline />
        <Helmet>
          <html lang="en" />
          <title>{site_name}</title>
          <meta name="description" content={description} />
          <meta name="robots" content="notranslate" />

          <meta name="msapplication-TileColor" content={theme.palette.primary.main} />
          <meta name="msapplication-TileImage" content={`${withPrefix('/')}mstile-144x144.png`} />
          <link rel="apple-touch-icon" sizes="180x180" href={`${withPrefix('/')}apple-touch-icon.png`} />
          <link rel="icon" type="image/png" sizes="16x16" href={`${withPrefix('/')}favicon-16x16.png`} />
          <link rel="icon" type="image/png" sizes="32x32" href={`${withPrefix('/')}favicon-32x32.png`} />
          <link rel="mask-icon" href={`${withPrefix('/')}safari-pinned-tab.svg`} color={theme.palette.primary.main} />

          <meta name="twitter:creator" content="@tysewyn" />
          <meta name="twitter:dnt" content="on" />
          <meta name="twitter:widgets:theme" content={appearance} />
          <meta property="og:title" content={site_name} />
          <meta property="og:description" content={description} />
          <meta property="og:type" content="website" />
          <meta property="og:url" content={siteUrl} />
          <meta property="og:image" content={siteUrl + profile} />
          <meta property="og:image:height" content="1365" />
          <meta property="og:image:width" content="1365" />
        </Helmet>
        <Navbar />
        <Container className={classes.main} component="main" role="main" maxWidth="lg">
          {children}
        </Container>
        <Footer role="contentinfo" />
      </MDXProvider>
    </ThemeProvider>
  )
}

export default TemplateWrapper;

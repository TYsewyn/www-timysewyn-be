import React from 'react'
import Helmet from 'react-helmet'
import Layout from '../components/Layout'
import useSiteMetadata from "../components/SiteMetadata";
import {makeStyles, Paper, useMediaQuery, useTheme} from "@material-ui/core";
import PropTypes from "prop-types";

let useStyles = makeStyles(theme => {
  return ({
    blogPost: {
      padding: theme.spacing(2),
      '& a': {
        color: (theme.palette.type === 'dark' ? theme.palette.secondary.light : theme.palette.secondary.dark),
        textDecoration: 'none',
      },
      '& blockquote': {
        borderLeft: `0.2em solid ${theme.palette.secondary.main}`,
        paddingLeft: '1em',
        '&.twitter-tweet:not(.twitter-tweet-error)': {
          borderLeft: 'none',
          paddingLeft: 'inherit',
        }
      },
      '& p': {
        marginBottom: '28px',
      },
    },
    subheading: {
      ...theme.typography.subtitle1,
      display: 'inline-block',
    },
    published: {
      ...theme.typography.subtitle1,
    }
  })
});

let BlogPost = ({ children, category, date, title }) => {
  let classes = useStyles();
  let theme = useTheme();
  let onDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  let elevation = (onDesktop ? 1 : 0);
  let formattedDate = new Date(date);
  return (
    <Paper className={classes.blogPost} component="article" elevation={elevation} role="main" square={!onDesktop}>
      <h1>{title}</h1>
      <div className={classes.subheading}>{category}</div><br /><time className={classes.published} dateTime={date}>{formattedDate.toLocaleDateString()}</time>
      {children}
    </Paper>
  )
};

BlogPost.propTypes = {
  date: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default ({ children, location : { href : url, origin}, pageContext: { frontmatter : { category, date, description, thumbnail, title } } }) => {
  let { site_name } = useSiteMetadata();
  return (
    <Layout>
      <Helmet defer={false}>
        <title>{title + ` | ` + site_name}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title + ` | ` + site_name} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`${url}`} />
        <meta property="og:image" content={origin + thumbnail} />
      </Helmet>
      <BlogPost title={title} category={category} date={date}>
        {children}
      </BlogPost>
    </Layout>
  )
}

import React from 'react'
import Helmet from 'react-helmet'
import Layout from '../components/Layout'
import useSiteMetadata from "../components/SiteMetadata";
import {makeStyles, Paper} from "@material-ui/core";
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
  let formattedDate = new Date(date);
  return (
    <Paper className={classes.blogPost} component="article" elevation="1" role="main" square>
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

export default ({ children, location : { pathname }, pageContext: { frontmatter : { category, date, description, iso, thumbnail, title } } }) => {
  let { site_name, siteUrl : origin } = useSiteMetadata();
  return (
    <Layout>
      <Helmet defer={false}>
        <title>{title + ` | ` + site_name}</title>
        <meta name="description" content={description} />
        <meta name="robots" content="nofollow, notranslate" />
        <meta property="og:title" content={title + ` | ` + site_name} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={origin + pathname} />
        <meta property="og:image" content={origin + thumbnail.src} />
        <meta property="og:image:width" content={thumbnail.width} />
        <meta property="og:image:height" content={thumbnail.height} />
        <meta property="article:author" content={origin} />
        <meta property="article:published_time" content={iso} />
        <meta property="article:section" content={category} />
      </Helmet>
      <BlogPost title={title} category={category} date={date}>
        {children}
      </BlogPost>
    </Layout>
  )
}

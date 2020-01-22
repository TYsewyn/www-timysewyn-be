import React from 'react'
import "../templates/posts.css"
import PropTypes from "prop-types"
import {makeStyles, Paper, Typography, useMediaQuery, useTheme} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  blogPost: {
    padding: theme.spacing(2),
  },
  subheading: {
    ...theme.typography.subtitle1,
  }
}));

const BlogPost = ({ post }) => {
  const classes = useStyles();
  const theme = useTheme();
  const onDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  const { frontmatter : { date, iso, title }, body } = post;
  const elevation = (onDesktop ? 1 : 0)
  return (
    <Paper className={classes.blogPost} component="article" elevation={elevation} role="main" square={!onDesktop}>
      <h1>{title}</h1>
      <div className={classes.subheading}><time dateTime={iso}>{date}</time></div>
      {body}
    </Paper>
  )
}

BlogPost.propTypes = {
  post: PropTypes.shape({
    body: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
    frontmatter: PropTypes.shape({
      date: PropTypes.string.isRequired,
      iso: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }).isRequired
  })
}

export default BlogPost

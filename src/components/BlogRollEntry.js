import React from 'react'
import PropTypes from "prop-types"

import {Card, CardActionArea, CardContent, makeStyles} from '@material-ui/core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import Img from "gatsby-image";

const useStyles = makeStyles(theme => ({
  title: {
    ...theme.typography.h5,
    marginTop: '0',
    marginBottom: '0.35em',
  },
  subtitle: {
    ...theme.typography.subtitle1,
    color: theme.palette.text.secondary,
    margin: '0',
  },
  excerpt: {
    color: theme.palette.text.secondary,
  },
  readingTime: {
    color: theme.palette.text.secondary,
    marginBottom: '0.35em',
  },
}));

const BlogRollEntry = ({ id, title, category, date, slug, excerpt, readingTime, image }) => {
  const classes = useStyles();
  return (
    <Card key={id} elevation={2}>
      <CardActionArea href={slug}>
        <Img fluid={image.childImageSharp.fluid} alt={`image thumbnail for post ${title}`} />
        <CardContent>
          <div className={classes.title} role="heading" aria-level="1">{title}</div>
          <div className={classes.subtitle} role="heading" aria-level="2">{category} - {date}</div>
          <p className={classes.excerpt}>{excerpt}</p>
          <p className={classes.readingTime}><FontAwesomeIcon icon={['fal', 'hourglass-start']} width="0" /> {readingTime}</p>
        </CardContent>
      </CardActionArea>
    </Card>
  )
};

BlogRollEntry.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  excerpt: PropTypes.string.isRequired,
  readingTime: PropTypes.string.isRequired,
  image: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

export default BlogRollEntry

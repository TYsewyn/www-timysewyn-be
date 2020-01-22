import React from 'react'
import Layout from '../../components/Layout'
import {graphql, StaticQuery} from "gatsby";
import {Grid, makeStyles} from "@material-ui/core";
import BlogRollEntry from "../../components/BlogRollEntry";

const useStyles = makeStyles(theme => ({
  list: {
    padding: theme.spacing(2),
  }
}));

export default () => (
  <StaticQuery
    query={graphql`
      query {
        allMdx(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { fields: { collection: { eq: "posts" } } }
        ) {
          edges {
            node {
              id
              excerpt(pruneLength: 400)
              fields {
                slug
                readingTime { text }
              }
              frontmatter {
                title
                category
                date(formatString: "MMMM DD, YYYY")
                image {
                  childImageSharp {
                    fluid(maxHeight: 293, quality: 100) {
                      ...GatsbyImageSharpFluid_withWebp_noBase64
                    }
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={({allMdx : {edges: posts}}) => {
      const classes = useStyles();
      return (
        <Layout>
          <Grid container className={classes.list} component="section" spacing={2}>
            {posts &&
            posts.map(({ node: post }) => {
              const {id, excerpt} = post;
              const {category, date, image, title} = post.frontmatter;
              const {readingTime, slug} = post.fields;
              return(
                <Grid item xs={12} sm={6} md={4} key={id} component="article">
                  <BlogRollEntry id={id}
                                 title={title}
                                 excerpt={excerpt}
                                 category={category}
                                 date={date}
                                 slug={slug}
                                 readingTime={readingTime.text}
                                 image={image}
                  />
                </Grid>
              )})}
          </Grid>
        </Layout>
      )
    }}
  />
)

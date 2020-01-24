const _ = require('lodash');
const { createFilePath } = require('gatsby-source-filesystem');
const { fmImagesToRelative } = require('gatsby-remark-relative-images');

exports.createPages = ({ actions, graphql, reporter }) => {
  const { createPage } = actions;

  return graphql(`
    {
      allMdx(
        limit: 1000
        filter: { fields: { collection: { eq: "posts" } } }
      ) {
        edges {
          node {
            id
            excerpt(pruneLength: 200)
            fields {
              slug
            }
            frontmatter {
              title
              category
              date(formatString: "MMMM DD, YYYY")
              thumbnail: image {
                childImageSharp {
                  image: fluid(maxWidth: 1200, maxHeight: 1200) {
                    src
                    height: presentationHeight
                    width: presentationWidth
                  }
                }
              }
            }
            fileAbsolutePath
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      result.errors.forEach(e => reporter.error(e.toString()));
      reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query');
      return Promise.reject(result.errors)
    }

    const posts = result.data.allMdx.edges;

    posts.forEach(edge => {
      const {id, excerpt, fileAbsolutePath, frontmatter: { thumbnail: { childImageSharp: { image : thumbnail } }, ...frontmatter} } = edge.node;
      const {slug} = edge.node.fields;
      const component = fileAbsolutePath;
      createPage({
        path: slug,
        component: component,
        context: {
          id: id,
          frontmatter: { ...frontmatter, thumbnail: thumbnail, description: excerpt }
        },
      })
    })
  })
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;
  fmImagesToRelative(node); // convert image paths for gatsby images

  if (node.internal.type === `Mdx`) {
    let sourceInstanceName = getNode(node.parent).sourceInstanceName;
    createNodeField({
      node,
      name: 'collection',
      value: sourceInstanceName,
    });

    let basePath = sourceInstanceName === 'posts' ? '/blog' : '';
    const filePath = createFilePath({ node, getNode });
    createNodeField({
      name: `slug`,
      node,
      value: basePath + filePath,
    });
  }
};

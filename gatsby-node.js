const _ = require('lodash');
const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');
const { fmImagesToRelative } = require('gatsby-remark-relative-images');

exports.createPages = ({ actions, graphql, reporter }) => {
  const { createPage } = actions;

  return graphql(`
    {
      allMdx(limit: 1000) {
        edges {
          node {
            id
            fields {
              collection
              slug
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
      const {id, fileAbsolutePath} = edge.node;
      const {/*collection, */slug} = edge.node.fields;
      // const component = path.resolve(`src/templates/${collection}.js`);
      createPage({
        path: slug,
        component: fileAbsolutePath,
        context: {
          id: id
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

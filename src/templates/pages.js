import React from 'react'
import {graphql} from "gatsby";
import Helmet from 'react-helmet'
import Layout from '../components/Layout'
import useSiteMetadata from "../components/SiteMetadata";
import {MDXRenderer} from "gatsby-plugin-mdx";

const PageComponent = ({ data }) => {
  const { site_name } = useSiteMetadata();
  const { page } = data.mdx;
  const { title } = page.frontmatter;
  return (
    <Layout>
      <Helmet defer={false}>
        {title && title.length ? (
          <title>{title + ` | ` + site_name}</title>
        ) : <title>{site_name}</title>}
      </Helmet>
      Bla
      <MDXRenderer>{page.body}</MDXRenderer>
    </Layout>
  )
}

export default React.memo(PageComponent)

// export const query = graphql`
//   query PageByID($id: String!) {
//     mdx(id: { eq: $id }) {
//       body
//       frontmatter {
//         title
//       }
//     }
//   }
// `

module.exports = {
  siteMetadata: {
    title: 'TimYsewyn.be',
    description:
      'Solutions Architect @Pivotal. Avid open source enthusiast. @springframework & @springcloud contributor. Part of @ngbeconf.',
    siteUrl: 'https://timysewyn.be'
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'TimYsewyn.be',
        short_name: 'TimYsewyn.be',
        start_url: 'https://timysewyn.be',
        background_color: '#29b6f6',
        theme_color: '#29b6f6',
        lang: 'en',
        display: 'standalone',
        legacy: false,
        icons: [
          {
            src: `/android-chrome-36x36.png`,
            sizes: `36x36`,
            type: `image/png`,
          },
          {
            src: `/android-chrome-48x48.png`,
            sizes: `48x48`,
            type: `image/png`,
          },
          {
            src: `/android-chrome-72x72.png`,
            sizes: `72x72`,
            type: `image/png`,
          },
          {
            src: `/android-chrome-96x96.png`,
            sizes: `96x96`,
            type: `image/png`,
          },
          {
            src: `/android-chrome-144x144.png`,
            sizes: `144x144`,
            type: `image/png`,
          },
          {
            src: `/android-chrome-192x192.png`,
            sizes: `192x192`,
            type: `image/png`,
          },
          {
            src: `/android-chrome-256x256.png`,
            sizes: `256x256`,
            type: `image/png`,
          },
          {
            src: `/android-chrome-384x384.png`,
            sizes: `384x384`,
            type: `image/png`,
          },
          {
            src: `/android-chrome-512x512.png`,
            sizes: `512x512`,
            type: `image/png`,
          },
        ]
      },
    },
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass',
    'gatsby-plugin-twitter',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/img`,
        name: 'images',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/posts`,
        name: 'posts',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      },
    },
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-68160333-2',
        head: true,
      },
    },
    {
      resolve: `gatsby-plugin-react-redux`,
      options: {
        pathToCreateStoreModule: './src/state/createStore',
        serialize: {
          space: 0,
          isJSON: true,
          unsafe: false,
        },
      },
    },
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        defaultLayouts: {
          posts: `${__dirname}/src/templates/posts.js`
        },
        extensions: ['.md', '.mdx'],
        gatsbyRemarkPlugins: [
          {
            resolve: 'gatsby-remark-embed-video',
            options: {
              urlOverrides: [
                {
                  id: 'youtube',
                  embedURL: (videoId) => `https://www.youtube-nocookie.com/embed/${videoId}`,
                }
              ]
            },
          },
          'gatsby-remark-responsive-iframe',
          {
            resolve: `${__dirname}/plugins/gatsby-remark-images-grid`,
            options: {
              className: 'gatsbyRemarkImagesGrid',
              gridGap: '20px',
              margin: '20px auto',
            },
          },
          {
            resolve: 'gatsby-remark-images',
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 1344,
              withWebp: true,
            },
          },
          {
            resolve: 'gatsby-remark-copy-linked-files',
            options: {
              destinationDir: 'static',
            },
          },
          {
            resolve: "gatsby-remark-embedder",
            options: {
              debug: true
            }
          },
          `${__dirname}/plugins/gatsby-remark-fix-descendants-of-p`,
        ],
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-remark-reading-time',
    {
      resolve: `gatsby-plugin-hotjar`,
      options: {
        id: 377667,
        sv: 6
      },
    },
    'gatsby-plugin-material-ui', // Needed here because last replaceHeadComponents in onPreRenderHTML wins
    {
      resolve: 'gatsby-plugin-purgecss', // purges all unused/unreferenced css rules
      options: {
        develop: true, // Activates purging in npm run develop
        ignore: ['src/components/Code.scss'],
      },
    },// must be after other CSS plugins
    'gatsby-plugin-offline',
    {
      resolve: "gatsby-plugin-netlify-cache",
      options: {
        cachePublic: true
      }
    },
    {
      resolve: 'gatsby-plugin-netlify',
      options: {
        headers: {
          "/*": [
            "Content-Security-Policy: base-uri 'self'; default-src 'self' https://www.google-analytics.com https://platform.twitter.com https://script.hotjar.com https://static.hotjar.com; script-src 'self' 'unsafe-inline' https://www.google-analytics.com https://platform.twitter.com https://cdn.syndication.twimg.com https://script.hotjar.com https://static.hotjar.com; style-src 'self' blob: 'unsafe-inline' https://platform.twitter.com https://ton.twimg.com; object-src 'none'; form-action 'self' https://platform.twitter.com https://syndication.twitter.com; font-src 'self' data:; connect-src 'self' https://www.google-analytics.com https://platform.twitter.com https://script.hotjar.com https://in.hotjar.com https://vc.hotjar.io; img-src 'self' data: https://www.google-analytics.com https://platform.twitter.com https://syndication.twitter.com https://pbs.twimg.com https://ton.twimg.com https://script.hotjar.com; media-src 'self' https://*.youtube-nocookie.com; frame-src 'self' https://*.youtube-nocookie.com https://platform.twitter.com https://syndication.twitter.com https://vars.hotjar.com; child-src 'self' https://vars.hotjar.com; report-uri https://timysewyn.report-uri.com/r/d/csp/enforce;",
          ],
        }, // option to add more headers. `Link` headers are transformed by the below criteria
        mergeSecurityHeaders: true, // boolean to turn off the default security headers
        mergeLinkHeaders: true, // boolean to turn off the default gatsby js headers
        mergeCachingHeaders: true, // boolean to turn off the default caching headers
        generateMatchPathRewrites: true, // boolean to turn off automatic creation of redirect rules for client only paths
      },
    }, // make sure to keep it last in the array
  ],
}

const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    graphql(`
      {
        allDatoCmsAlbum {
          edges {
            node {
              slug
            }
          }
        }
        allDatoCmsTrack {
          edges {
            node {
              slug
            }
          }
        }
      }
    `).then(result => {
      result.data.allDatoCmsAlbum.edges.map(({ node: album }) => {
        createPage({
          path: `albums/${album.slug}`,
          component: path.resolve(`./src/templates/album.js`),
          context: {
            slug: album.slug,
          },
        })
      })
      result.data.allDatoCmsTrack.edges.map(({ node: track }) => {
        createPage({
          path: `tracks/${track.slug}`,
          component: path.resolve(`./src/templates/track.js`),
          context: {
            slug: track.slug,
          },
        })
      })
      resolve()
    })
  })
}

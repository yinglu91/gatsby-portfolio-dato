const path = require(`path`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const result = await graphql(
    `
      {
        allDatoCmsWork {
          edges {
            node {
              slug
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    console.log(result.errors)
    return
  }

  // "slug": "poster-2"
  // http://localhost:8000/works/poster-2
  result.data.allDatoCmsWork.edges.map(({ node }) => {
    createPage({
      path: `works/${node.slug}`,
      component: path.resolve(`./src/templates/work.js`),
      context: {
        slug: node.slug,
      },
    })
  })
}

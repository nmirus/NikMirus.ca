const Promise = require("bluebird")
const path = require("path")

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const projectTemplate = path.resolve("./src/templates/project.js")
    resolve(
      graphql(
        `
          {
            contentfulHome(slug: { eq: "index" }) {
              projects {
                project {
                  title
                  slug
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        const posts = result.data.contentfulHome.projects
        posts.forEach(({ project }, index) => {
          createPage({
            path: `/${project.slug}/`,
            component: projectTemplate,
            context: {
              slug: project.slug,
              prev:
                index === 0
                  ? posts[posts.length - 1].project
                  : posts[index - 1].project,
              next:
                index === posts.length - 1
                  ? posts[0].project
                  : posts[index + 1].project,
            },
          })
        })
      })
    )
  })
}

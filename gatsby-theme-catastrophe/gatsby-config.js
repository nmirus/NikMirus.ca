module.exports = ({
  basePath = "/",
  gaTrackingId = "",
  contentful = false,
}) => ({
  plugins: [
    {
      resolve: `gatsby-plugin-postcss`,
      options: {
        postCssPlugins: [
          require("postcss-import"),
          require(`rucksack-css`),
          require(`tailwindcss`),
          require(`postcss-preset-env`)({ stage: 2 }),
        ],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `src/images`,
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: gaTrackingId,
      },
    },
    contentful && {
      resolve: `gatsby-source-contentful`,
      options: { ...contentful, downloadLocal: true },
    },
  ],
})

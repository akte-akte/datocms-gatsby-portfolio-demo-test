require('dotenv').config()

module.exports = {
  siteMetadata: {
    title: `Kieran Roberts`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`,
    `gatsby-transformer-remark`,
    `gatsby-plugin-material-ui`,
    {
      resolve: `gatsby-source-datocms`,
      options: {
        apiToken: process.env.DATO_API_TOKEN,
      },
    },
    {
      resolve: 'gatsby-plugin-snipcartv3',
      options: {
        apiKey: process.env.GATSBY_SNIPCART_APIKEY,
        js: 'https://cdn.snipcart.com/themes/v3.0.18/default/snipcart.js',
        styles: 'https://cdn.snipcart.com/themes/v3.0.18/default/snipcart.css',
      }
    },
    {
      resolve: 'gatsby-plugin-google-fonts',
      options: {
        fonts: [
          'material icons',
        ],
      },
    },
  ],
}

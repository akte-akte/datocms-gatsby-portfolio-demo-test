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
      resolve: 'gatsby-plugin-snipcart-advanced',
      options: {
        apiKey: process.env.GATSBY_SNIPCART_API_KEY,
        version: '3.0.15',
        defaultLang: 'en',
        currency: 'aud',
        openCartOnAdd: false,
        innerHTML: `
        <billing section="bottom">
            <!-- Customization goes here -->
        </billing>`,
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

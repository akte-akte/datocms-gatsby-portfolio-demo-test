import React from 'react'
// import Slider from 'react-slick'
import { HelmetDatoCms } from 'gatsby-source-datocms'
import Img from 'gatsby-image'
import { graphql } from 'gatsby'
import Layout from "../components/layout"

export default ({ data }) => (
  <Layout>
    <article className="sheet">
      <HelmetDatoCms seo={data.album.seoMetaTags} />
      <div className="sheet__inner">
        <h1 className="sheet__albumTitle">{data.album.albumTitle}</h1> 
        <p className="sheet__lead">excerpt</p>
        
        <div
          className="sheet__body"
          dangerouslySetInnerHTML={{
            __html: data.album.descriptionNode.childMarkdownRemark.html,
          }}
        />
   
        <div className="sheet__gallery">
          <Img fluid={data.album.albumArtwork.fluid} />
        </div>
       
      </div>
    </article>
  </Layout>
)

export const query = graphql`
  query AlbumQuery($slug: String!) {
   album: datoCmsAlbum(slug: { eq: $slug }) {
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
      albumTitle
      descriptionNode {
        childMarkdownRemark {
          html
        }
      }
      albumArtwork {
        url
        fluid(maxWidth: 600, imgixParams: { fm: "jpg", auto: "compress" }) {
          ...GatsbyDatoCmsSizes
        }
      }
    }
  }
`

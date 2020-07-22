import React from 'react'
// import Slider from 'react-slick'
import Img from 'gatsby-image'
import { graphql } from 'gatsby'

export default ({ data }) => (
    <article className="sheet">
      <div className="sheet__inner">
        <h1 className="sheet__title">{data.track.title}</h1> 
        <div className="sheet__gallery">
          <Img fluid={data.track.artwork.fluid} />
        </div>
       
      </div>
    </article>
)

export const query = graphql`
  query trackQuery {
   track: datoCmsTrack {
      title
      artwork {
        url
        fluid(maxWidth: 600, imgixParams: { fm: "jpg", auto: "compress" }) {
          ...GatsbyDatoCmsSizes
        }
      }
    }
  }
`

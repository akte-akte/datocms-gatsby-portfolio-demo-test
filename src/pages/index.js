import React from 'react'
import { Link, graphql } from 'gatsby'
import Masonry from 'react-masonry-component'
import Img from 'gatsby-image'
import Layout from "../components/layout"
import {Button, Card, Grid, CardContent, CardMedia, Typography} from '@material-ui/core';

const IndexPage = ({ data }) => (
  <Layout>
    <Masonry className="showcase">
      {data.allDatoCmsAlbum.edges.map(({ node: album }) => (
        <div key={album.id} className="showcase__item">
          <figure className="card">
            <Link to={`/albums/${album.slug}`} className="card__image">
              <Img fluid={album.albumArtwork.fluid} />
            </Link>
            <figcaption className="card__caption">
              <h6 className="card__title">
                <Link to={`/albums/${album.slug}`}>{album.title}</Link>
              </h6>
              <div className="card__description">
                <p>{album.description}</p>
              </div>
            </figcaption>
          </figure>
        </div>
      ))}
    </Masonry>
    <Grid container spacing={5}>
      {data.allDatoCmsCta.edges.map(({ node: cta }) => (
        <Grid item xs={12} sm={6} md={4} key={cta.id}>
          <Typography variant="h4" component="h2">
            {cta.title}
          </Typography>
          <Typography variant="body1" style={{ whiteSpace: "pre-line" }}>
            {cta.description}
          </Typography>
        </Grid>
      ))}
    </Grid>
  </Layout>
);

export default IndexPage

export const query = graphql`
  query IndexQuery {
    allDatoCmsAlbum(sort: { fields: [id], order: ASC }) {
      edges {
        node {
          id
          albumTitle
          slug
          description
          albumArtwork {
            fluid(maxWidth: 450, imgixParams: { fm: "jpg", auto: "compress" }) {
              ...GatsbyDatoCmsSizes
            }
          }
        }
      }
    }
    allDatoCmsCta {
      edges {
        node {
          id
          title
          description
        }
      }
    }
  }
`

import React from 'react'
import { HelmetDatoCms } from 'gatsby-source-datocms'
import Img from 'gatsby-image'
import { graphql } from 'gatsby'
import Layout from "../components/layout"
import {Button, Card, Grid, CardContent, CardMedia, Typography, IconButton} from '@material-ui/core';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

export default ({ data }) => (
  <Layout>
    <article className="sheet">
      <HelmetDatoCms seo={data.album.seoMetaTags} />
      <div className="sheet__inner">
        <h1 className="sheet__albumTitle">{data.album.albumTitle}</h1>
        <p className="sheet__lead">About this album</p>

        <div
          className="sheet__body"
          dangerouslySetInnerHTML={{
            __html: data.album.descriptionNode.childMarkdownRemark.html,
          }}
        />

        <Button
          variant="contained"
          color="primary"
          class="snipcart-add-item"
          data-item-id={data.album.id}
          data-item-price={data.album.price}
          data-item-url={data.album.albumArtwork}
          data-item-description="High-quality replica of The Starry Night by the Dutch post-impressionist painter Vincent van Gogh."
          data-item-image="/assets/images/starry-night.jpg"
          data-item-name={data.album.name}
          data-item-custom1-name="purchase option"
          data-item-custom1-options="CD[+100.00]|Download[+300.00]"
        >
          Add to cart
        </Button>

        <div className="sheet__gallery">
          <Img fluid={data.album.albumArtwork.fluid} />
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {data.album.tracks.map((track, id) => (
                <div key={track.id}>
                  <Card>
                    <Grid container spacing={3}>
                      <Grid item xs={3}>
                        <CardMedia
                          component="img"
                          image={track.artwork.url}
                          title={track.title}
                          height="140"
                        />
                      </Grid>
                      <Grid item>
                        <div>
                          <CardContent>
                            <Typography variant="h5" component="h2">
                              {track.title}
                            </Typography>
                            <Typography variant="body2" component="p">
                              ${track.price}AUD
                            </Typography>
                          </CardContent>
                          <div>
                            <IconButton aria-label="play/pause">
                              <PlayArrowIcon />
                            </IconButton>
                          </div>
                        </div>
                      </Grid>
                    </Grid>
                  </Card>
                </div>
              ))}
            </Grid>
          </Grid>
        </div>
      </div>
    </article>
  </Layout>
);

export const query = graphql`
  query AlbumQuery($slug: String!) {
   album: datoCmsAlbum(slug: { eq: $slug }) {
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
      albumTitle
      id
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
      tracks {
        id
        title
        price
        artwork {
          url
          sizes(maxWidth: 150, imgixParams: { fm: "jpg", auto: "compress" }) {
            ...GatsbyDatoCmsSizes
          }
        }
      }
    }
  }
`

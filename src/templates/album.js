import React from 'react'
import { HelmetDatoCms } from 'gatsby-source-datocms'
import Img from 'gatsby-image'
import { graphql } from 'gatsby'
import Layout from "../components/layout"
import { Button, Card, Grid, CardContent, CardMedia, Typography, IconButton } from '@material-ui/core';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import { makeStyles } from '@material-ui/core/styles';

import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import AudioPlayer from 'material-ui-audio-player';
 
const muiTheme = createMuiTheme({});

const useStyles = makeStyles((theme) => ({
  contentPadding: {
    margin: '20px 0px',
  },
}));

export default ({ data }) => {
  const classes = useStyles();

  return (
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
            data-item-price={data.album.price.toFixed(2)}
            data-item-url={`https://practical-hugle-a440b6.netlify.app/albums/${data.album.slug}`}
            data-item-description="Album description."
            data-item-image={data.albumArtwork}
            data-item-name={data.album.name}
            data-item-custom1-name="Purchase option"
            data-item-custom1-options="CD[+10.00]|Download"
          >
            Add to cart
          </Button>

          <div className="sheet__gallery">
            <Img fluid={data.album.albumArtwork.fluid} />
            <Grid container spacing={3}>
              <Grid item xs={12}>
                {data.album.tracks.map((track, id) => (
                  <div key={track.id}>
                    <Card className={classes.contentPadding} square>
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={6} md={3}>
                          <CardMedia
                            component="img"
                            image={track.artwork.url}
                            title={track.title}
                            maxHeight="140"
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={9}>
                            <CardContent>
                              <Typography variant="h5" component="h2">
                                {track.title}
                              </Typography>
                              <Typography variant="body2" component="p">
                                ${track.price.toFixed(2)}AUD
                              </Typography>
                              <ThemeProvider theme={muiTheme}>
                               <AudioPlayer src={track.trackSample.url}
                                elevation={0}
                                width="100%"
                                variation="default"
                                spacing={3}
                                download={false}
                                autoplay={false}
                                order="standart"
                                preload="auto"
                                loop={false} />
                            </ThemeProvider>
      
                              <Button
                                variant="contained"
                                color="primary"
                                class="snipcart-add-item"
                                data-item-file-guid={track.cartGuid}
                              >
                                Add to cart
                              </Button>
                            </CardContent>
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
};

export const query = graphql`
  query AlbumQuery($slug: String!) {
   album: datoCmsAlbum(slug: { eq: $slug }) {
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
      albumTitle
      id
      price
      slug
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
        cartGuid
        trackNumber
        artwork {
          url
          sizes(maxWidth: 150, imgixParams: { fm: "jpg", auto: "compress" }) {
            ...GatsbyDatoCmsSizes
          }
        }
        trackSample {
          url
        }
      }
    }
  }
`

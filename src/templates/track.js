import React from 'react'
import { HelmetDatoCms } from 'gatsby-source-datocms'
import { graphql } from 'gatsby'
import Layout from "../components/layout"
import { Button, Card, Grid, CardContent, CardMedia, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import AudioPlayer from 'material-ui-audio-player';

const muiTheme = createMuiTheme({});

const useStyles = makeStyles((theme) => ({
  contentPadding: {
    margin: "20px 0px",
  },
  root: {
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  loopIcon: {
    color: "#3f51b5",
    "&.selected": {
      color: "#0921a9",
    },
    "&:hover": {
      color: "#7986cb",
    },
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  playIcon: {
    color: "#f50057",
    "&:hover": {
      color: "#ff4081",
    },
  },
  replayIcon: {
    color: "#e6e600",
  },
  pauseIcon: {
    color: "#0099ff",
  },
  volumeIcon: {
    color: "rgba(0, 0, 0, 0.54)",
  },
  volumeSlider: {
    color: "black",
  },
  progressTime: {
    color: "rgba(0, 0, 0, 0.54)",
  },
  mainSlider: {
    color: "#3f51b5",
    "& .MuiSlider-rail": {
      color: "#7986cb",
    },
    "& .MuiSlider-track": {
      color: "#3f51b5",
    },
    "& .MuiSlider-thumb": {
      color: "#303f9f",
    },
  },
}));

export default ({ data }) => {
  const classes = useStyles();

  return (
    <Layout>
      <article className="sheet">
      <HelmetDatoCms seo={data.track.seoMetaTags} />
        <div className="sheet__inner">
          <h1 className="sheet__title">{data.track.title}</h1>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card className={classes.contentPadding} square>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6} md={3}>
                    <CardMedia
                      component="img"
                      image={data.track.artwork.url}
                      title={data.track.title}
                      maxheight="140"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={9}>
                    <CardContent>
                      <Grid container>
                        <Grid item xs={12} sm={6}>
                          <Typography variant="h5" component="h2">
                            {data.track.title}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Typography variant="body2" component="p">
                            ${data.track.price.toFixed(2)}AUD
                          </Typography>
                          <Button
                            variant="contained"
                            color="primary"
                            className="snipcart-add-item"
                            data-item-file-guid={data.track.cartGuid}
                            data-item-id={data.track.id}
                            data-item-name={data.track.title}
                            data-item-price={data.track.price}
                            data-item-url={`https://practical-hugle-a440b6.netlify.app/tracks/${data.track.slug}`}
                          >
                            Add to cart
                          </Button>
                        </Grid>
                      </Grid>
                      <ThemeProvider theme={muiTheme}>
                        <AudioPlayer
                          src={data.track.trackSample.url}
                          elevation={0}
                          width="100%"
                          variation="default"
                          spacing={2}
                          download={false}
                          autoplay={false}
                          order="standart"
                          preload="auto"
                          loop={false}
                          useStyles={useStyles}
                        />
                      </ThemeProvider>
                    </CardContent>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          </Grid>
        </div>
      </article>
    </Layout>
  );
};

export const query = graphql`
  query TrackQuery($slug: String!) {
    track: datoCmsTrack(slug: { eq: $slug })  {
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
      id
      title
      price
      cartGuid
      trackNumber
      descriptionNode {
        childMarkdownRemark {
          html
        }
      }
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
`;

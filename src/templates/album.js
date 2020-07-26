import React from 'react'
import { HelmetDatoCms } from 'gatsby-source-datocms'
import Img from 'gatsby-image'
import { Link, graphql } from 'gatsby'
import Layout from "../components/layout"
import { Button, Card, CardActions, CardContent, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  orderedList: {
    listStyleType: "decimal",
    marginLeft: theme.spacing(2.5),
    marginTop: theme.spacing(2),
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
            <p className="sheet__lead">{data.album.lead}</p>
          <div
            className="sheet__body"
            dangerouslySetInnerHTML={{
              __html: data.album.descriptionNode.childMarkdownRemark.html,
            }}
          />
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Img fluid={data.album.albumArtwork.fluid} />
            </Grid>
            <Grid item xs={6}>
              <Card>
              <CardActions>
              <Button
                variant="contained"
                color="primary"
                className="snipcart-add-item"
                data-item-id={data.album.id}
                data-item-price={data.album.price.toFixed(2)}
                data-item-url={`https://practical-hugle-a440b6.netlify.app/albums/${data.album.slug}`}
                data-item-description={data.album.description}
                data-item-image={data.albumArtwork}
                data-item-name={data.album.name}
                data-item-custom1-name="Purchase option"
                data-item-custom1-options="CD[+10.00]|Download"
              >
                Add to cart
              </Button>
              </CardActions>
              <CardContent>
              <ol className={classes.orderedList} color="textSecondary">
                {data.album.tracks.map((track) => (
                  <Typography key={track.id} component="li" variant="body1">
                    <Link to={`/tracks/${track.slug}`}>{track.title}</Link>
                  </Typography>
              ))}
              </ol>
              </CardContent>
              </Card>
             
            </Grid>
          </Grid>
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
      lead
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
        slug
      }
    }
  }
`;

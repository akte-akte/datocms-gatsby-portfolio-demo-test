import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from "../components/layout"
import {Box, Card, Grid, CardContent, CardMedia, Container, Typography} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  zone: { 
    padding: '40px 10px',
  },
}));

const IndexPage = ({ data }) => {

  const classes = useStyles();

return (
  <Layout>
    <Container maxWidth="lg">
    <Grid container spacing={3} className={classes.zone}>
      {data.allDatoCmsAlbum.edges.map(({ node: album }) => (
        <Grid item key={album.id} xs={12} sm={6} md={4}>
          <Card square>
            <Link to={`/albums/${album.slug}`} className="card__image">
              <CardMedia
                component="img"
                image={album.albumArtwork.url}
                title={album.title}
              />
            </Link>
            <CardContent>
              <Typography component="p" variant="body1">
                <Link to={`/albums/${album.slug}`}>{album.title}</Link>
              </Typography>
              <Typography component="p" variant="body2">
                {album.description}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
    <Grid container spacing={3} className={classes.zone}>
      {data.allDatoCmsCta.edges.map(({ node: cta }) => (
        <Grid item xs={12} sm={6} md={4} key={cta.id}>
          <Box>
            <Typography variant="h4" component="h2">
              {cta.title}
            </Typography>
            <Typography variant="body2" style={{ whiteSpace: "pre-line" }}>
              {cta.description}
            </Typography>
          </Box>
        </Grid>
      ))}
    </Grid>
    </Container>
  </Layout>
)};

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
            url
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

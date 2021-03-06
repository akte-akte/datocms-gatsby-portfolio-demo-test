import React from 'react';
import { graphql } from 'gatsby'
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Container} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  hero: {
    backgroundImage: 'url(https://www.datocms-assets.com/31212/1595139299-img0854.jpg)',
    backgroundSize: 'cover', 
    height: '300px',
    color: '#fff',
  },
}));


const HeroBanner = () => {

  const classes = useStyles();

  return (
      <Paper className={classes.hero} elevation={0} square>
        <Container>
         {" "}
        </Container>
      </Paper>
  );
};

export default  HeroBanner

export const query = graphql`
  query BannerQuery {
    datoCmsHomePage {
      bannerImage {
        fluid(maxWidth: 600, imgixParams: { fm: "jpg", auto: "compress" }) {
          ...GatsbyDatoCmsSizes
        }
      }
    }
  }
`
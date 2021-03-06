/* eslint-disable jsx-a11y/anchor-has-content, jsx-a11y/anchor-is-valid*/

import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import { StaticQuery, graphql } from "gatsby";
import { HelmetDatoCms } from "gatsby-source-datocms";
import NavBar from "./navBar";
import { makeStyles } from '@material-ui/core/styles';


import "../styles/index.sass";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  container: {
    //flexGrow: 1,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
}));

const TemplateWrapper = ({ children }) => {
  const classes = useStyles();
  const [showMenu, setShowMenu] = useState(false);
  return (
    <StaticQuery
      query={graphql`
        query LayoutQuery {
          datoCmsSite {
            globalSeo {
              siteName
            }
            faviconMetaTags {
              ...GatsbyDatoCmsFaviconMetaTags
            }
          }
          datoCmsHomePage {
            seoMetaTags {
              ...GatsbyDatoCmsSeoMetaTags
            }
            introNode {
              childMarkdownRemark {
                html
              }
            }
          }
          allDatoCmsSocialProfile {
            edges {
              node {
                profileType
                url
              }
            }
          }
          allDatoCmsMusicProfile {
            edges {
              node {
                profileType
                url
              }
            }
          }
        }
      `}
      render={(data) => (
        <div className={classes.content}>
          <NavBar/>
          <div className={`container ${showMenu ? "is-open" : ""}`}>
            <HelmetDatoCms
              favicon={data.datoCmsSite.faviconMetaTags}
              seo={data.datoCmsHomePage.seoMetaTags}
            />
            <div className="container__sidebar">
              <div className="sidebar">
                <h6 className="sidebar__title">
                  <Link to="/">{data.datoCmsSite.globalSeo.siteName}</Link>
                </h6>
                <div
                  className="sidebar__intro"
                  dangerouslySetInnerHTML={{
                    __html:
                      data.datoCmsHomePage.introNode.childMarkdownRemark
                        .html,
                  }}
                />
                <nav>
                  <ul className="sidebar__menu">
                    <li>
                      <Link to="/">Home</Link>
                    </li>
                    <li>
                      <Link to="/about">About</Link>
                    </li>
                    <li>
                      <Link to="/contact">Contact</Link>
                    </li>
                  </ul>
                </nav>
                <p className="sidebar__social">
                  {data.allDatoCmsSocialProfile.edges.map(
                    ({ node: profile }) => (
                      <a
                        key={profile.profileType}
                        href={profile.url}
                        target="blank"
                        className={`social social--${profile.profileType.toLowerCase()}`}
                      >
                        {" "}
                      </a>
                    )
                  )}
                </p>
                <p className="sidebar__social">
                  {data.allDatoCmsMusicProfile.edges.map(
                    ({ node: profile }) => (
                      <a
                        key={profile.profileType}
                        href={profile.url}
                        target="blank"
                        className={`social social--${profile.profileType.toLowerCase()}`}
                      >
                        {" "}
                      </a>
                    )
                  )}
                </p>
              </div>
            </div>
            <div className="container__body">
              <div className="container__mobile-header">
                <div className="mobile-header">
                  <div className="mobile-header__menu">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setShowMenu(!showMenu);
                      }}
                    />
                  </div>
                  <div className="mobile-header__logo">
                    <Link to="/">{data.datoCmsSite.globalSeo.siteName}</Link>
                  </div>
                </div>
              </div>
              {children}
            </div>
          </div>
        </div>
      )}
    />
  );
};

TemplateWrapper.propTypes = {
  children: PropTypes.object
};

export default TemplateWrapper;
/* eslint-enable jsx-a11y/anchor-has-content, jsx-a11y/anchor-is-valid*/

import React from "react";
import "./ProfileCard.css"
import profileDivider from "../img/profile-divider.png"
import {Card, CardContent, makeStyles} from '@material-ui/core';
import {graphql, StaticQuery} from "gatsby";
import Img from "gatsby-image";

const useStyles = makeStyles(theme => ({
  vcard: {
    margin: `${theme.spacing(2)}px`,
    [theme.breakpoints.up('sm')]: {
      maxWidth: theme.breakpoints.values.sm,
      margin: `${theme.spacing(2)}px auto`,
    },
    textAlign: 'center',
    '& h1, h2': {
      fontWeight: 'bold',
      '& strong': {
        color: theme.palette.primary.main
      }
    },
    '& hr': {
      border: 'none',
      height: '1px',
      width: '100%',
      background: `url(${profileDivider}) no-repeat center center`,
      marginTop: '10px',
      marginBottom: '10px',
    }
  },
  vcardProfilePic: {
    boxSizing: 'border-box',
    margin: '0 auto',
    padding: '20px',
    verticalAlign: "middle",
    '& img': {
      border: `3px solid ${theme.palette.primary.main}`,
      borderRadius: '100%',
      maxWidth: '200px',
      width: '100%',
    },
  }
}));

export default () => (
  <StaticQuery
    query={graphql`
      query {
        profilePic: file(relativePath: { eq: "profile.jpg" }) {
          childImageSharp {
            fixed(width: 200, height: 200) {
              ...GatsbyImageSharpFixed_withWebp_noBase64
            }
          }
        }
      }
    `}
    render={({profilePic}) => {
      const classes = useStyles();
      return (
        <Card className={classes.vcard}>
          <CardContent>
            <Img fixed={profilePic.childImageSharp.fixed} alt="Profile picture of Tim" title="Profile picture of Tim" className={classes.vcardProfilePic} loading="eager" Tag="span" />
            <h1>Hi, my name is<br /><strong>Tim Ysewyn</strong></h1>
            <h2>Solutions Architect<br />VMware Tanzu</h2>
            <hr />
            <div>
              <p>Avid open source enthusiast.< br/>Spring Framework & Spring Cloud contributor.< br/>Part of NG-BE.</p>
            </div>
          </CardContent>
        </Card>
      );
    }}
  />
)

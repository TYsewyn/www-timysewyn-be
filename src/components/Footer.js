import React from 'react'
import {Container, makeStyles, Toolbar, Typography, useMediaQuery, useTheme} from '@material-ui/core'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const useStyles = makeStyles(theme => ({
  footer: {
    color: theme.palette.text.primary,
    margin: theme.spacing(0, 0),
    marginTop: 'auto',
    padding: 'unset',
    [theme.breakpoints.up('lg')]: {
      margin: `auto auto ${theme.spacing(2)}px auto`,
    },
  },
  grow: {
    flexGrow: 1,
  },
}));

export default () => {
  const classes = useStyles();
  const theme = useTheme();
  const onMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const logo = (onMobile ? ['site', 'initials'] : ['site', 'logo']);
  return (
    <Container className={classes.footer} component="footer">
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <FontAwesomeIcon icon={logo} size="5x" />
          <div className={classes.grow} />
          <Typography variant="body2">
            Copyright © Tim Ysewyn {new Date().getFullYear()}.
          </Typography>
        </Toolbar>
      </Container>
    </Container>
  )
}

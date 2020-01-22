import React from 'react'
import PropTypes from 'prop-types';
import{ FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {useDispatch, useSelector} from 'react-redux'
import {
  AppBar,
  Button,
  IconButton,
  makeStyles,
  Slide,
  Toolbar,
  useMediaQuery,
  useScrollTrigger,
  useTheme
} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  appBar: {
    marginBottom: theme.spacing(0),
    [theme.breakpoints.up('lg')]: {
      marginBottom: theme.spacing(2),
    },
  },
  appBarButton: {
    color: theme.palette.primary.contrastText,
  },
  grow: {
    flexGrow: 1,
  },
}));

function HideOnScroll(props) {
  const {children} = props;
  return (
    <Slide appear={false} direction="down" in={!useScrollTrigger()}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
};

export default () => {
  const classes = useStyles();
  const theme = useTheme();
  const onDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  const appBarVariant = (onDesktop ? 'dense' : 'regular');

  const appearance = useSelector(state => state.appearance);
  const icon = (appearance === 'light' ? ['fad', 'moon-stars'] : ['fad', 'sun']);
  const dispatch = useDispatch();
  const elevation = (onDesktop ? 1 : 0);
  return (
    <HideOnScroll>
      <AppBar className={classes.appBar} elevation={elevation} position="sticky" role="navigation">
        <Toolbar variant={appBarVariant}>
          <Button className={classes.appBarButton} href="/">Home</Button>
          <Button className={classes.appBarButton} href="/blog/">Blog</Button>
          <div className={classes.grow} />
          <IconButton
            edge="end"
            aria-label={`Activate ${(appearance === 'light' ? 'dark' : 'light')} mode`}
            aria-haspopup="true"
            onClick={() => dispatch({type: 'TOGGLE_DARK_MODE'})}
          >
            <FontAwesomeIcon icon={icon} size="1x" width="0" />
          </IconButton>
        </Toolbar>
      </AppBar>
    </HideOnScroll>
  );
}

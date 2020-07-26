import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, MenuItem, Toolbar, Badge, IconButton } from '@material-ui/core';
import { Link } from "gatsby";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));


export default function NavBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <MenuItem component={Link} to="/">Home</MenuItem>
          <MenuItem component={Link} to="/about">About</MenuItem>
          <MenuItem component={Link}  className={classes.title} to="/contact">Contact</MenuItem>
          <IconButton aria-label="show items" color="inherit">
          <Badge badgeContent={4} color="secondary">
          <ShoppingCartIcon />
          </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}
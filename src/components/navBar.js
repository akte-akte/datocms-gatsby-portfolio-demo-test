import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { AppBar, Drawer, Divider, MenuItem, Toolbar, Badge,  Hidden, IconButton, List, ListItem } from '@material-ui/core';
import { Link } from "gatsby";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

import MenuIcon from '@material-ui/icons/Menu';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  title: {
    flexGrow: 1,
  },
}));

function NavBar(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
          <ListItem component={Link} to="/">Home</ListItem>
          <ListItem component={Link} to="/about">About</ListItem>
          <ListItem component={Link}  className={classes.title} to="/contact">Contact</ListItem>
      </List>
      <Divider/>
      <IconButton aria-label="show items" color="inherit">
          <Badge badgeContent={4} color="secondary">
          <ShoppingCartIcon />
          </Badge>
      </IconButton>
    </div>
  );
  const container = window !== undefined ? () => window().document.body : undefined;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
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
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    </div>
  );
}
export default NavBar;
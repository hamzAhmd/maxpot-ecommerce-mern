import React from 'react';
import { Link, useHistory, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/userActions';
import SearchBox from './SearchBox';
import {
  AppBar,
  Toolbar,
  IconButton,
  makeStyles,
  Typography,
  Menu,
  MenuItem,
  Tooltip,
  Badge,
  Hidden,
} from '@material-ui/core';

import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PersonIcon from '@material-ui/icons/Person';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import GitHubIcon from '@material-ui/icons/GitHub';
import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: theme.spacing(3),
  },
  SportsMmaIcon: {
    marginRight: theme.spacing(1),
  },
  title: {
    flexGrow: 1,
  },

  logo: {
    maxWidth: 35,
  },
}));

const Header = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const classes = useStyles();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const LogoutHandler = () => {
    history.push(`/login`);
    dispatch(logout());

    setAnchorEl(null);
  };

  return (
    <header className={classes.root}>
      <AppBar position='sticky' style={{ background: '#1B4E59' }}>
        <Toolbar>
          <Tooltip title='Main Menu'>
            <IconButton
              component={Link}
              to='/'
              edge='start'
              className={classes.SportsMmaIcon}
              color='inherit'
            >
              <img src='/logo256.png' alt='logo' className={classes.logo} />
            </IconButton>
          </Tooltip>

          <Typography variant='h6' className={classes.title}>
            MAXPOT
          </Typography>

          <Hidden only='xs'>
            {' '}
            <Route render={({ history }) => <SearchBox history={history} />} />
          </Hidden>

          {userInfo && userInfo.isAdmin ? (
            userInfo &&
            userInfo.isAdmin && (
              <div>
                <Tooltip title='Admin'>
                  <IconButton
                    aria-controls='simple-menu'
                    aria-haspopup='true'
                    variant='contained'
                    color='inherit'
                    onClick={handleClick}
                  >
                    <ExpandMoreIcon />
                  </IconButton>
                </Tooltip>
                <Menu
                  id='username'
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem
                    component={Link}
                    to='/admin/userlist'
                    onClick={handleClose}
                  >
                    Users
                  </MenuItem>
                  <MenuItem
                    component={Link}
                    to='/admin/productlist'
                    onClick={handleClose}
                  >
                    Products
                  </MenuItem>
                  <MenuItem
                    component={Link}
                    to='/admin/orderlist'
                    onClick={handleClose}
                  >
                    Orders
                  </MenuItem>
                  <MenuItem
                    component={Link}
                    to='/profile'
                    onClick={handleClose}
                  >
                    Profile
                  </MenuItem>
                  <MenuItem
                    component={Link}
                    to='/login'
                    onClick={LogoutHandler}
                  >
                    Logout
                  </MenuItem>
                </Menu>
              </div>
            )
          ) : userInfo ? (
            <div>
              <Tooltip title='Profile'>
                <IconButton
                  aria-controls='simple-menu'
                  aria-haspopup='true'
                  variant='contained'
                  color='inherit'
                  onClick={handleClick}
                >
                  <ExpandMoreIcon />
                </IconButton>
              </Tooltip>
              <Menu
                id='username'
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem component={Link} to='/profile' onClick={handleClose}>
                  Profile
                </MenuItem>

                <MenuItem component={Link} to='/login' onClick={LogoutHandler}>
                  Logout {userInfo.name}
                </MenuItem>
              </Menu>
            </div>
          ) : (
            <Tooltip title='Sign In'>
              <IconButton
                component={Link}
                to='/login'
                variant='contained'
                color='inherit'
              >
                <PersonIcon />
              </IconButton>
            </Tooltip>
          )}

          <Tooltip title='Cart'>
            <IconButton
              component={Link}
              to='/cart'
              variant='contained'
              color='inherit'
            >
              <Badge color='secondary' badgeContent={cartItems.length}>
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Tooltip>

          <Tooltip title='Contact Us'>
            <IconButton
              component={Link}
              to='/contact'
              variant='contained'
              color='inherit'
            >
              <PermContactCalendarIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title='Repo'>
            <IconButton
              href='https://github.com/hamzAhmd/maxpot-ecommerce-mern'
              target='_blank'
              rel='noopener noreferrer'
              variant='contained'
              color='inherit'
            >
              <GitHubIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
      <Hidden only={['xl', 'lg', 'md', 'sm']}>
        {' '}
        <div
          style={{
            paddingTop: '1rem',
            display: 'flex',

            flexDirection: 'row-reverse',
          }}
        >
          <Route render={({ history }) => <SearchBox history={history} />} />
        </div>
      </Hidden>
    </header>
  );
};

export default Header;

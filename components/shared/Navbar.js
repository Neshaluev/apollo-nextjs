import React from 'react';
import { useRouter } from 'next/router';
import Link from "next/link";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';

import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

import withApollo from "@/hoc/withApollo"
import {useLazyGetUser} from "@/apollo/actions"

const useStyles = makeStyles((theme) => ({
    title: {
      flexGrow: 1,
    },
    appLinkActive: {
        height: '100%',
        padding: '15px',
        margin: 0,
        fontWeight: '600',
        color: theme.palette.primary.main,
        backgroundColor: theme.palette.primary.light,
        textDecoration: 'none',
        '&:active': {
            color: 'black'
        }
    },
    appLink: {
        height: '100%',
        padding: '10px',
        fontWeight: '600',
        margin: 0,
        color: '#F1EAF6',
        textDecoration: 'none',
        '&:active': {
            color: 'black'
        }
    },
    navToolbar: {
        height: '100%',
        minHeight: '0px',
    }
  }));

const AppLink = ({children, href, as}) => {
    const classes = useStyles();
    const router = useRouter()

    return (
      <Link href={href} as={as}>
          <a className={ router.asPath === href ? classes.appLinkActive : classes.appLink}>{children}</a>
      </Link>
    )
}


const Navbar = () => {
  const classes = useStyles();
  const [user, setUser] = React.useState(null);
  const [hasResponse, setHasResponse] = React.useState(false);
  const [getUser, {data, error}] = useLazyGetUser();

  React.useEffect(() => {
    getUser();
  }, []);

  if (data) {
    if (data.user && !user) { setUser(data.user); }
    if (!data.user && user) { setUser(null); }
    if (!hasResponse) { setHasResponse(true); }
  }

  // manager
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div >
        <AppBar position="static" color="primary">
          <Toolbar className={classes.navToolbar}>
              <IconButton color='inherit'>
                <StarBorderIcon />
                <Link href={'/'} as={'/'}>
                  <Typography>
                    FORUM ALL STARS
                  </Typography>
                </Link>
              </IconButton>
            <div className={classes.title}>
                <AppLink href="/portfolios" >Portfoilios</AppLink>
                <AppLink href="/forum/categories" >Forums</AppLink>
            </div>

            {hasResponse && <div>
              { user && (user.role === 'admin' || user.role === 'instructor') && (
                  <>
                  <Button 
                    aria-controls="simple-menu" 
                    variant="contained" 
                    color="primary" 
                    aria-haspopup="true" 
                    onClick={handleClick}
                  >
                    Open Manage 
                    <ArrowDropDownIcon />
                  </Button>
                  <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={handleClose}>
                      <Link
                          href="/portfolios/new"
                          as={`/portfolios/new`}>
                          <a style={{ textDecoration: 'none',color: '#000' }}>Create Portfolio</a>
                        </Link>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <Link
                          href="/redactor/[id]/dashboard"
                          as={`/redactor/${user._id}/dashboard`}>
                          <a style={{ textDecoration: 'none',color: '#000' }}>Management Portfolios</a>
                        </Link>
                    </MenuItem>
                  </Menu>
                </>
              )}
            </div>
            }
            { (error || !user) &&  <> <AppLink href="/login"  >Sign In</AppLink>
            <AppLink href="/register" >Sign Up</AppLink>
            </> }
            { user && <AppLink href="/logout" >Logout</AppLink> }       
          </Toolbar>
        </AppBar>
    </div>
  );
}

export default withApollo(Navbar)
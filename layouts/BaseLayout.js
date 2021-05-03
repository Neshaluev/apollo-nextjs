import { makeStyles } from '@material-ui/core';
import { ToastContainer } from 'react-toastify';

import Navbar from '@/components/shared/Navbar';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#e8e8ff',
    flexDirection: 'column',
  },
  conatiner: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center',
    maxWidth: '1200px',
    margin: '0 auto',
    marginTop: theme.spacing(3),
  },
}));

const BaseLayout = (props) => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.wrapper}>
        <Navbar />
        <div className={classes.conatiner}>{props.children}</div>
      </div>
      <ToastContainer />
    </>
  );
};

export default BaseLayout;

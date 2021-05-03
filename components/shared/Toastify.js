import React from 'react';

import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
  }));

const Toastify = () => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
  
    const handleClick = () => {
      setOpen(true);
    };
  
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };

    const tost = () => {
        setOpen(true);
        setTimeout(() => {
            setOpen(false);
        }, 3000)
    }

    React.useEffect(() => {
        tost()
    },[])
    return (
        <>
            <Button variant="outlined" onClick={handleClick}>
            Open success snackbar
            </Button>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                This is a success message!
                </Alert>
            </Snackbar>
            </>
        )
    
}

export default Toastify
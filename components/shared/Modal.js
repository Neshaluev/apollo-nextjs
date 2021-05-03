
import React from 'react'
import Modal from '@material-ui/core/Modal'
import {makeStyles} from '@material-ui/core/styles'
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'absolute',
        zIndex: 9999,
      },
      modal: {
        display: 'flex',
        padding: theme.spacing(1),
        alignItems: 'center',
        justifyContent: 'center',
      },
      paper: {
        position: 'relative',
        maxWidth: 650,
        backgroundColor: theme.palette.background.paper,
        borderRadius: '6px',
        padding: theme.spacing(2, 4, 3),
        '&:focus': {
            color: 'none',
            outline: 'none',
        }
      },
      modalTitle:{
          marginBottom: 20,
      },
      modalContent: {
          marginTop: 20,
      },
      closeButton: {
          position: 'absolute',
          right: 20,
          top: 20,
          cursor: 'pointer',
      },
      closeIcon: {
          fontSize: '28px',
      }
    })
)

function ModalWindow({ handleModal, flagModal, children, title='' }) {

    const classes = useStyles();

    const rootRef = React.useRef(null);

    console.log('window', flagModal)

    return (
        <div className={classes.root} ref={rootRef}>
            <Modal
                disablePortal
                disableEnforceFocus
                disableAutoFocus
                open={flagModal}
                aria-labelledby="server-modal-title"
                aria-describedby="server-modal-description"
                className={classes.modal}
                container={() => rootRef.current}
            >
            <div className={classes.paper}>
                <div className={classes.modalTitle}><Typography variant='h4' component='h4' >{title}</Typography></div>
                <div className={classes.closeButton} onClick={handleModal}>
                    <CloseIcon className={classes.closeIcon} />
                </div>
                <Divider />
                <div className={classes.modalContent}>
                    {children}
                </div>
            </div>
            </Modal>
        </div>
    )
}

export default ModalWindow
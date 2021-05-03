import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  wrapper: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formWrapper: {
    width: '500px',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    margin: 'auto',
    marginBottom: theme.spacing(2),
  },
  formField: {
    marginBottom: theme.spacing(2),
  },
  formFieldDate: {
    marginBottom: theme.spacing(2),
    maxWidth: '200px',
  },
  formRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    '& > button': {
      marginRight: '10px',
    },
    marginBottom: theme.spacing(2),
  },
  formComment: {
    textAlign: 'left',
    // display: 'flex',
    // justifyContent: 's'
  },
}));

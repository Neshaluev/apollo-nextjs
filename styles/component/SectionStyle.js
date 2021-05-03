import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  sectionTitle: {
    marginBottom: theme.spacing(3),
  },
  sectionTitleL: {
    marginBottom: theme.spacing(3),
    textAlign: 'left',
  },
  sectionCard: {
    minWidth: 275,
    marginBottom: theme.spacing(2),
  },
  sectionListCard: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: theme.spacing(2),
  },
  sectionCardAction: {
    justifyContent: 'flex-end',
  },
  sectionCardContent: {
    textAlign: 'left',
  },
  sectionCardField: {
    textAlign: 'left',
    marginBottom: theme.spacing(2),
    padding: 0,
  },
  sectionCardAccent: {
    textAlign: 'left',
    padding: theme.spacing(2),
    backgroundColor: '#f0f3f7',
    color: '#474747',
  },
  link: {
    textDecoration: 'none',
  },
}));

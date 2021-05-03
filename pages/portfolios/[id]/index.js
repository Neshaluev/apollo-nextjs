import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import withApollo from '@/hoc/withApollo';
import { getDataFromTree } from '@apollo/react-ssr';

import { useGetPortfolio } from '@/apollo/actions';
import { formatDate } from '@/helpers';

const useStyles = makeStyles(() => ({
  wrapper: {
    padding: 20,
    minWidth: '640px',
  },
  title: {
    padding: 20,
  },
  fieldText: {
    display: 'block',
    marginTop: 20,
    marginBottom: 20,
  },
  detailTable: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: 5,
    marginTop: 20,
    marginBottom: 20,
  },
  detailTableBox: {
    padding: 10,
    textAlign: 'left',
    '&:nth-child(odd)': {
      backgroundColor: '#f2f2f2',
      fontSize: 18,
      fontWeight: 600,
    },
    '&:nth-child(even)': {
      backgroundColor: '#fff',
      fontSize: 14,
      fontWeight: 400,
    },
  },
}));

const PortfolioDetail = ({ query }) => {
  const classes = useStyles();
  const { data } = useGetPortfolio({ variables: { id: query.id } });
  const portfolio = (data && data.portfolio) || {};

  return (
    <div className={classes.wrapper}>
      <Paper className={classes.title}>
        <Typography variant="h2" componwnt="h3" className={classes.fieldText}>
          {portfolio.title}
        </Typography>
        <Typography variant="h4" className={classes.fieldText}>
          {portfolio.jobTitle}
        </Typography>
        <a style={{ textDecoration: 'none' }} href={portfolio.companyWebsite}>
          <Button variant="contained" color="primary">
            See Company
          </Button>
        </a>
      </Paper>
      <div className={classes.detailTable}>
        <div>
          <div className={classes.detailTableBox}>Loacation</div>
          <div className={classes.detailTableBox}>{portfolio.location}</div>
        </div>
        <div>
          <div className={classes.detailTableBox}>Days</div>
          <div className={classes.detailTableBox}>
            {portfolio.daysOfExperience}
          </div>
        </div>
        <div>
          <div className={classes.detailTableBox}>Start Date</div>
          <div className={classes.detailTableBox}>
            {formatDate(portfolio.startDate)}
          </div>
        </div>
        <div>
          <div className={classes.detailTableBox}>End Date</div>
          <div className={classes.detailTableBox}>
            {(portfolio.endDate && formatDate(portfolio.endDate)) || 'Present'}
          </div>
        </div>
      </div>
      <div>
        <div variant="h5" className={classes.detailTableBox}>
          Description
        </div>
        <div className={classes.detailTableBox}>{portfolio.description}</div>
      </div>
    </div>
  );
};

PortfolioDetail.getInitialProps = async ({ query }) => {
  return { query };
};

export default withApollo(PortfolioDetail, { getDataFromTree });

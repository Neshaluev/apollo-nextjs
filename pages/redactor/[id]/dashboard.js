import React from 'react';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import { useGetUserPortfolios, useDeletePortfolio } from '@/apollo/actions';
import withApollo from '@/hoc/withApollo';
import withAuth from '@/hoc/withAuth';
import { formatDate } from '@/helpers';
import Link from 'next/link';
import { getDataFromTree } from '@apollo/react-ssr';

import { useStyles } from '@/styles/component/SectionStyle';

const Dashboard = withAuth(
  () => {
    const classes = useStyles();

    const { data } = useGetUserPortfolios();
    const [deletePortfolio] = useDeletePortfolio();
    const userPortfolios = (data && data.userPortfolios) || [];

    return (
      <>
        <section className={classes.sectionTitle}>
          <Typography variant="h2" componwnt="h3">
            Redactor Portfolios
          </Typography>
        </section>
        <section>
          {userPortfolios.map((value) => (
            <Card key={value._id} className={classes.sectionCard}>
              <Typography
                variant="h4"
                component="h4"
                className={classes.sectionCardAccent}
              >
                {value.jobTitle}
              </Typography>
              <Divider />
              <CardContent className={classes.sectionCardContent}>
                <Typography
                  variant="h5"
                  component="h5"
                  className={classes.sectionCardField}
                >
                  {value.title}
                </Typography>
                <Typography variant="caption" component="p">
                  {formatDate(value.startDate)} -{' '}
                  {(value.endDate && formatDate(value.endDate)) || 'Present'}
                </Typography>
              </CardContent>
              <CardActions>
                <Link
                  href="/portfolios/[id]/edit"
                  as={`/portfolios/${value._id}/edit`}
                >
                  <Button size="small" variant="contained" color="primary">
                    Update
                  </Button>
                </Link>
                <Button
                  onClick={() =>
                    deletePortfolio({ variables: { id: value._id } })
                  }
                  size="small"
                  variant="outlined"
                  color="secondary"
                >
                  Delete
                </Button>
              </CardActions>
            </Card>
          ))}
        </section>
      </>
    );
  },
  ['admin', 'instructor'],
  { ssr: true },
);

export default withApollo(Dashboard, { getDataFromTree });

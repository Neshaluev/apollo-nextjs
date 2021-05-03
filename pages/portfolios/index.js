import Typography from '@material-ui/core/Typography';
import withApollo from '@/hoc/withApollo';
import { getDataFromTree } from '@apollo/react-ssr';
import Link from 'next/link';

import { useStyles } from '@/styles/component/SectionStyle';
import PortfolioCard from '@/components/portfolios/PortfolioCard';
import { useGetPortfolios } from '@/apollo/actions';

const Portfolios = () => {
  const classes = useStyles();
  const { data } = useGetPortfolios();
  const portfolios = (data && data.portfolios) || [];

  return (
    <div>
      <section className={classes.sectionTitle}>
        <Typography variant="h2" componwnt="h3">
          Portfolios
        </Typography>
      </section>
      <section className={classes.sectionListCard}>
        {portfolios.map((portfolio) => (
          <Link
            key={portfolio._id}
            href="/portfolios/[id]"
            as={`/portfolios/${portfolio._id}`}
          >
            <a style={{ textDecoration: 'none' }}>
              <PortfolioCard classes={classes} portfolio={portfolio} />
            </a>
          </Link>
        ))}
      </section>
    </div>
  );
};

export default withApollo(Portfolios, { getDataFromTree });

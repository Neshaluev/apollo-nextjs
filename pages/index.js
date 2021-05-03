import withApollo from '../hoc/withApollo';
import { getDataFromTree } from '@apollo/react-ssr';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import PortfolioCard from '@/components/portfolios/PortfolioCard';
import Link from 'next/link';
import TopicLink from '@/components/forum/TopicLink';
import { useGetHighlight } from '@/apollo/actions';
import { useStyles } from '@/styles/component/SectionStyle';

const useGetInitialData = () => {
  const { data } = useGetHighlight({ variables: { limit: 3 } });
  const portfolios = (data && data.highlight.portfolios) || [];
  const topics = (data && data.highlight.topics) || [];
  return { portfolios, topics };
};

function Home() {
  const classes = useStyles();
  const { topics, portfolios } = useGetInitialData();
  return (
    <>
      <section className={classes.sectionTitle}>
        <Typography className={classes.sectionTitleL} variant="h4">
          Portfolio
        </Typography>
        <div className={classes.sectionListCard}>
          {portfolios.map((portfolio) => (
            <div key={portfolio._id} className="col-md-4">
              <Link href="/portfolios/[id]" as={`/portfolios/${portfolio._id}`}>
                <a className={classes.link}>
                  <PortfolioCard classes={classes} portfolio={portfolio} />
                </a>
              </Link>
            </div>
          ))}
        </div>
        <Link href="/portfolios">
          <Button variant="outlined" color="secondary">
            See More Portfolios
          </Button>
        </Link>
      </section>
      <section className={classes.sectionTitle}>
        <Typography variant="h4" className={classes.sectionTitleL}>
          Topics
        </Typography>
        <div>
          {topics.map((topic) => (
            <TopicLink key={topic._id} topic={topic} classes={classes} />
          ))}
        </div>
        <Link href="/forum/categories">
          <Button variant="outlined" color="secondary">
            See More Topics
          </Button>
        </Link>
      </section>
    </>
  );
}

export default withApollo(Home, { getDataFromTree });

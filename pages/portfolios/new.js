import Alert from '@material-ui/lab/Alert';
import { useRouter } from 'next/router';
import { useCreatePortfolios } from '@/apollo/actions';
import withApollo from '@/hoc/withApollo';
import PortfolioForm from '@/components/forms/PortfolioForm';
import { errorMessage } from '@/helpers';

const PortfolioNew = () => {
  const [createPortfolio, { error }] = useCreatePortfolios();
  const router = useRouter();

  const handleCreatePortfolio = async (data) => {
    await createPortfolio({ variables: data }).then(() => {
      router.push('/portfolios');
    });
  };

  return (
    <>
      <PortfolioForm onSubmit={handleCreatePortfolio} />
      {error && (
        <Alert variant="filled" severity="error">
          {errorMessage(error)}
        </Alert>
      )}
    </>
  );
};

export default withApollo(PortfolioNew);

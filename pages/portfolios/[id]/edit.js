import { useRouter } from 'next/router';
import Alert from '@material-ui/lab/Alert';
import PortfolioForm from '@/components/forms/PortfolioForm';
import { useUpdatePortfolio, useGetPortfolio } from '@/apollo/actions';
import { errorMessage } from '@/helpers';
import withApollo from '@/hoc/withApollo';
import { toast } from 'react-toastify';

const PortfolioEdit = () => {
  const router = useRouter();
  const [updatePortfolio, { error }] = useUpdatePortfolio();
  const id = router.query.id;
  const { data } = useGetPortfolio({ variables: { id } });

  const handleUpdatePortfolio = async (data) => {
    await updatePortfolio({ variables: { id, ...data } });
    toast.success('Portfolio has been updated!', { autoClose: 2000 });
  };

  return (
    <>
      {data && (
        <PortfolioForm
          initialData={data.portfolio}
          onSubmit={handleUpdatePortfolio}
        />
      )}
      {error && (
        <Alert variant="filled" severity="error">
          {errorMessage(error)}
        </Alert>
      )}
    </>
  );
};

export default withApollo(PortfolioEdit);

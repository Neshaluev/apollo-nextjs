import Alert from '@material-ui/lab/Alert';
import { useSignIn } from '@/apollo/actions';
import LoginForm from '@/components/forms/LoginForm';
import Redirect from '@/components/shared/Redirect';
import withApollo from '@/hoc/withApollo';
import { errorMessage } from '@/helpers';

const login = () => {
    const [signIn, { data, loading, error }] = useSignIn();

    const handleFormLogin = (signInData) => {
        signIn({ variables: signInData });
    };

    return (
        <>
            <LoginForm loading={loading} handleFormLogin={handleFormLogin} />
            {data && data.signIn && <Redirect to="/" />}
            {error && (
                <Alert variant="filled" severity="error">
                    {errorMessage(error)}
                </Alert>
            )}
        </>
    );
};

export default withApollo(login);

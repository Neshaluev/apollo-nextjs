import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import Alert from '@material-ui/lab/Alert';
import { errorMessage } from '@/helpers';

import Redirect from '@/components/shared/Redirect';
import RegisterForm from '@/components/forms/RegisterForm';
import withApollo from '../hoc/withApollo';
import { SIGN_UP } from '../apollo/queries';

const register = () => {
  const [signUpUser, { data, error }] = useMutation(SIGN_UP);

  const handleRegisterForm = async (formData) => {
    console.log('formData', formData);
    await signUpUser({ variables: formData });
  };

  return (
    <>
      <RegisterForm handleRegisterForm={handleRegisterForm} />
      {data && data.signUp && (
        <Redirect to="/login" query={{ message: 'LOGGED_IN' }} />
      )}
      {error && (
        <Alert variant="filled" severity="error">
          {errorMessage(error)}
        </Alert>
      )}
    </>
  );
};

export default withApollo(register);

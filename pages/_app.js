import React from 'react';
import { ThemeProvider } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../styles/theme';
import BaseLayout from '../layouts/BaseLayout';
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }) {
  React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BaseLayout>
          <Component {...pageProps} />
        </BaseLayout>
      </ThemeProvider>
    </>
  );
}

export default MyApp;

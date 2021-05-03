import { createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
import {red} from '@material-ui/core/colors';

const theme = createMuiTheme({
    typography: {
        fontFamily: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
        ]
      },
    palette: {
      primary: {
        main: '#230E36',
        dark: '#6c2da6',
        light: '#F1EAF6',
        constrastText: '#000'
      },
      secondary: {
        light: '#eb4934',
        main: '#230E36',
        dark: '#a23dff',
        contrastText: '#000',
      },
      error: {
          main: red.A400,
      },
      background: {
          default: '#fff'
      },
    },
    shadows: [],
    overrides: {
        MuiButton: {
            root: {
                borderRadius: 5,
                textTransform: 'none',
                fontSize: 16,
                height: 40,
                padding: 10,
                margin: 0,
            },
            textPrimary: {
                paddingLeft: 20,
                paddingRight: 20,
            },
            textSecondary: {
                paddingLeft: 20,
                paddingRight: 20,
            },
            outlinedPrimary: {
                // backgroundColor: 'rgb(29,161,243)',
                borderColor: '#230E36'
            },
            outlinedSecondary: {
                borderColor: '#6c2da6'
            }
        },
        MuiFilledInput: {
            '&:after': {
                borderBottomWidth: '2px',
            },
            '&:before': {
                borderColor: '#000'
            },
            input: {
                backgroundColor: 'rgb(245, 248, 250)'
            },
        },
        MuiDialog: {
            paper: {
                borderRadius: 15
            }
        },
        MuiDialogActions: {
            root: {
                marginBottom: 8,
            }
        },
        MuiDialogTitle: {
            root: {
                borderBottom: '1px solid rgb(204, 0, 0)',
                marginBottom: 10,
                padding: '10px 15px',
                '& h2': {
                    display: 'flex',
                    alignItems: 'center',
                    fontWeight: 800,
                },
                '& button': {
                    padding: 8,
                    marginRight: 20,
                }
            }
        }
    },

  });

  export default theme
import { createTheme } from '@mui/material/styles';
import { teal, grey } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: teal[900],
    },
    secondary: {
      main: grey[900],
    },
  },
  typography: {
    fontFamily: "'Quicksand', Verdana, sans-serif",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
  },
});

export default theme; 
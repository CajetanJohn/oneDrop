import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

function SliverAppBar() {
  return (
    <ThemeProvider theme={theme}>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Your App Name
          </Typography>
          {/* Add any additional components or buttons here */}
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}

export default SliverAppBar;

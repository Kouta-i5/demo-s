import Box from '@mui/material/Box';
import React from 'react';

export default function MobileFrame({ children }) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: (t) => t.palette.background.default,
        minHeight: '100dvh',
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 390,
          minHeight: '100dvh',
          bgcolor: 'background.paper',
          boxShadow: { sm: 0, md: 3 },
          borderRadius: { sm: 0, md: 2 },
          mx: 'auto',
        }}
      >
        {children}
      </Box>
    </Box>
  );
}



import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import React from 'react';

export default function Call() {
  return (
    <Box p={2} sx={{ minHeight: 'calc(100dvh - var(--footer-height))', overflow: 'hidden' }}>
      <Typography variant="h5">呼ぶ 画面（スクロール無し）</Typography>
    </Box>
  );
}



import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import NearMeIcon from '@mui/icons-material/NearMe';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Call() {
  const navigate = useNavigate();
  return (
    <Box p={2} sx={{ minHeight: 'calc(100dvh - var(--footer-height))', overflow: 'hidden', position: 'relative' }}>
      <Typography variant="h5">呼ぶ 画面（スクロール無し）</Typography>

      <Box sx={{ position: 'absolute', right: 16, bottom: 16, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Fab color="default" size="medium" aria-label="my-location">
          <NearMeIcon />
        </Fab>
        <Fab color="default" size="medium" aria-label="search">
          <SearchIcon />
        </Fab>
        <Fab color="success" size="medium" aria-label="ai-recommend" onClick={() => navigate('/ai')}>
          <AutoAwesomeIcon />
        </Fab>
      </Box>
    </Box>
  );
}



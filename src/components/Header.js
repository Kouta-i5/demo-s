import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const titleMap = [
  { match: /^\/call(\/|$)?/, title: '呼ぶ' },
  { match: /^\/ai(\/|$)?/, title: 'AIレコメンド' },
  { match: /^\/reservecomfirm(\/|$)?/, title: '予約管理' },
  { match: /^\/reservehistory(\/|$)?/, title: '履歴予約' },
  { match: /^\/menu(\/|$)?/, title: 'メニュー' },
];

export default function Header() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const current = titleMap.find((t) => t.match.test(pathname))?.title || '';
  const isAi = /^\/ai(\/|$)?/.test(pathname);
  return (
    <AppBar position="fixed" color="inherit" elevation={3} sx={{ borderBottom: 0 }}>
      <Toolbar sx={{ display: 'flex', alignItems: 'center' }}>
        {isAi ? (
          <IconButton edge="start" onClick={() => navigate('/call')} aria-label="back" sx={{ mr: 1 }}>
            <ChevronLeftIcon />
          </IconButton>
        ) : (
          <Box sx={{ width: 48, mr: 1 }} />
        )}
        <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center' }}>{current}</Typography>
        <Box sx={{ width: 48, mr: 1 }} />
      </Toolbar>
    </AppBar>
  );
}



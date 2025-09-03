import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useLocation } from 'react-router-dom';

const titleMap = [
  { match: /^\/call(\/|$)?/, title: '呼ぶ' },
  { match: /^\/ai(\/|$)?/, title: 'AIレコメンド' },
  { match: /^\/reservecomfirm(\/|$)?/, title: '予約管理' },
  { match: /^\/reservehistory(\/|$)?/, title: '履歴予約' },
  { match: /^\/menu(\/|$)?/, title: 'メニュー' },
];

export default function Header() {
  const { pathname } = useLocation();
  const current = titleMap.find((t) => t.match.test(pathname))?.title || '';
  return (
    <AppBar position="fixed" color="inherit" elevation={0} sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>{current}</Typography>
      </Toolbar>
    </AppBar>
  );
}



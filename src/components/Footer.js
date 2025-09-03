import AirportShuttleOutlinedIcon from '@mui/icons-material/AirportShuttleOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const tabs = [
  { label: '呼ぶ', value: '/call', icon: <AirportShuttleOutlinedIcon /> },
  { label: '予約管理', value: '/reservecomfirm', icon: <CalendarMonthOutlinedIcon /> },
  { label: '履歴予約', value: '/reservehistory', icon: <HistoryOutlinedIcon /> },
  { label: 'メニュー', value: '/menu', icon: <MenuOutlinedIcon /> },
];

export default function Footer() {
  const location = useLocation();
  const navigate = useNavigate();
  const current = tabs.find((t) => location.pathname.startsWith(t.value))?.value || '/a';

  return (
    <Paper
      elevation={3}
      sx={{
        position: 'fixed',
        left: 0,
        right: 0,
        bottom: 0,
        borderTopLeftRadius: { xs: 2, md: 3 },
        borderTopRightRadius: { xs: 2, md: 3 },
        pb: 'env(safe-area-inset-bottom)',
      }}
    >
      <BottomNavigation
        value={current}
        onChange={(e, value) => navigate(value)}
        showLabels
        sx={{
          '& .MuiBottomNavigationAction-root': {
            color: 'text.secondary',
          },
          '& .Mui-selected': {
            color: 'success.main',
          },
          '& .Mui-selected .MuiSvgIcon-root': {
            color: 'success.main',
          },
        }}
      >
        {tabs.map((t) => (
          <BottomNavigationAction key={t.value} label={t.label} value={t.value} icon={t.icon} />
        ))}
      </BottomNavigation>
    </Paper>
  );
}



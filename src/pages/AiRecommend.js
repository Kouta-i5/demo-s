import AttractionsIcon from '@mui/icons-material/Attractions';
import PaidIcon from '@mui/icons-material/Paid';
import PersonIcon from '@mui/icons-material/Person';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import ScheduleIcon from '@mui/icons-material/Schedule';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const cuisineOptions = ['和食', '寿司', 'ラーメン', '焼肉', '居酒屋', 'カフェ', 'おまかせ'];

export default function AiRecommend() {
  const navigate = useNavigate();
  const [numPeople, setNumPeople] = useState(2);
  const [category, setCategory] = useState('sightseeing'); // 'dining' | 'leisure' | 'sightseeing'
  const [budgetRange, setBudgetRange] = useState([1000, 5000]); // [min,max] JPY per person
  const [cuisines, setCuisines] = useState(['おまかせ']);
  const [note, setNote] = useState('');

  const peoplePresets = [1, 2, 3, 4, 5];
  // distance/openNow/randomness は撤去

  const formatYen = (v) => `¥${v.toLocaleString()}`;

  const toggleCuisine = (label) => {
    setCuisines((prev) => {
      const exists = prev.includes(label);
      if (exists) {
        const next = prev.filter((x) => x !== label);
        return next.length === 0 ? ['おまかせ'] : next;
      }
      const base = prev.filter((x) => x !== 'おまかせ');
      return [...base, label];
    });
  };

  const submit = async () => {
    const query = { numPeople, category, budgetRange, cuisines, note };
    // 保存（結果画面で参照できるように）
    try { localStorage.setItem('ai-recommend-query', JSON.stringify(query)); } catch (_) {}

    // axiosでAPI呼び出し（8秒タイムアウト）
    try {
      const res = await axios.post(
        'https://m19fp220pc.execute-api.ap-southeast-2.amazonaws.com/dev',
        query,
        { timeout: 8000, headers: { 'Content-Type': 'application/json' } }
      );
      // eslint-disable-next-line no-console
      console.log('recommend API response:', res.data);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('recommend API error:', error);
    }

    navigate('/ai/result');
  };

  // 再抽選ロジックは現状未使用

  return (
    <Box p={2}>
      <Card elevation={3} sx={{ bgcolor: 'background.default' }}>
        <CardHeader title="AIレコメンド" subheader="条件を選んで提案を受ける" />
        <CardContent>
      <Stack spacing={2}>
        <Box>
          <Typography variant="subtitle2" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <PersonIcon fontSize="small" /> 人数
          </Typography>
          <Stack direction="row" spacing={1}>
            {peoplePresets.map((n) => (
              <Chip
                key={n}
                label={n === 5 ? '5+' : `${n}`}
                color={numPeople === n ? 'success' : 'default'}
                variant={numPeople === n ? 'filled' : 'outlined'}
                onClick={() => setNumPeople(n)}
              />
            ))}
          </Stack>
        </Box>

        <Divider />

        <Box>
          <Typography variant="subtitle2" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            {category === 'dining' ? <RestaurantIcon fontSize="small" /> : <AttractionsIcon fontSize="small" />}
            施設形態
          </Typography>
          <ToggleButtonGroup
            color="success"
            value={category}
            exclusive
            onChange={(e, v) => v && setCategory(v)}
            size="small"
          >
            <ToggleButton value="sightseeing">観光</ToggleButton>
            <ToggleButton value="leisure">レジャー</ToggleButton>
            <ToggleButton value="dining">ご飯</ToggleButton>
          </ToggleButtonGroup>
        </Box>
        {category === 'dining' && (
          <Box>
            <Typography variant="subtitle2" gutterBottom>ジャンル</Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              {cuisineOptions.map((c) => {
                const selected = cuisines.includes(c);
                return (
                  <Chip
                    key={c}
                    label={c}
                    color={selected ? 'success' : 'default'}
                    variant={selected ? 'filled' : 'outlined'}
                    onClick={() => toggleCuisine(c)}
                    sx={{ mb: 1 }}
                  />
                );
              })}
            </Stack>
          </Box>
        )}

        <Divider />

        <Box>
          <Typography variant="subtitle2" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <PaidIcon fontSize="small" /> 予算 / 人
          </Typography>
          <Box sx={{ px: 1 }}>
            <Slider
              value={budgetRange}
              onChange={(e, v) => Array.isArray(v) && setBudgetRange(v)}
              min={500}
              max={20000}
              step={500}
              valueLabelDisplay="auto"
              valueLabelFormat={(v) => formatYen(v)}
              marks={[{ value: 1000, label: '¥1k' }, { value: 3000, label: '¥3k' }, { value: 5000, label: '¥5k' }, { value: 10000, label: '¥10k' }, { value: 20000, label: '¥20k' }]}
              color="success"
            />
          </Box>
          <Typography variant="caption" color="text.secondary">
            {`${formatYen(budgetRange[0])} 〜 ${formatYen(budgetRange[1])}`}
          </Typography>
        </Box>

        <Divider />

        <Box>
          <Typography variant="subtitle2" gutterBottom>要望（自由入力）</Typography>
          <TextField
            fullWidth
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="例: 写真映えする場所、屋内が良い、海鮮が食べたい 等"
            multiline
            minRows={2}
            maxRows={4}
          />
        </Box>


        <Grid container spacing={1} sx={{ mt: 1 }} justifyContent="center">
          <Grid item xs="auto">
            <Button
              variant="contained"
              color="success"
              startIcon={<ScheduleIcon />}
              onClick={submit}
              sx={{ borderRadius: '12px', px: 3 }}
            >
              提案を受ける
            </Button>
          </Grid>
        </Grid>
      </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}


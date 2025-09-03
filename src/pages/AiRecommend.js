import AttractionsIcon from '@mui/icons-material/Attractions';
import PaidIcon from '@mui/icons-material/Paid';
import PersonIcon from '@mui/icons-material/Person';
import PlaceIcon from '@mui/icons-material/Place';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import ScheduleIcon from '@mui/icons-material/Schedule';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';

const cuisineOptions = ['和食', '寿司', 'ラーメン', '焼肉', '居酒屋', 'カフェ', 'おまかせ'];

export default function AiRecommend() {
  const [numPeople, setNumPeople] = useState(2);
  const [category, setCategory] = useState('dining'); // 'dining' | 'leisure'
  const [budget, setBudget] = useState(3000); // JPY per person preset
  const [distance, setDistance] = useState(3); // km preset
  const [openNow, setOpenNow] = useState(true);
  const [cuisines, setCuisines] = useState(['おまかせ']);
  const [randomness, setRandomness] = useState('balance'); // 'recommend' | 'balance' | 'surprise'

  const peoplePresets = [1, 2, 3, 4, 5];
  const budgetPresets = [1000, 3000, 5000, 8000, 10000];
  const distancePresets = [0.5, 1, 3, 5];

  const formatBudget = (v) => (v >= 10000 ? '¥10k+' : `¥${v / 1000}k`);

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

  const submit = () => {
    // v0: ひとまず値をログに出す（将来API呼び出しに置換）
    // eslint-disable-next-line no-console
    console.log({ numPeople, category, budget, distance, openNow, cuisines, randomness });
  };

  const reshuffle = () => {
    // v0: ランダム度に応じた再抽選のフック（今はログのみ）
    // eslint-disable-next-line no-console
    console.log('reshuffle', { randomness });
  };

  return (
    <Box p={2}>
      <Card elevation={0} sx={{ bgcolor: 'background.default' }}>
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
            <ToggleButton value="dining">ご飯</ToggleButton>
            <ToggleButton value="leisure">レジャー</ToggleButton>
          </ToggleButtonGroup>
        </Box>

        <Box>
          <Typography variant="subtitle2" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <PaidIcon fontSize="small" /> 予算 / 人
          </Typography>
          <Stack direction="row" spacing={1}>
            {budgetPresets.map((b) => (
              <Chip
                key={b}
                label={formatBudget(b)}
                color={budget === b ? 'success' : 'default'}
                variant={budget === b ? 'filled' : 'outlined'}
                onClick={() => setBudget(b)}
              />
            ))}
          </Stack>
        </Box>

        <Box>
          <Typography variant="subtitle2" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <PlaceIcon fontSize="small" /> 距離上限
          </Typography>
          <Stack direction="row" spacing={1}>
            {distancePresets.map((d) => (
              <Chip
                key={d}
                label={`${d}km`}
                color={distance === d ? 'success' : 'default'}
                variant={distance === d ? 'filled' : 'outlined'}
                onClick={() => setDistance(d)}
              />
            ))}
          </Stack>
        </Box>

        <FormControlLabel
          control={<Switch checked={openNow} onChange={(e) => setOpenNow(e.target.checked)} color="success" />}
          label="今営業中のみ"
        />

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

        <Box>
          <Typography variant="subtitle2" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <ShuffleIcon fontSize="small" /> ランダム度
          </Typography>
          <ToggleButtonGroup
            color="success"
            value={randomness}
            exclusive
            onChange={(e, v) => v && setRandomness(v)}
            size="small"
          >
            <ToggleButton value="recommend">おすすめ</ToggleButton>
            <ToggleButton value="balance">バランス</ToggleButton>
            <ToggleButton value="surprise">サプライズ</ToggleButton>
          </ToggleButtonGroup>
        </Box>

        <Grid container spacing={1} sx={{ mt: 1 }}>
          <Grid item xs={8}>
            <Button fullWidth variant="contained" color="success" startIcon={<ScheduleIcon />} onClick={submit}>提案を受ける</Button>
          </Grid>
          <Grid item xs={4}>
            <Button fullWidth variant="outlined" startIcon={<ShuffleIcon />} onClick={reshuffle}>再抽選</Button>
          </Grid>
        </Grid>
      </Stack>
        </CardContent>
      </Card>
      <Paper variant="outlined" sx={{ mt: 2, p: 1.5, color: 'text.secondary' }}>
        <Typography variant="caption">
          入力した条件をもとに、近場・評価・価格帯を考慮した候補からランダム度に応じて提案します。
        </Typography>
      </Paper>
    </Box>
  );
}


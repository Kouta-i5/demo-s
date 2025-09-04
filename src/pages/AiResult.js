import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import useEmblaCarousel from 'embla-carousel-react';
import React, { useCallback, useEffect, useState } from 'react';
import shops from '../data/shops.json';

export default function AiResult() {
  const [items, setItems] = useState([]);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: 'start', dragFree: false });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    const top = shops.slice(0, 4).map((s, idx) => ({
      shop: s,
      nearestSpot: shops.find((t) => t.usage === 'sightseeing') || null,
      rank: idx + 1,
    }));
    setItems(top);
  }, []);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  const contentHeight = '100%';

  return (
    <Box sx={{ position: 'relative', height: 'calc(844px - var(--footer-height) - 64px)', overflow: 'hidden', px: 2, pt: 0, pb: 0 }}>
      {/* <IconButton aria-label="prev" onClick={() => emblaApi && emblaApi.scrollPrev()} disabled={!canPrev}
            sx={{ position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)', bgcolor: 'background.paper', boxShadow: 1 }}>
            <ChevronLeftIcon />
      </IconButton>
      <IconButton aria-label="next" onClick={() => emblaApi && emblaApi.scrollNext()} disabled={!canNext}
            sx={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', bgcolor: 'background.paper', boxShadow: 1 }}>
            <ChevronRightIcon />
    </IconButton> */}
      <Box ref={emblaRef} sx={{ overflow: 'hidden', height: '100%' }}>
        <Box sx={{ display: 'flex', gap: 0 }}>
          {items.map(({ shop, nearestSpot, rank }) => (
            <Card key={shop.id} sx={{ flex: '0 0 100%', height: contentHeight, display: 'flex' }}>
              <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%' }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                  <Typography variant="subtitle1">{rank}. {shop.name}</Typography>
                  {shop.coupon && <Chip size="small" color="success" label="クーポン" />}
                </Box>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {shop.description}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  用途: {shop.usage} {shop.category ? ` / ${shop.category}` : ''} ・ 予算: {shop.budget ? `¥${shop.budget.toLocaleString()}` : '—'}
                </Typography>
                {nearestSpot && (
                  <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                    最寄スポット: {nearestSpot.name}
                  </Typography>
                )}
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
      {/* dots */}
      <Box sx={{ position: 'absolute', bottom: 10, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 1 }}>
        {items.map((_, i) => (
          <Box
            key={i}
            onClick={() => emblaApi && emblaApi.scrollTo(i)}
            sx={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              bgcolor: i === selectedIndex ? 'success.main' : 'grey.400',
              opacity: i === selectedIndex ? 1 : 0.6,
              cursor: 'pointer',
            }}
          />
        ))}
      </Box>
      {items.length === 0 && (
        <Typography variant="body2" color="text.secondary">該当する結果が見つかりませんでした。</Typography>
      )}
    </Box>
  );
}



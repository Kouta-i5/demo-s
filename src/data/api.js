import shops from './shops.json';

// Mock: クエリを受け取り、usage/cuisine/予算帯でフィルタして返す
export function fetchRecommendedShops(query) {
  const { category, budgetRange = [0, Infinity], cuisines = [] } = query || {};
  const [minBudget, maxBudget] = budgetRange;

  const filtered = shops.filter((s) => {
    if (category && s.usage && s.usage !== category) return false;
    if (typeof s.budget === 'number' && (s.budget < minBudget || s.budget > maxBudget)) return false;
    if (category === 'dining' && cuisines.length > 0 && s.category && !cuisines.includes('おまかせ')) {
      if (!cuisines.includes(s.category)) return false;
    }
    return true;
  });

  // スポットに最も近い的な情報は仮で同一配列の別要素を関連付け
  const withNearest = filtered.map((s, idx) => ({
    shop: s,
    nearestSpot: shops.find((t) => t.usage === 'sightseeing') || null,
    rank: idx + 1,
  }));

  return Promise.resolve(withNearest);
}



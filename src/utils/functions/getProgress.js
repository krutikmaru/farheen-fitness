export const getProgress = (value, target) => {
  if (value === 0 && target === 0) {
    return 0;
  }
  const progress = (value / target) * 100;
  return Math.min(100, Math.round(progress));
};

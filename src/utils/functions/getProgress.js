export const getProgress = (value, target) => {
  const progress = (value / target) * 100;
  return Math.min(100, Math.round(progress));
};

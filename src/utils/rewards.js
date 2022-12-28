export const formatReward = (reward) => `${Math.floor(reward / 100)} pts.`;

export const calculateRewards = (amountSpent) => {
  if (amountSpent <= 5000) {
    return 0;
  }
  if (amountSpent <= 10000) {
    return amountSpent - 5000;
  }
  if (amountSpent > 10000) {
    return 5000 + (amountSpent - 10000) * 2;
  }
};

import { calculateRewards, formatReward } from "./rewards";

it("should calculate rewards from amount spent", () => {
  const amount = 12000;
  expect(calculateRewards(amount)).toEqual(9000);
});

it("should format reward points", () => {
  const amount = 500;
  const expectedResult = "5 pts.";
  expect(formatReward(amount)).toEqual(expectedResult);
});

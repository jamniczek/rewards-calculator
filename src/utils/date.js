import { getMonth } from "date-fns";

export const dateFormatter = new Intl.DateTimeFormat("en", { month: "long" });

export const isMonthsAgo = (date, numberOfMonths) => {
  const targetDate = getMonth(Date.now()) - numberOfMonths;
  return targetDate === getMonth(date);
};

import { useEffect, useMemo } from "react";
import { useCallback, useState } from "react";
import { isThisMonth } from "date-fns";
import { uniqBy } from "lodash";
import { isMonthsAgo } from "../utils/date";
import { calculateRewards } from "../utils/rewards";
import { OrdersList } from "../components/OrdersList";
import { useFetch } from "../hooks/useFetch";
import Spinner from "../components/Spinner";

export const OrdersSummary = () => {
  const { data, error, loading } = useFetch();
  const [dataToDisplay, setDataToDisplay] = useState([]);

  const userOrdersDataTemplate = useMemo(
    () => ({ userId: "", thisMonth: 0, previousMonth: 0, twoMonthsAgo: 0, total: 0 }),
    []
  );

  const getOrdersData = useCallback(() => {
    const uniqueUserIds = uniqBy(data, "userId").map(({ userId }) => userId);
    const orders = uniqueUserIds.map((id) => {
      return data.reduce((acc, curr) => {
        if (curr.userId === id) {
          acc.userId = id;
          if (isThisMonth(curr.date)) {
            return {
              ...acc,
              thisMonth: (acc.thisMonth += calculateRewards(curr.price)),
              total: (acc.total += calculateRewards(curr.price)),
            };
          }
          if (isMonthsAgo(curr.date, 1)) {
            return {
              ...acc,
              previousMonth: (acc.previousMonth += calculateRewards(curr.price)),
              total: (acc.total += calculateRewards(curr.price)),
            };
          }
          if (isMonthsAgo(curr.date, 2)) {
            return {
              ...acc,
              twoMonthsAgo: (acc.twoMonthsAgo += calculateRewards(curr.price)),
              total: (acc.total += calculateRewards(curr.price)),
            };
          }
        }
        return acc;
      }, userOrdersDataTemplate);
    });

    setDataToDisplay(orders);
  }, [data, userOrdersDataTemplate]);

  useEffect(() => {
    getOrdersData();
  }, [data, setDataToDisplay, getOrdersData]);

  if (error) {
    return <h3>Something went wrong.</h3>;
  }

  return loading ? <Spinner /> : <OrdersList data={dataToDisplay} />;
};

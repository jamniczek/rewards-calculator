import { subMonths } from "date-fns";
import { dateFormatter } from "../utils/date";
import { formatReward } from "../utils/rewards";

export const OrdersList = (props) => {
  const { data } = props;
  const currentMonth = dateFormatter.format(new Date());
  return (
    <table className="orders-table">
      <thead>
        <tr>
          <th className="orders-table_header-cell">User ID</th>
          <th className="orders-table_header-cell">{currentMonth}</th>
          <th className="orders-table_header-cell">{dateFormatter.format(subMonths(Date.now(), 1))}</th>
          <th className="orders-table_header-cell">{dateFormatter.format(subMonths(Date.now(), 2))}</th>
          <th className="orders-table_header-cell">Total (3m)</th>
        </tr>
      </thead>

      <tbody>
        {data.map(({ userId, thisMonth, previousMonth, twoMonthsAgo, total }, i) => {
          return (
            <tr key={`${userId}-${i}`}>
              <td className="orders-table_cell">{userId}</td>
              <td className="orders-table_cell">{formatReward(thisMonth)}</td>
              <td className="orders-table_cell">{formatReward(previousMonth)}</td>
              <td className="orders-table_cell">{formatReward(twoMonthsAgo)}</td>
              <td className="orders-table_cell">{formatReward(total)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

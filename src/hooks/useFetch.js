import { useState, useEffect } from "react";

const mockedRequest = () => {
  const orders = [
    { userId: "user1", price: 12000, date: new Date("12-02-2022") },
    { userId: "user1", price: 1900, date: new Date("12-05-2022") },

    { userId: "user1", price: 13000, date: new Date("11-05-2022") },
    { userId: "user1", price: 5900, date: new Date("11-30-2022") },

    { userId: "user1", price: 12000, date: new Date("10-30-2022") },
    { userId: "user1", price: 1600, date: new Date("10-14-2022") },

    { userId: "user1", price: 7100, date: new Date("07-23-2022") },
    { userId: "user1", price: 400, date: new Date("01-19-2022") },

    { userId: "user2", price: 29995, date: new Date("12-17-2022") },
    { userId: "user2", price: 2395, date: new Date("12-12-2022") },

    { userId: "user2", price: 33230, date: new Date("05-08-2022") },
    { userId: "user2", price: 19895, date: new Date("06-02-2022") },

    { userId: "user2", price: 5000, date: new Date("10-28-2022") },
    { userId: "user2", price: 25000, date: new Date("10-09-2022") },

    { userId: "user2", price: 7000, date: new Date("07-11-2022") },
    { userId: "user2", price: 9995, date: new Date("05-04-2022") },
  ];
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(orders);
    }, 1000);
  });
};

export const useFetch = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await mockedRequest();
        setData(response);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { data, error, loading };
};

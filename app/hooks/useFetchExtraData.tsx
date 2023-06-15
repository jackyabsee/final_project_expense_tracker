// import { useEffect, useState } from "react";
// import { RAPID_API_KEY } from "../env";
// import axios from "axios";
// import { getExtraData } from "../api/api";
// import { ExtraData } from "../api/types";

// export const useFetchExtraData = () => {
//   const [data, setData] = useState<ExtraData | null>(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState<any | null>(null);
//   const [date, setDate] = useState(new Date());
//   // const options = {
//   //   method: "GET",
//   //   url: "https://mboum-finance.p.rapidapi.com/ne/news",
//   //   headers: {
//   //     //if can't fetch the data update env.ts use RAPID_API_KEY by your own key
//   //     "X-RapidAPI-Key": "1ed61a8e3fmsh89b0d9433d9db1fp1812fbjsne2ebdb9ba908",
//   //     // "X-RapidAPI-Key": RAPID_API_KEY,
//   //     "X-RapidAPI-Host": "mboum-finance.p.rapidapi.com",
//   //   },
//   // };

//   // const fetchData = async () => {
//   //   setIsLoading(true);
//   //   try {
//   //     // const res = await axios.request(options);
//   //     const res = await getExtraData();
//   //     if(!res.items) return;
//   //     setData(res.items);
//   //     setIsLoading(false);
//   //   } catch (error) {
//   //     setError(error);
//   //     alert(error);
//   //   } finally {
//   //     setIsLoading(false);
//   //   }
//   // };

//   // useEffect(() => {
//   //   fetchData();
//   // }, []);

//   // const refetch = () => {
//   //   setIsLoading(true);
//   //   fetchData();
//   // };

//   return { data, isLoading, error };
// };

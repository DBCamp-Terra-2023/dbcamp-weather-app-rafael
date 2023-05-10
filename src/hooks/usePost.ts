import {useEffect, useState} from "react";
import axios, {AxiosRequestConfig} from "axios";

const api = axios.create({
  baseURL: 'http://localhost:4767/api/v1/weather',
});

export function usePost<T = unknown>(
  url: string,
  data: any,
  options?: AxiosRequestConfig
) {
  const [responseData, setResponseData] = useState<T | null>(null);
  const [isPosting, setIsPosting] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setIsPosting(true);
    api.post(url, data, options)
      .then(response => {
        setResponseData(response.data);
      })
      .catch(error => {
        setError(error);
      })
      .finally(() => {
        setIsPosting(false);
      });
  }, [data]);

  return {responseData, error, isPosting};
}
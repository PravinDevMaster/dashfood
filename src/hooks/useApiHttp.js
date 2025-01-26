import { useState, useCallback } from "react";

const useApiHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const AdminbearerToken = localStorage.getItem("authToken");
  const sendRequest = useCallback(
    async (requestConfig, onSuccess = () => {}, onError = () => {}) => {
      setIsLoading(true);
      setSuccess(null);
      setError(null);
      let data;
      try {
        const response = await fetch(requestConfig.url, {
          method: requestConfig.method ? requestConfig.method : "GET",

          body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
        });

        data = await response.json();

        if (response?.status === 200 || response?.status === 201) {
          setSuccess(data?.message);
        }
        if (response?.status !== 200 && response?.status !== 201) {
          throw new Error(data?.message);
        }

        onSuccess(data);
      } catch (err) {
        setError(err.message || "Something went wrong!");
        onError(err, data);
      }
      setIsLoading(false);
    },
    [AdminbearerToken]
  );

  return {
    isLoading,
    success,
    error,
    sendRequest,
  };
};

export default useApiHttp;

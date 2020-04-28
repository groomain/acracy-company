import { useEffect, useState, useCallback } from 'react';
import { API } from 'aws-amplify';
import { config } from '../conf/amplify';

const availableMethods = ['get', 'post', 'put', 'del', 'patch', 'head'];

const useApi = (route, method, body) => {
  const [loading, setLoading] = useState(method.toLowerCase() !== 'get');
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [refetching, setRefetching] = useState(false);

  const call = useCallback(async () => {
    setLoading(true);
    const callMethod = method.toLowerCase();
    const callBody = body || {};
    try {
      const apiResponse = await API[callMethod](config.apiGateway.NAME, encodeURI(route), {
        headers: {
          'x-api-key': config.apiKey
        },
        body: callBody
      });
      setData(apiResponse);
    } catch (e) {
      setError(e);
    }
    setRefetching(false);
    setLoading(false);
  }, [route, method, body]);

  useEffect(() => {
    const callMethod = method.toLowerCase();
    if (callMethod === 'get') {
      call();
    } else if (availableMethods.indexOf(callMethod) === -1) {
      console.warn('useApi: Invalid call method.');
    }
  }, [call, refetching, method]);

  const refetch = () => {
    const callMethod = method.toLowerCase();
    if (callMethod === 'get') {
      setRefetching(true);
    } else {
      console.warn('useApi: Refetch only available for GET methods.');
    }
  };

  return {
    loading,
    data,
    error,
    refetch
  };
};

export default useApi;

import { useState, useEffect } from 'react';

function useAsync(asyncFunction, dependencies) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [value, setValue] = useState();

  useEffect(() => {
    const runAsync = async () => {
      setLoading(true);
      try {
        const result = await asyncFunction();
        setValue(result);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };

    runAsync();
  }, dependencies);

  return { loading, error, value };
}
import React from 'react';
import useAsync from './useAsync';

// 模拟异步请求数据的函数
async function fetchData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('Data fetched successfully!');
    }, 2000);
  });
}

function App() {
  const { loading, error, value } = useAsync(fetchData, []);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {value && <p>Data: {value}</p>}
    </div>
  );
}

export default App;

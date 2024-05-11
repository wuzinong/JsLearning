import { useState, useEffect } from 'react';

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [value, delay]);

  return debouncedValue;
}

function DebouncedInput() {
  const [inputValue, setInputValue] = useState('');
  const debouncedValue = useDebounce(inputValue, 500); // 设置防抖延迟为500毫秒

  return (
    <div
      style={{
        margin: '100px auto',
        width: 'min-content',
      }}
    >
      <input
        type='text'
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder='Type something...'
      />
      <p>Debounced Value: {debouncedValue}</p>
    </div>
  );
}

export default DebouncedInput;

import { useEffect } from 'react';

function useKeyPress(targetKey) {
  const downHandler = ({ key }) => {
    if (key === targetKey) {
      console.log('Pressed:', key);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', downHandler);
    return () => {
      window.removeEventListener('keydown', downHandler);
    };
  }, [targetKey]);
}
function KeyPressListener() {
  const [message, setMessage] = useState('');

  useKeyPress('Escape'); // 监听 Escape 键

  useEffect(() => {
    // 假设我们想在按下 Escape 键时显示一条消息
    if (message === 'Pressed: Escape') {
      alert('Escape key was pressed!');
      setMessage(''); // 清空消息，避免重复弹出警告
    }
  }, [message]); // 依赖 message 变化来触发副作用

  return (
    <div>
      <p>Press the Escape key to see an alert.</p>
      <p>{message}</p>
    </div>
  );
}

// 注意：在实际应用中，通常不会直接在组件中弹出警告，这里只是为了示例。
export default KeyPressListener;

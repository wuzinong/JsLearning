import { useEffect } from 'react';

function useBeforeunload(message) {
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      // 对于大多数浏览器，您需要使用空字符串作为默认提示
      const eventCopy = event || window.event;
      eventCopy.returnValue = message;
      return message;
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [message]);
}

function UnloadComponent() {
  const [text, setText] = useState('');

  useBeforeunload(
    'Are you sure you want to leave? You may lose unsaved changes.'
  );

  const handleChange = (event) => {
    setText(event.target.value);
  };

  return (
    <div>
      <textarea value={text} onChange={handleChange} />
      <p>
        Try to reload or close the page after typing something in the textarea.
      </p>
    </div>
  );
}

export default UnloadComponent;

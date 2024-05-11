import { useState, useEffect } from 'react';

function useHover() {
  const [value, setValue] = useState(false);

  const ref = useRef(null);

  const handleMouseOver = () => setValue(true);
  const handleMouseOut = () => setValue(false);

  useEffect(() => {
    const element = ref.current;
    element.addEventListener('mouseover', handleMouseOver);
    element.addEventListener('mouseout', handleMouseOut);

    return () => {
      element.removeEventListener('mouseover', handleMouseOver);
      element.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  return [ref, value];
}
function HoverComponent() {
  const [hoverRef, isHovered] = useHover();

  return (
    <div>
      <div ref={hoverRef}>Hover over me!</div>
      {isHovered && <p>The element is being hovered!</p>}
    </div>
  );
}

export default HoverComponent;

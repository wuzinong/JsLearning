import { useState, useEffect } from 'react';

function useInViewport(ref, rootMargin = '0px', threshold = 0) {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIntersecting(entry.isIntersecting);
      },
      { rootMargin, threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, rootMargin, threshold]);

  return isIntersecting;
}
function ViewportComponent() {
  const elementRef = useRef(null);
  const isInViewport = useInViewport(elementRef);

  return (
    <div style={{ marginBottom: 1000 }}>
      <div
        ref={elementRef}
        style={{ height: '500px', backgroundColor: 'lightblue' }}
      >
        Scroll me into view!
      </div>
      {
        <p style={{ marginTop: 100 }}>
          {isInViewport
            ? 'The element is in the viewport!'
            : 'The element isn"t in the viewport!'}
        </p>
      }
    </div>
  );
}

export default ViewportComponent;

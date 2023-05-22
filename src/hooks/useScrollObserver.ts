import { useRef, useEffect } from 'react';

export default function useScrollObserver(callback: () => void) {
  const observerTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const current = observerTarget.current;
    const observer = new IntersectionObserver(observeToCallback, { threshold: 1 });

    if (current) observer.observe(current);
    return () => {
      if (current) observer.unobserve(current);
    };

    function observeToCallback(entries: IntersectionObserverEntry[]) {
      if (entries[0].isIntersecting) callback();
    }
  }, [observerTarget, callback]);

  return {
    observer: observerTarget
  }
}

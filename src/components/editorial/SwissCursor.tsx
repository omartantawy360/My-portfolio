import React, { useEffect, useRef, useState } from 'react';
import useIsMobile from '../../hooks/useIsMobile';

const SwissCursor: React.FC = () => {
  const isMobile = useIsMobile();
  const [cursorText, setCursorText] = useState<string>('');
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const animFrameId = useRef<number | null>(null);

  useEffect(() => {
    if (isMobile) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;
      if (!isVisible) setIsVisible(true);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }

      const target = e.target as HTMLElement | null;
      const interactiveEl = target?.closest('[data-cursor]') as HTMLElement | null;
      if (interactiveEl) {
        const text = interactiveEl.getAttribute('data-cursor') || '';
        setCursorText(text);
        setIsHovering(true);
      } else {
        const clickable = target?.closest('a, button, [role="button"]') as HTMLElement | null;
        if (clickable) {
          setCursorText('');
          setIsHovering(true);
        } else {
          setCursorText('');
          setIsHovering(false);
        }
      }
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);

    const render = () => {
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.18;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.18;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`;
      }
      animFrameId.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [isMobile, isVisible]);

  if (isMobile) return null;

  return (
    <>
      {/* Precision Center Pin */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className={`fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[9999] bg-[#20201E] transition-opacity duration-200 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        } ${isHovering ? 'scale-0' : 'scale-100'}`}
      />

      {/* Playful Swiss Circle Follower */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className={`fixed top-0 left-0 pointer-events-none z-[9998] transition-all duration-200 flex items-center justify-center font-mono text-[10px] font-black tracking-widest uppercase rounded-full select-none ${
          isVisible ? 'opacity-100' : 'opacity-0'
        } ${
          isHovering
            ? cursorText
              ? 'w-24 h-24 bg-[#FF4B35] text-white border-2 border-[#20201E] shadow-[4px_4px_0px_#20201E] scale-100'
              : 'w-12 h-12 bg-[#D7FF45] border-2 border-[#20201E] text-[#20201E] shadow-[3px_3px_0px_#20201E] scale-100'
            : 'w-8 h-8 border-2 border-[#20201E] bg-transparent scale-100'
        }`}
      >
        {cursorText && <span className="text-center px-1 leading-tight">{cursorText}</span>}
      </div>
    </>
  );
};

export default SwissCursor;


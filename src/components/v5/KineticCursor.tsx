import React, { useEffect, useRef, useState } from 'react';

const KineticCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [cursorText, setCursorText] = useState<string>('');
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isTouchDevice, setIsTouchDevice] = useState<boolean>(false);

  useEffect(() => {
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsTouchDevice(true);
      return;
    }

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }

      // Check cursor data attribute
      const target = e.target as HTMLElement | null;
      const cursorTarget = target?.closest('[data-cursor]') as HTMLElement | null;
      if (cursorTarget) {
        setCursorText(cursorTarget.getAttribute('data-cursor') || '');
        setIsHovered(true);
      } else {
        setCursorText('');
        setIsHovered(false);
      }
    };

    const render = () => {
      // Smooth interpolation for the outer ring
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      }

      rafId = requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    rafId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  if (isTouchDevice) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Precision Vermilion Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[#FF3E00] shadow-[0_0_8px_#FF3E00] transition-opacity duration-200"
        style={{ opacity: isHovered ? 0 : 1 }}
      />

      {/* Kinetic Ring & Telemetry Label */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 flex items-center justify-center transition-all duration-300 ${
          isHovered
            ? 'w-24 h-24 rounded-full bg-[#FF3E00] text-[#0A0A09] shadow-[0_0_24px_rgba(255,62,0,0.4)]'
            : 'w-8 h-8 rounded-full border border-[#FF3E00]/60 bg-transparent'
        }`}
      >
        {isHovered && cursorText && (
          <span className="font-mono-tech text-[10px] font-bold tracking-widest uppercase select-none text-center px-1 leading-tight">
            {cursorText}
          </span>
        )}
      </div>
    </div>
  );
};

export default KineticCursor;


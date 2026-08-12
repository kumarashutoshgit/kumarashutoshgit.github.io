import { useEffect, useRef } from 'react';

const LEAVES = [
  { d: 'M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 3-13 6 0 0-1 1-2 3.5A14.48 14.48 0 0 1 17 8z', fill: '#c0392b' },
  { d: 'M11 20C7.14 20 4 16.86 4 13c0-5.32 6.11-10.36 7.35-11.33l.65-.5.65.5C13.89 2.64 20 7.68 20 13c0 3.86-3.14 7-9 7z', fill: '#e67e22' },
  { d: 'M12 2C6 7 3 10.5 3 14a9 9 0 0 0 18 0c0-3.5-3-7-9-12z', fill: '#d35400' },
  { d: 'M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 3-13 6 0 0-1 1-2 3.5A14.48 14.48 0 0 1 17 8z', fill: '#922b21' },
  { d: 'M11 20C7.14 20 4 16.86 4 13c0-5.32 6.11-10.36 7.35-11.33l.65-.5.65.5C13.89 2.64 20 7.68 20 13c0 3.86-3.14 7-9 7z', fill: '#a04000' },
];

export default function FallingLeaves({ count = 25, speedSec = 8 }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Inject keyframes once
    const styleId = 'falling-leaves-style';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        @keyframes leafFall {
          0%   { transform: translateY(-60px) rotate(0deg) translateX(0px); opacity: 0; }
          5%   { opacity: 0.9; }
          90%  { opacity: 0.9; }
          100% { transform: translateY(105vh) rotate(720deg) translateX(var(--drift)); opacity: 0; }
        }
      `;
      document.head.appendChild(style);
    }

    // Clear previous leaves
    container.innerHTML = '';

    for (let i = 0; i < count; i++) {
      const leaf = LEAVES[Math.floor(Math.random() * LEAVES.length)];
      const size = 14 + Math.random() * 16;
      const left = Math.random() * 100;
      const drift = Math.round(-80 + Math.random() * 160);
      const delay = Math.random() * speedSec;
      const dur = speedSec * (0.7 + Math.random() * 0.7);

      const el = document.createElement('div');
      el.style.cssText = `
        position: fixed;
        top: -60px;
        left: ${left}%;
        width: ${size}px;
        height: ${size}px;
        pointer-events: none;
        z-index: 99999;
        --drift: ${drift}px;
        animation: leafFall ${dur.toFixed(1)}s linear ${(-delay).toFixed(1)}s infinite;
      `;

      el.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24">
        <path fill="${leaf.fill}" d="${leaf.d}"/>
      </svg>`;

      container.appendChild(el);
    }

    return () => {
      if (container) container.innerHTML = '';
    };
  }, [count, speedSec]);

  return <div ref={containerRef} aria-hidden="true" />;
}

import React, { useEffect, useRef, useState } from 'react';

interface TrailPoint {
  x: number;
  y: number;
  id: number;
  opacity: number;
}

const CursorTrail: React.FC = () => {
  const [cursor, setCursor] = useState({ x: -100, y: -100 });
  const [trail, setTrail] = useState<TrailPoint[]>([]);
  const [clicking, setClicking] = useState(false);
  const trailRef = useRef<TrailPoint[]>([]);
  const idRef = useRef(0);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setCursor({ x: e.clientX, y: e.clientY });
      idRef.current += 1;
      const newPoint: TrailPoint = { x: e.clientX, y: e.clientY, id: idRef.current, opacity: 1 };
      trailRef.current = [...trailRef.current.slice(-18), newPoint];
      setTrail([...trailRef.current]);
    };

    const handleDown = () => setClicking(true);
    const handleUp = () => setClicking(false);

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mousedown', handleDown);
    window.addEventListener('mouseup', handleUp);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mousedown', handleDown);
      window.removeEventListener('mouseup', handleUp);
    };
  }, []);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 99999 }}>
      {/* Trail dots */}
      {trail.map((point, i) => {
        const size = 4 + (i / trail.length) * 6;
        const alpha = (i / trail.length) * 0.7;
        return (
          <div
            key={point.id}
            style={{
              position: 'fixed',
              left: point.x - size / 2,
              top: point.y - size / 2,
              width: size,
              height: size,
              borderRadius: '50%',
              background: i % 3 === 0 ? `rgba(0, 253, 216, ${alpha})` : i % 3 === 1 ? `rgba(168, 85, 247, ${alpha})` : `rgba(255, 46, 147, ${alpha * 0.5})`,
              boxShadow: `0 0 ${size * 2}px currentColor`,
              transition: 'none',
              pointerEvents: 'none',
            }}
          />
        );
      })}

      {/* Main cursor */}
      <div style={{
        position: 'fixed',
        left: cursor.x - 12,
        top: cursor.y - 12,
        width: 24,
        height: 24,
        border: `2px solid ${clicking ? 'var(--cyber-pink)' : 'var(--cyber-cyan)'}`,
        borderRadius: '50%',
        boxShadow: `0 0 10px ${clicking ? 'var(--cyber-pink)' : 'var(--cyber-cyan)'}`,
        transition: 'border-color 0.1s, box-shadow 0.1s',
        transform: clicking ? 'scale(1.5)' : 'scale(1)',
        pointerEvents: 'none',
      }} />

      {/* Cursor center dot */}
      <div style={{
        position: 'fixed',
        left: cursor.x - 3,
        top: cursor.y - 3,
        width: 6,
        height: 6,
        borderRadius: '50%',
        background: clicking ? 'var(--cyber-pink)' : 'var(--cyber-cyan)',
        boxShadow: `0 0 6px ${clicking ? 'var(--cyber-pink)' : 'var(--cyber-cyan)'}`,
        pointerEvents: 'none',
      }} />
    </div>
  );
};

export default CursorTrail;

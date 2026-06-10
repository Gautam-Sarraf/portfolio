import React, { useState, useEffect, useRef } from 'react';

const AmongUsFollower: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: -200, y: -200 });
  const crewPos = useRef({ x: -200, y: -200 });
  const animRef = useRef<number>(0);
  const [pos, setPos] = useState({ x: -200, y: -200 });
  const [flipped, setFlipped] = useState(false);
  const prevX = useRef(-200);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const animate = () => {
      const speed = 0.08;
      // Target: offset so the crewmate trails slightly behind and below cursor
      const targetX = mousePos.x - 20;
      const targetY = mousePos.y - 20;

      crewPos.current = {
        x: crewPos.current.x + (targetX - crewPos.current.x) * speed,
        y: crewPos.current.y + (targetY - crewPos.current.y) * speed,
      };

      // Flip direction based on movement
      const dx = crewPos.current.x - prevX.current;
      if (Math.abs(dx) > 0.5) {
        setFlipped(dx < 0);
      }
      prevX.current = crewPos.current.x;

      setPos({ x: crewPos.current.x, y: crewPos.current.y });
      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [mousePos]);

  return (
    <div
      style={{
        position: 'fixed',
        left: pos.x,
        top: pos.y,
        width: 40,
        height: 40,
        zIndex: 9997,
        pointerEvents: 'none',
        transform: `scaleX(${flipped ? -1 : 1})`,
        transition: 'transform 0.15s ease',
        filter: 'drop-shadow(0 0 6px rgba(var(--cyber-cyan-rgb), 0.5))',
        userSelect: 'none',
      }}
    >
      <img
        src="/amongus.png"
        alt="Among Us crewmate"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          imageRendering: 'pixelated',
        }}
        draggable={false}
      />
    </div>
  );
};

export default AmongUsFollower;

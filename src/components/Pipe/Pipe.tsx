// src/components/Pipe/Pipe.tsx
import React from 'react';

interface PipeProps {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    thickness?: number;
    color?: string;
    cornerAt?: 'horizontal-first' | 'vertical-first';
    gap?: number; // distance to avoid touching
}

const Pipe: React.FC<PipeProps> = ({
    x1,
    y1,
    x2,
    y2,
    thickness = 8,
    color = '#333',
    cornerAt = 'horizontal-first',
    gap = 0,
}) => {
    // Apply gap: offset both start and end by gap distance
    const dx = x2 - x1;
    const dy = y2 - y1;
    const length = Math.sqrt(dx * dx + dy * dy);

    // Normalize direction
    const ux = dx / length;
    const uy = dy / length;

    const safeX1 = x1 + ux * gap;
    const safeY1 = y1 + uy * gap;
    const safeX2 = x2 - ux * gap;
    const safeY2 = y2 - uy * gap;

    const midX = cornerAt === 'horizontal-first' ? safeX2 : safeX1;
    const midY = cornerAt === 'horizontal-first' ? safeY1 : safeY2;

    return (
        <>
            {/* First segment */}
            <line
                x1={safeX1}
                y1={safeY1}
                x2={midX}
                y2={midY}
                stroke={color}
                strokeWidth={thickness}
                strokeLinecap="round"
            />
            {/* Second segment */}
            <line
                x1={midX}
                y1={midY}
                x2={safeX2}
                y2={safeY2}
                stroke={color}
                strokeWidth={thickness}
                strokeLinecap="round"
            />
        </>
    );
};

export default Pipe;

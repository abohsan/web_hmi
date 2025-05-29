import React from 'react';

interface PipeProps {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    thickness?: number;
    color?: string;         // Outer pipe color
    liquidColor?: string;   // Inner flow color
    cornerAt?: 'horizontal-first' | 'vertical-first';
    gap?: number;
}

const Pipe: React.FC<PipeProps> = ({
    x1,
    y1,
    x2,
    y2,
    thickness = 10,
    color = '#555',
    liquidColor = '#00bfff',
    cornerAt = 'horizontal-first',
    gap = 0,
}) => {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const length = Math.sqrt(dx * dx + dy * dy);
    const ux = dx / length;
    const uy = dy / length;

    const safeX1 = x1 + ux * gap;
    const safeY1 = y1 + uy * gap;
    const safeX2 = x2 - ux * gap;
    const safeY2 = y2 - uy * gap;

    const midX = cornerAt === 'horizontal-first' ? safeX2 : safeX1;
    const midY = cornerAt === 'horizontal-first' ? safeY1 : safeY2;

    return (
        <svg style={{ position: 'absolute', overflow: 'visible' }}>
            <defs>
                {/* Pipe body gradient */}
                <linearGradient id="pipeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#aaa" />
                    <stop offset="50%" stopColor={color} />
                    <stop offset="100%" stopColor="#666" />
                </linearGradient>

                {/* Shadow filter */}
                <filter id="pipeShadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="2" dy="2" stdDeviation="2" floodColor="#000" floodOpacity="0.3" />
                </filter>
            </defs>

            {/* First pipe segment */}
            <line
                x1={safeX1}
                y1={safeY1}
                x2={midX}
                y2={midY}
                stroke="url(#pipeGradient)"
                strokeWidth={thickness}
                strokeLinecap="round"
                filter="url(#pipeShadow)"
            />
            {/* Second pipe segment */}
            <line
                x1={midX}
                y1={midY}
                x2={safeX2}
                y2={safeY2}
                stroke="url(#pipeGradient)"
                strokeWidth={thickness}
                strokeLinecap="round"
                filter="url(#pipeShadow)"
            />

            {/* Liquid animation - dashed line flowing inside */}
            {/* First segment */}
            <line
                x1={safeX1}
                y1={safeY1}
                x2={midX}
                y2={midY}
                stroke={liquidColor}
                strokeWidth={thickness / 2}
                strokeLinecap="round"
                strokeDasharray="6 6"
            >
                <animate
                    attributeName="stroke-dashoffset"
                    values="12;0"
                    dur="1s"
                    repeatCount="indefinite"
                />
            </line>

            {/* Second segment */}
            <line
                x1={midX}
                y1={midY}
                x2={safeX2}
                y2={safeY2}
                stroke={liquidColor}
                strokeWidth={thickness / 2}
                strokeLinecap="round"
                strokeDasharray="6 6"
            >
                <animate
                    attributeName="stroke-dashoffset"
                    values="12;0"
                    dur="1s"
                    repeatCount="indefinite"
                />
            </line>
        </svg>
    );
};

export default Pipe;

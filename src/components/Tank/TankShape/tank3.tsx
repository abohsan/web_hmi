// src/components/Tank/TankShape/tank3.tsx
import React from 'react';

interface Props {
    level: number;
    x?: number;
    y?: number;
}

const width = 80;
const height = 200;
/**
 * Utility function to get a connector point based on tank (x, y) and connector index.
 */
export function getConnectorPoint(x: number, y: number, index: 0 | 1) {
    const points = [
        { x: x + width / 4, y: y + height },       // Bottom-left quarter
        { x: x + (3 * width) / 4, y: y + height }  // Bottom-right quarter
    ];
    return points[index];
}
const Tank3: React.FC<Props> = ({ level, x = 0, y = 0 }) => {

    const fillColor = '#1E90FF';
    const fillHeight = (height * level) / 100;

    return (
        <svg width={width} height={height} x={x} y={y}>
            <defs>
                <clipPath id="clip-tank3">
                    <ellipse cx={width / 2} cy={height / 2} rx={width / 2} ry={height / 2} />
                </clipPath>
            </defs>

            {/* Tank shape */}
            <ellipse
                cx={width / 2}
                cy={height / 2}
                rx={width / 2}
                ry={height / 2}
                fill="#e0e0e0"
                stroke="black"
            />

            {/* Fill level */}
            <rect
                x={0}
                y={height - fillHeight}
                width={width}
                height={fillHeight}
                fill={fillColor}
                clipPath="url(#clip-tank3)"
            />
        </svg>
    );
};

export default Tank3;


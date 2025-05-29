// src/components/Tank/TankShape/Tank1.tsx

import React from 'react';

interface Props {
    level: number; // Fill level in percentage (0–100)
    x?: number;
    y?: number;
}

const TANK_WIDTH = 80;
const TANK_HEIGHT = 200;
const FILL_COLOR = '#1E90FF';
const BODY_COLOR = '#e0e0e0';
const STROKE_COLOR = 'black';

type ConnectorIndex = 0 | 1 | 2 | 3 | 4;

/**
 * Get a specific connector point for Tank1
 */
export function getConnectorPoint(x: number, y: number, index: ConnectorIndex) {
    const points = getAllConnectorPoints(x, y);
    return points[index];
}

/**
 * Get all connector points for Tank1
 */
export function getAllConnectorPoints(x: number, y: number) {
    return [
        { x: x + 5, y: y + TANK_HEIGHT - 180 },              // Top-left
        { x: x + 5, y: y + TANK_HEIGHT - 15 },               // Bottom-left
        { x: x + TANK_WIDTH / 2, y: y + TANK_HEIGHT },       // Bottom-center
        { x: x + TANK_WIDTH - 5, y: y + TANK_HEIGHT - 15 },  // Bottom-right
        { x: x + TANK_WIDTH - 6, y: y + TANK_HEIGHT - 180 }, // Top-right
    ] as const;
}

const Tank1: React.FC<Props> = ({ level, x = 0, y = 0 }) => {
    const fillHeight = (TANK_HEIGHT * level) / 100;
    const connectorPoints = getAllConnectorPoints(x, y);

    return (
        <svg width={TANK_WIDTH + 10} height={TANK_HEIGHT + 10} x={x} y={y}>

            <title>Tank1 at ({x}, {y}) - Level: {level}%</title>

            <defs>
                <clipPath id="clip-tank1">
                    <ellipse
                        cx={TANK_WIDTH / 2}
                        cy={TANK_WIDTH / 6}
                        rx={TANK_WIDTH / 2}
                        ry={TANK_WIDTH / 6}
                    />
                    <rect
                        x={0}
                        y={TANK_WIDTH / 6}
                        width={TANK_WIDTH}
                        height={TANK_HEIGHT - TANK_WIDTH / 3}
                    />
                    <ellipse
                        cx={TANK_WIDTH / 2}
                        cy={TANK_HEIGHT - TANK_WIDTH / 6}
                        rx={TANK_WIDTH / 2}
                        ry={TANK_WIDTH / 6}
                    />
                </clipPath>
            </defs>

            {/* Tank Body */}
            <ellipse
                cx={TANK_WIDTH / 2}
                cy={TANK_WIDTH / 6}
                rx={TANK_WIDTH / 2}
                ry={TANK_WIDTH / 6}
                fill={BODY_COLOR}
                stroke={STROKE_COLOR}
            />
            <rect
                x={0}
                y={TANK_WIDTH / 6}
                width={TANK_WIDTH}
                height={TANK_HEIGHT - TANK_WIDTH / 3}
                fill={BODY_COLOR}
                stroke={STROKE_COLOR}
            />
            <ellipse
                cx={TANK_WIDTH / 2}
                cy={TANK_HEIGHT - TANK_WIDTH / 6}
                rx={TANK_WIDTH / 2}
                ry={TANK_WIDTH / 6}
                fill={BODY_COLOR}
                stroke={STROKE_COLOR}
            />

            {/* Fill Level */}
            <rect
                x={0}
                y={TANK_HEIGHT - fillHeight}
                width={TANK_WIDTH}
                height={fillHeight}
                fill={FILL_COLOR}
                clipPath="url(#clip-tank1)"
            />

            {/* Debug: Connector Points */}
            {connectorPoints.map((pt, index) => (
                <g key={index}>
                    <circle
                        cx={pt.x - x}
                        cy={pt.y - y}
                        r={4}
                        fill="red"
                    />
                    <text
                        x={pt.x - x + 5}
                        y={pt.y - y - 5}
                        fontSize="10"
                        fill="black"
                    >
                        {index}
                    </text>
                </g>
            ))}
        </svg>
    );
};

export default Tank1;

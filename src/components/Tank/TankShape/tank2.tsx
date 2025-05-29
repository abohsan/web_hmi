import React from 'react';

interface Props {
    level: number;
    x?: number;
    y?: number;
}
const TANK_WIDTH = 80;
const TANK_HEIGHT = 200;
const baseFillColor = '#1E90FF';
const BODY_COLOR = '#e0e0e0';
const STROKE_COLOR = '#333';


type ConnectorIndex = 0 | 1 | 2 | 3 | 4;

/**
 * Utility function to get a connector point based on tank (x, y) and connector index.
 */

export function getConnectorPoint(x: number, y: number, index: ConnectorIndex) {
    const points = getAllConnectorPoints(x, y);
    return points[index];
}

/**
 * Get all connector points for Tank2
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

const Tank2: React.FC<Props> = ({ level, x = 0, y = 0 }) => {
    const fillTANK_HEIGHT = Math.max((TANK_HEIGHT * level) / 100, 2);
    const connectorPoints = getAllConnectorPoints(x, y);

    return (
        <svg
            width={TANK_WIDTH + 10}
            height={TANK_HEIGHT}
            x={x}
            y={y}
            viewBox={`0 0 ${TANK_WIDTH + 10} ${TANK_HEIGHT}`}
        >
            <defs>
                <clipPath id="clip-tank2">
                    <ellipse cx={TANK_WIDTH / 2} cy={TANK_WIDTH / 6} rx={TANK_WIDTH / 2} ry={TANK_WIDTH / 6} />
                    <rect x={0} y={TANK_WIDTH / 6} width={TANK_WIDTH} height={TANK_HEIGHT - TANK_WIDTH / 3} />
                    <ellipse cx={TANK_WIDTH / 2} cy={TANK_HEIGHT - TANK_WIDTH / 6} rx={TANK_WIDTH / 2} ry={TANK_WIDTH / 6} />
                </clipPath>

                <linearGradient id="liquidGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={baseFillColor} stopOpacity={0.9} />
                    <stop offset="60%" stopColor={baseFillColor} stopOpacity={0.6} />
                    <stop offset="100%" stopColor="#004a99" stopOpacity={0.8} />
                </linearGradient>

                <linearGradient id="glassHighlight" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="white" stopOpacity={0.6} />
                    <stop offset="100%" stopColor="white" stopOpacity={0} />
                </linearGradient>

                <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#000" floodOpacity="0.2" />
                </filter>
            </defs>

            {/* Tank body */}
            <ellipse
                cx={TANK_WIDTH / 2}
                cy={TANK_WIDTH / 6}
                rx={TANK_WIDTH / 2}
                ry={TANK_WIDTH / 6}
                fill={BODY_COLOR}
                stroke={STROKE_COLOR}
                width={1}
                filter="url(#shadow)"
            />
            <rect
                x={0}
                y={TANK_WIDTH / 6}
                width={TANK_WIDTH}
                height={TANK_HEIGHT - TANK_WIDTH / 3}
                fill={BODY_COLOR}
                stroke={STROKE_COLOR}
                widths={1}
                filter="url(#shadow)"
            />
            <ellipse
                cx={TANK_WIDTH / 2}
                cy={TANK_HEIGHT - TANK_WIDTH / 6}
                rx={TANK_WIDTH / 2}
                ry={TANK_WIDTH / 6}
                fill={BODY_COLOR}
                stroke={STROKE_COLOR}
                width={1}
                filter="url(#shadow)"
            />

            {/* Glass highlight */}
            <ellipse
                cx={TANK_WIDTH * 0.7}
                cy={TANK_HEIGHT * 0.4}
                rx={TANK_WIDTH * 0.15}
                ry={TANK_HEIGHT * 0.3}
                fill="url(#glassHighlight)"
                opacity={0.6}
                pointerEvents="none"
            />

            {/* Liquid fill in tank */}
            <g clipPath="url(#clip-tank2)">
                <rect
                    x={0}
                    y={TANK_HEIGHT - fillTANK_HEIGHT}
                    width={TANK_WIDTH}
                    height={fillTANK_HEIGHT}
                    fill="url(#liquidGradient)"
                />
                <ellipse
                    cx={TANK_WIDTH / 2}
                    cy={TANK_HEIGHT - fillTANK_HEIGHT}
                    rx={TANK_WIDTH / 2}
                    ry={TANK_WIDTH / 20}
                    fill={baseFillColor}
                    opacity={0.8}
                    style={{ filter: 'blur(0.8px)' }}
                />
            </g>

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

export default Tank2;

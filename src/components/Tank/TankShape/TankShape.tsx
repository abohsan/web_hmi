// src/components/Tank/TankShape/TankShape.tsx
import React from 'react';
import Tank1 from './tank1';
import Tank2 from './tank2';
import Tank3 from './tank3';

interface TankShapeProps {
    type: string;
    level: number;
    x?: number;
    y?: number;
}

const TankShape: React.FC<TankShapeProps> = ({ type, level, x = 0, y = 0 }) => {
    // console.log('TankShape Component - Position:', { id, x, y });

    switch (type) {
        case 'tank1':
            return <Tank1 level={level} x={x} y={y} />;
        case 'tank2':
            return <Tank2 level={level} x={x} y={y} />;
        case 'tank3':
            return <Tank3 level={level} x={x} y={y} />;
        default:
            return <Tank1 level={50} x={0} y={0} />;
    }
};

export default TankShape;

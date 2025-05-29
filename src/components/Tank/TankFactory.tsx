// src/components/Tank/TankFactory.tsx
import Tank1 from './TankShape/tank1';
import Tank2 from './TankShape/tank2';
import Tank3 from './TankShape/tank3';

export const TankTypeMap: Record<string, React.FC<any>> = {
    Tank1,
    Tank2,
    Tank3,
};

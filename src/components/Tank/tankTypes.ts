// src/components/Tank/tankTypes.ts

export type TankShape = 'rectangle' | 'cylinder' | 'oval';

export interface TankType {
    type: string;
    name: string;
    maxCapacity: number;
}

export const tankTypes: TankType[] = [
    {
        type: 'tank1',
        name: 'Tank 1',
        maxCapacity: 100,
    },
    {
        type: 'tank2',
        name: 'Tank 2',
        maxCapacity: 300,
    },
    {
        type: 'tank3',
        name: 'Tank 3',
        maxCapacity: 500,
    },
];

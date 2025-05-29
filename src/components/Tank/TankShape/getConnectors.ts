// src/components/Tank/TankShape/getConnectors.ts
import { getConnectorPoint as getConnectorPoint1 } from './tank1';
import { getConnectorPoint as getConnectorPoint2 } from './tank2';
import { getConnectorPoint as getConnectorPoint3 } from './tank3';

export const connectorMap: Record<string, (x: number, y: number, index: 0 | 1) => { x: number; y: number }> = {
    tank1: getConnectorPoint1,
    tank2: getConnectorPoint2,
    tank3: getConnectorPoint3,
};

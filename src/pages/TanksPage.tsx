// src/pages/TanksPage.tsx
import React from 'react';
import ZoomCanvas from '../components/Zoom/ZoomCanvas';
import Tank from '../components/Tank/Tank';
import Pipe from '../components/Pipe/Pipe1';
import { connectorMap } from '../components/Tank/TankShape/getConnectors';
import dataconfig from "../config.json";

const TanksPage: React.FC = () => {
    const tanks = dataconfig.dataconfig.Tank;
    type TankId = keyof typeof tanks;
    const pipes = dataconfig.dataconfig.pipe;

    const getTankConnector = (tankId: string, connectorIndex: number) => {
        const tank = tanks[tankId as TankId];
        if (!tank) return null;

        const getConnector = connectorMap[tank.type.toLowerCase()];
        if (!getConnector) return null;

        return getConnector(tank.x, tank.y, connectorIndex as 0 | 1);
    };

    return (
        <div style={{ padding: '1rem' }}>
            <h2>Tank Monitoring</h2>
            <ZoomCanvas>
                {Object.entries(tanks).map(([id, tankData]) => (
                    <Tank
                        key={id}
                        type={tankData.type.toLowerCase()}
                        topic={tankData.mqttSub}
                        x={tankData.x}
                        y={tankData.y}
                    />
                ))}

                {/* Render pipes */}
                {Object.entries(pipes).map(([pipeId, pipeData]) => {
                    const p0 = getTankConnector(pipeData.p0.tank, pipeData.p0.connector);
                    const p1 = getTankConnector(pipeData.p1.tank, pipeData.p1.connector);

                    // Narrow the routePipe value to allowed types or undefined
                    const cornerAt =
                        pipeData.routePipe === "horizontal-first" || pipeData.routePipe === "vertical-first"
                            ? pipeData.routePipe
                            : undefined;

                    return p0 && p1 ? (
                        <Pipe
                            key={pipeId}
                            x1={p0.x}
                            y1={p0.y}
                            x2={p1.x}
                            y2={p1.y}
                            cornerAt={cornerAt}
                        />
                    ) : null;
                })}
            </ZoomCanvas>
        </div>
    );
};

export default TanksPage;

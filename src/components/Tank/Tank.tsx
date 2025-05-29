// src/components/Tank/Tank.tsx

import React, { useState, useEffect } from 'react';
import useMqttClient from '../../hooks/useMqttLevels';
import TankShape from './TankShape/TankShape';
import { tankTypes } from './tankTypes';

interface TankProps {
    type: string;
    topic: string;
    x?: number;
    y?: number;
}

const Tank: React.FC<TankProps> = ({ type, topic, x = 0, y = 0 }) => {
    const [level, setLevel] = useState<number>(0);
    const [alarm, setAlarm] = useState<string | null>(null);

    const tankMeta = tankTypes.find(t => t.type === type);
    const tankLabel = tankMeta?.name ?? `Tank ${type}`;
    const maxCapacity = tankMeta?.maxCapacity ?? 100;

    const HIGH_ALARM_THRESHOLD = 90;
    const LOW_ALARM_THRESHOLD = 10;

    useMqttClient({
        topics: [topic],
        onMessage: (msgTopic, msg) => {
            if (msgTopic === topic) {
                const newLevel = parseFloat(msg);
                setLevel(newLevel);
            }
        },
    });

    useEffect(() => {
        if (level >= HIGH_ALARM_THRESHOLD) {
            setAlarm('⚠️ High Alarm: Above 90%');
        } else if (level <= LOW_ALARM_THRESHOLD) {
            setAlarm('⚠️ Low Alarm: Below 10%');
        } else {
            setAlarm(null);
        }
    }, [level]);

    const alarmColor = level >= HIGH_ALARM_THRESHOLD
        ? 'red'
        : level <= LOW_ALARM_THRESHOLD
            ? 'blue'
            : 'transparent';

    return (
        <g transform={`translate(${x}, ${y})`}>

            {/* Tank Graphic */}
            <TankShape type={type} level={level} />

            {/* Level Display */}
            <text x="40" y="110" textAnchor="middle" fontSize="12">
                {level.toFixed(1)}%
            </text>

            {/* Alarm Message */}
            {/* {alarm && (
                <text
                    x="30"
                    y="235"
                    textAnchor="middle"
                    fontSize="12"
                    fill={alarmColor}
                >
                    {alarm}
                </text>
            )} */}

            {/* Tank Label */}
            <text x="40" y="40" textAnchor="middle" fontSize="14" fontWeight="bold">
                {tankLabel}
            </text>

            {/* Alarm Icon */}
            {alarm && (
                <text
                    x="40"
                    y="95"
                    textAnchor="middle"
                    fontSize="18"
                    fill={alarmColor}
                    fontWeight="bold"
                >
                    ⚠️
                </text>
            )}
        </g>
    );
};

export default Tank;

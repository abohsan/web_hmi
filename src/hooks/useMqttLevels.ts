// src/hooks/useMqttClient.ts
import { useEffect } from 'react';
import mqtt from 'mqtt';

function useMqttClient({ topics, onMessage }: { topics: string[]; onMessage: (topic: string, message: string) => void }) {
    useEffect(() => {
        const client = mqtt.connect('ws://localhost:9001', {
            reconnectPeriod: 4000, // retry every 1 sec
            connectTimeout: 4000,
        });

        client.on('connect', () => {
            // console.log('✅ Connected to MQTT broker');
            topics.forEach((topic) => client.subscribe(topic));
        });

        client.on('message', (topic, payload) => {
            onMessage(topic, payload.toString());
        });

        client.on('error', (err) => {
            console.error('MQTT error:', err.message);
            client.end(); // close on error to prevent rapid retries
        });

        return () => {
            client.end(true);
        };
    }, [topics, onMessage]);
}

export default useMqttClient;

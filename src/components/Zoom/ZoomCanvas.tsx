// src/components/Zoom/ZoomCanvas.tsx

import React, { useState, useRef, useCallback, type WheelEvent, type MouseEvent, type ReactNode } from 'react';

type ZoomCanvasProps = {
    children: ReactNode;
    width?: number;
    height?: number;
};

const ZoomCanvas: React.FC<ZoomCanvasProps> = ({ children, width = 1400, height = 800 }) => {
    const [scale, setScale] = useState(1);
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const svgRef = useRef<SVGSVGElement>(null);

    // For panning
    const dragging = useRef(false);
    const dragStart = useRef<{ x: number; y: number } | null>(null);

    // Handle wheel zoom centered on mouse position
    const handleWheel = useCallback((e: WheelEvent<SVGSVGElement>) => {
        e.preventDefault();

        const svg = svgRef.current;
        if (!svg) return;

        // Get mouse position relative to SVG
        const rect = svg.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        // Calculate the zoom direction and scale factor
        const scaleStep = 0.15;
        const direction = e.deltaY > 0 ? -scaleStep : scaleStep;
        let newScale = Math.min(4, Math.max(0.2, scale + direction));

        // Calculate the zoom focal point offsets
        const dx = (mouseX - offset.x) / scale;
        const dy = (mouseY - offset.y) / scale;

        // Adjust offset so zoom is centered on mouse pointer
        const newOffsetX = offset.x - dx * (newScale - scale);
        const newOffsetY = offset.y - dy * (newScale - scale);

        setScale(newScale);
        setOffset({ x: newOffsetX, y: newOffsetY });
    }, [scale, offset]);

    // Start panning
    const handleMouseDown = (e: MouseEvent<SVGSVGElement>) => {
        e.preventDefault();
        dragging.current = true;
        dragStart.current = { x: e.clientX, y: e.clientY };
    };

    // Panning movement
    const handleMouseMove = (e: MouseEvent<SVGSVGElement>) => {
        if (!dragging.current || !dragStart.current) return;

        const dx = e.clientX - dragStart.current.x;
        const dy = e.clientY - dragStart.current.y;

        setOffset(prev => ({
            x: prev.x + dx,
            y: prev.y + dy,
        }));

        dragStart.current = { x: e.clientX, y: e.clientY };
    };

    // End panning
    const handleMouseUp = () => {
        dragging.current = false;
        dragStart.current = null;
    };

    // Cancel panning if mouse leaves SVG area
    const handleMouseLeave = () => {
        dragging.current = false;
        dragStart.current = null;
    };

    return (
        <svg
            ref={svgRef}
            width={width}
            height={height}
            style={{ border: '1px solid #ccc', background: '#f9f9f9', cursor: dragging.current ? 'grabbing' : 'grab' }}
            onWheel={handleWheel}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
        >
            <g transform={`translate(${offset.x}, ${offset.y}) scale(${scale})`}>
                {children}
            </g>
        </svg>
    );
};

export default ZoomCanvas;

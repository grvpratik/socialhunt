// 'use client'
// import React, { useState, useRef, useEffect } from "react";

// const DraggableZoomableMap = () => {
// 	const [scale, setScale] = useState(1);
// 	const [position, setPosition] = useState({ x: 0, y: 0 });
// 	const [dragging, setDragging] = useState(false);
// 	const [startPos, setStartPos] = useState({ x: 0, y: 0 });
// 	const containerRef = useRef(null);

// 	// Handle mouse/touch events for dragging
// 	const handleStart = (e) => {
// 		setDragging(true);
// 		const clientX = e.type === "mousedown" ? e.clientX : e.touches[0].clientX;
// 		const clientY = e.type === "mousedown" ? e.clientY : e.touches[0].clientY;
// 		setStartPos({
// 			x: clientX - position.x,
// 			y: clientY - position.y,
// 		});
// 	};

// 	const handleMove = (e) => {
// 		if (!dragging) return;
// 		e.preventDefault();
// 		const clientX = e.type === "mousemove" ? e.clientX : e.touches[0].clientX;
// 		const clientY = e.type === "mousemove" ? e.clientY : e.touches[0].clientY;
// 		setPosition({
// 			x: clientX - startPos.x,
// 			y: clientY - startPos.y,
// 		});
// 	};

// 	const handleEnd = () => {
// 		setDragging(false);
// 	};

// 	// Handle zoom with mouse wheel or pinch gesture
// 	const handleWheel = (e) => {
// 		e.preventDefault();
// 		const delta = e.deltaY * -0.01;
// 		const newScale = Math.min(Math.max(0.5, scale + delta), 4);
// 		setScale(newScale);
// 	};

// 	useEffect(() => {
// 		const container = containerRef.current;
// 		if (!container) return;

// 		container.addEventListener("wheel", handleWheel, { passive: false });
// 		container.addEventListener("touchstart", handleStart);
// 		container.addEventListener("touchmove", handleMove);
// 		container.addEventListener("touchend", handleEnd);
// 		container.addEventListener("mousedown", handleStart);
// 		container.addEventListener("mousemove", handleMove);
// 		container.addEventListener("mouseup", handleEnd);
// 		container.addEventListener("mouseleave", handleEnd);

// 		return () => {
// 			container.removeEventListener("wheel", handleWheel);
// 			container.removeEventListener("touchstart", handleStart);
// 			container.removeEventListener("touchmove", handleMove);
// 			container.removeEventListener("touchend", handleEnd);
// 			container.removeEventListener("mousedown", handleStart);
// 			container.removeEventListener("mousemove", handleMove);
// 			container.removeEventListener("mouseup", handleEnd);
// 			container.removeEventListener("mouseleave", handleEnd);
// 		};
// 	}, [scale, position, dragging, startPos]);

// 	return (
// 		<div
// 			className="w-full h-screen overflow-hidden bg-gray-100 relative"
// 			ref={containerRef}
// 		>
// 			<div
// 				className="absolute inset-0 cursor-move"
// 				style={{
// 					transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
// 					transformOrigin: "50% 50%",
// 					transition: dragging ? "none" : "transform 0.1s",
// 				}}
// 			>
// 				{/* This is your map content. For demonstration, I'll create a grid of tiles */}
// 				<div className="grid grid-cols-8 gap-1 w-[800px] h-[800px] bg-green-200">
// 					{[...Array(64)].map((_, index) => (
// 						<div
// 							key={index}
// 							className="bg-green-600 border border-green-700 rounded"
// 						/>
// 					))}
// 				</div>
// 			</div>

// 			{/* Zoom controls */}
// 			<div className="absolute bottom-4 right-4 flex flex-col gap-2">
// 				<button
// 					onClick={() => setScale((s) => Math.min(s + 0.2, 4))}
// 					className="bg-white p-2 rounded shadow hover:bg-gray-100"
// 				>
// 					+
// 				</button>
// 				<button
// 					onClick={() => setScale((s) => Math.max(s - 0.2, 0.5))}
// 					className="bg-white p-2 rounded shadow hover:bg-gray-100"
// 				>
// 					-
// 				</button>
// 			</div>
// 		</div>
// 	);
// };

// export default DraggableZoomableMap;

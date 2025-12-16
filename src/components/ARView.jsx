import React, { useState, useRef, useEffect } from 'react';
import { Upload, X, Move, Maximize, Minimize, Save } from 'lucide-react';
import { motion } from 'framer-motion';

const ARView = ({ productImage, onClose }) => {
    const [roomImage, setRoomImage] = useState(null);
    const [artPosition, setArtPosition] = useState({ x: 50, y: 50 }); // Percentage
    const [artScale, setArtScale] = useState(1);
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef(null);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => setRoomImage(e.target.result);
            reader.readAsDataURL(file);
        }
    };

    const handleMouseDown = (e) => {
        setIsDragging(true);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleMouseMove = (e) => {
        if (isDragging && containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            setArtPosition({ x, y });
        }
    };

    // Touch support for mobile
    const handleTouchMove = (e) => {
        if (isDragging && containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const touch = e.touches[0];
            const x = ((touch.clientX - rect.left) / rect.width) * 100;
            const y = ((touch.clientY - rect.top) / rect.height) * 100;
            setArtPosition({ x, y });
        }
    };

    return (
        <div className="fixed inset-0 bg-black/90 z-50 flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-5xl bg-white rounded-sm overflow-hidden flex flex-col h-[85vh]">
                {/* Header */}
                <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-white">
                    <h3 className="text-xl font-display font-bold text-charcoal">View in Your Room</h3>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <X size={24} />
                    </button>
                </div>

                {/* Main Viewport */}
                <div
                    ref={containerRef}
                    className="flex-1 bg-gray-100 relative overflow-hidden cursor-crosshair"
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleMouseUp}
                >
                    {roomImage ? (
                        <img
                            src={roomImage}
                            alt="Room"
                            className="w-full h-full object-cover select-none pointer-events-none"
                        />
                    ) : (
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
                            <Upload size={48} className="mb-4" />
                            <p className="text-lg">Upload a photo of your room to get started</p>
                        </div>
                    )}

                    {/* Draggable Art Piece */}
                    <div
                        className="absolute shadow-2xl cursor-move border-2 border-white/50 hover:border-gold transition-colors"
                        style={{
                            left: `${artPosition.x}%`,
                            top: `${artPosition.y}%`,
                            transform: `translate(-50%, -50%) scale(${artScale})`,
                            width: '200px', // Base width
                            touchAction: 'none'
                        }}
                        onMouseDown={handleMouseDown}
                        onTouchStart={handleMouseDown}
                    >
                        <img
                            src={productImage}
                            alt="Art"
                            className="w-full h-auto pointer-events-none select-none"
                        />

                        {/* Resize Handles (Visual only for now) */}
                        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-black/70 text-white text-xs px-2 py-1 rounded-full whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity">
                            Drag to move
                        </div>
                    </div>
                </div>

                {/* Controls */}
                <div className="p-6 bg-white border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center space-x-4 w-full md:w-auto">
                        <label className="flex items-center space-x-2 bg-charcoal text-white px-4 py-2 rounded-sm cursor-pointer hover:bg-deep-saffron transition-colors">
                            <Upload size={18} />
                            <span>Upload Room Photo</span>
                            <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                        </label>
                        {roomImage && (
                            <button
                                onClick={() => setRoomImage(null)}
                                className="text-red-500 text-sm hover:underline"
                            >
                                Clear Photo
                            </button>
                        )}
                    </div>

                    <div className="flex items-center space-x-4 w-full md:w-auto justify-center">
                        <Minimize size={18} className="text-gray-400" />
                        <input
                            type="range"
                            min="0.5"
                            max="2"
                            step="0.1"
                            value={artScale}
                            onChange={(e) => setArtScale(parseFloat(e.target.value))}
                            className="w-32 md:w-48 accent-deep-saffron"
                        />
                        <Maximize size={18} className="text-gray-400" />
                    </div>

                    <div className="w-full md:w-auto flex justify-end">
                        <button className="flex items-center space-x-2 text-charcoal font-medium hover:text-deep-saffron transition-colors">
                            <Save size={18} />
                            <span>Save View</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ARView;

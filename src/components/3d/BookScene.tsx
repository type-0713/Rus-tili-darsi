import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls, Text } from '@react-three/drei';
import * as THREE from 'three';
import { BookFallback } from './BookFallback';

// 3D Bookshelf in background
const Bookshelf: React.FC = () => {
  const shelfBooks = useMemo(() => {
    const books = [];
    const colors = ['#7c3aed', '#0284c7', '#4f46e5', '#9333ea', '#0891b2', '#2563eb'];
    for (let i = -6; i <= 6; i++) {
      if (i === 0) continue;
      const height = 1.2 + Math.random() * 0.5;
      const color = colors[Math.floor(Math.random() * colors.length)];
      books.push({
        position: [i * 0.45, height / 2 - 1.8, -2] as [number, number, number],
        size: [0.35, height, 0.8] as [number, number, number],
        color,
        rotZ: (Math.random() - 0.5) * 0.08
      });
    }
    return books;
  }, []);

  return (
    <group position={[0, -0.2, -1]}>
      {/* Wooden / metallic shelf plank */}
      <mesh position={[0, -1.85, -2]}>
        <boxGeometry args={[7, 0.15, 1.2]} />
        <meshStandardMaterial color="#334155" roughness={0.3} metalness={0.4} />
      </mesh>

      {/* Books on the shelf */}
      {shelfBooks.map((b, idx) => (
        <mesh key={idx} position={b.position} rotation={[0, 0, b.rotZ]}>
          <boxGeometry args={b.size} />
          <meshStandardMaterial color={b.color} roughness={0.3} metalness={0.1} />
        </mesh>
      ))}
    </group>
  );
};

// 3D Floating Russian Cyrillic Letters
const FloatingLetters: React.FC = () => {
  const letters = ['А', 'Б', 'В', 'Я', 'Ж', 'Ф', 'Ы', 'Э', 'Ю', 'Д', 'П'];
  const letterPositions = useMemo(() => {
    return letters.map((char, index) => {
      const angle = (index / letters.length) * Math.PI * 2;
      const radius = 2.3 + (index % 3) * 0.4;
      return {
        char,
        pos: [
          Math.cos(angle) * radius,
          Math.sin(angle) * 1.1 + 0.3,
          (Math.sin(angle * 2) * 0.8)
        ] as [number, number, number],
        speed: 1.2 + (index % 3) * 0.4,
        color: index % 2 === 0 ? '#6d28d9' : '#0369a1'
      };
    });
  }, []);

  return (
    <group>
      {letterPositions.map((item, idx) => (
        <Float
          key={idx}
          speed={item.speed}
          rotationIntensity={0.8}
          floatIntensity={1.2}
        >
          <Text
            position={item.pos}
            fontSize={0.36}
            color={item.color}
            anchorX="center"
            anchorY="middle"
          >
            {item.char}
            <meshStandardMaterial
              color={item.color}
              emissive={item.color}
              emissiveIntensity={0.3}
            />
          </Text>
        </Float>
      ))}
    </group>
  );
};

// 3D Open Book Mesh with White Pages
const OpenBookModel: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      const t = state.clock.getElapsedTime();
      groupRef.current.position.y = Math.sin(t * 1.1) * 0.06;
      groupRef.current.rotation.y = Math.sin(t * 0.4) * 0.12 + (state.pointer.x * 0.2);
      groupRef.current.rotation.x = 0.25 - (state.pointer.y * 0.15);
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]} rotation={[0.25, 0, 0]}>
      {/* Book Cover / Base (Royal Indigo Leather) */}
      <mesh position={[0, -0.08, 0]}>
        <boxGeometry args={[3.2, 0.08, 2.2]} />
        <meshStandardMaterial color="#312e81" roughness={0.3} metalness={0.3} />
      </mesh>

      {/* Book Spine Center */}
      <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 2.2, 16]} />
        <meshStandardMaterial color="#4f46e5" roughness={0.2} metalness={0.5} />
      </mesh>

      {/* Left Page Wing (Clean White Paper) */}
      <group position={[-0.75, 0.05, 0]} rotation={[0, 0, -0.07]}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1.4, 0.06, 2.1]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.4} />
        </mesh>
        {/* Left Page Top Texture Paper */}
        <mesh position={[0, 0.035, 0]}>
          <planeGeometry args={[1.3, 2.0]} />
          <meshStandardMaterial color="#ffffff" roughness={0.5} />
        </mesh>
        <Text
          position={[-0.1, 0.04, 0.5]}
          rotation={[-Math.PI / 2, 0, 0]}
          fontSize={0.105}
          color="#312e81"
          maxWidth={1.1}
          lineHeight={1.4}
        >
          {`КНИЖНЫЙ МИР\nЧтение развивает\nпамять и речь.\n15 минут в день\nтворят чудеса.`}
        </Text>
      </group>

      {/* Right Page Wing (Clean White Paper) */}
      <group position={[0.75, 0.05, 0]} rotation={[0, 0, 0.07]}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1.4, 0.06, 2.1]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.4} />
        </mesh>
        {/* Right Page Top Texture Paper */}
        <mesh position={[0, 0.035, 0]}>
          <planeGeometry args={[1.3, 2.0]} />
          <meshStandardMaterial color="#ffffff" roughness={0.5} />
        </mesh>
        <Text
          position={[0.1, 0.04, 0.5]}
          rotation={[-Math.PI / 2, 0, 0]}
          fontSize={0.105}
          color="#0369a1"
          maxWidth={1.1}
          lineHeight={1.4}
        >
          {`AI ACADEMY 3D\nПогрузитесь\nв изучение\nрусского языка\nлегко и красиво!`}
        </Text>
      </group>

      {/* Glowing Book Light Marker / Ribbon */}
      <mesh position={[0, 0.06, 0.4]} rotation={[0, 0, 0]}>
        <boxGeometry args={[0.06, 0.03, 1.4]} />
        <meshStandardMaterial color="#0284c7" emissive="#0284c7" emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
};

// Check WebGL availability helper
const checkWebGL = (): boolean => {
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
};

export const BookScene: React.FC = () => {
  const [hasWebGL, setHasWebGL] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    if (!checkWebGL()) {
      setHasWebGL(false);
    }
  }, []);

  if (!hasWebGL || hasError) {
    return <BookFallback />;
  }

  return (
    <div className="relative w-full h-[380px] md:h-[460px] rounded-3xl overflow-hidden bg-gradient-to-b from-slate-50 via-purple-50/20 to-indigo-50/30 border border-slate-200/90 shadow-sm">
      <Canvas
        camera={{ position: [0, 1.2, 3.8], fov: 48 }}
        onError={() => setHasError(true)}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        {/* Ambient & Directional Lights */}
        <ambientLight intensity={1.1} />
        <directionalLight position={[4, 6, 4]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-3, 2, 2]} intensity={1.5} color="#7c3aed" distance={8} />
        <pointLight position={[3, 1, 2]} intensity={1.5} color="#0284c7" distance={8} />
        <pointLight position={[0, 3, -1]} intensity={1.2} color="#f472b6" distance={6} />

        {/* 3D Scene Elements */}
        <Bookshelf />
        <OpenBookModel />
        <FloatingLetters />

        {/* Orbit controls */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 2 + 0.1}
          minPolarAngle={Math.PI / 3}
          maxAzimuthAngle={Math.PI / 5}
          minAzimuthAngle={-Math.PI / 5}
        />
      </Canvas>

      {/* Floating 3D Badge Overlay */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-slate-200 text-xs font-bold text-slate-800 shadow-sm">
        <span className="w-2 h-2 rounded-full bg-purple-600 animate-pulse" />
        <span>3D WebGL Sahna</span>
      </div>
      <div className="absolute bottom-4 right-4 z-10 text-[11px] text-slate-500 bg-white/80 backdrop-blur-sm px-2.5 py-1 rounded-md border border-slate-200">
        Sichqoncha bilan aylantirish ↻
      </div>
    </div>
  );
};

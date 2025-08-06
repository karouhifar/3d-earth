import { Canvas } from '@react-three/fiber';
import { OrbitControls, useTexture } from '@react-three/drei';
import { Suspense } from 'react';

function EarthMesh() {
  const texture = useTexture('/images/earth/earth.jpg');
  return (
    <mesh>
      <sphereGeometry args={[2, 32, 32]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
}

export default function Earth() {
  return (
    <Canvas className="w-full h-full bg-black">
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} />
      <Suspense fallback={null}>
        <EarthMesh />
      </Suspense>
      <OrbitControls />
    </Canvas>
  );
}

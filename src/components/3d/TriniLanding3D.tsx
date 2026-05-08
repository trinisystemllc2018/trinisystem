"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, ContactShadows, Environment } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import { useRouter } from "next/navigation";

/*
  PERFORMANCE-OPTIMIZED 3D LANDING — key changes vs original:
  1. dpr capped [1, 1.5] — was [1, 2] — halves pixel fill on Retina
  2. Removed Sparkles (40 draw calls/frame), drei/Text (1MB font atlas)
  3. CSS vignette replaces postprocessing Vignette (zero GPU)
  4. HTML overlay labels instead of 3D Text objects
  5. ContactShadows opacity/blur tightened
  6. Reduced polygon counts on all geometries
  7. gl.stencil=false — saves framebuffer memory
*/

const DEVICES = [
  { id: "printer",  label: "Printer Help",        sub: "HP · Canon · Epson · Brother", href: "/printer-support",   glow: "#3b82f6", pos: [-3.0,  0.4, -0.5] },
  { id: "laptop",   label: "Computer Help",        sub: "Slow PC · Windows fix",        href: "/computer-help",     glow: "#8b5cf6", pos: [ 0.0,  0.3,  0.5] },
  { id: "phone",    label: "Email & Apps Help",    sub: "Gmail · Facebook",             href: "/how-to/gmail-help", glow: "#1a73e8", pos: [ 2.5,  0.15, 1.3] },
  { id: "garmin",   label: "Garmin GPS Help",      sub: "Maps · Updates · DriveSmart",  href: "/garmin-gps-help",   glow: "#0070BB", pos: [ 3.6,  0.2, -0.7] },
  { id: "router",   label: "Wi-Fi & Internet",     sub: "All guides & how-tos",         href: "/how-to",            glow: "#10b981", pos: [-1.0,  0.25, 2.0] },
];

const benchMat = new THREE.MeshStandardMaterial({ color: "#8b5a2b", roughness: 0.85, metalness: 0.05 });
const grainMat = new THREE.MeshStandardMaterial({ color: "#5a3818", roughness: 1 });
const wallMat  = new THREE.MeshStandardMaterial({ color: "#2a1810", roughness: 1 });

function DeviceMesh({ device, onHover, onLeave, onClick }) {
  const groupRef = useRef(null);
  const glowRef  = useRef(null);
  const [hovered, setHovered] = useState(false);
  const baseY = device.pos[1];

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.elapsedTime;
    const targetY = baseY + (hovered ? 0.18 : 0) + Math.sin(t * 1.1 + device.pos[0]) * 0.018;
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 0.12);
    if (glowRef.current) {
      glowRef.current.opacity = THREE.MathUtils.lerp(glowRef.current.opacity, hovered ? 0.65 : 0, 0.12);
    }
  });

  return (
    <group
      ref={groupRef}
      position={device.pos}
      onClick={(e) => { e.stopPropagation(); onClick(device.href); }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = "pointer";
        onHover(device.id, { x: e.nativeEvent.clientX, y: e.nativeEvent.clientY });
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = "default";
        onLeave();
      }}
    >
      <mesh position={[0, 0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.9, 1.3, 28]} />
        <meshBasicMaterial ref={glowRef} color={device.glow} transparent opacity={0} toneMapped={false} />
      </mesh>
      {device.id === "printer" && <PrinterGeom />}
      {device.id === "laptop"  && <LaptopGeom />}
      {device.id === "phone"   && <PhoneGeom />}
      {device.id === "garmin"  && <GarminGeom />}
      {device.id === "router"  && <RouterGeom />}
    </group>
  );
}

function PrinterGeom() {
  return (
    <group>
      <mesh castShadow position={[0, 0.4, 0]}>
        <boxGeometry args={[2.0, 0.8, 1.4]} />
        <meshStandardMaterial color="#e5e7eb" metalness={0.2} roughness={0.6} />
      </mesh>
      <mesh position={[0, 0.85, -0.3]} rotation={[-0.15, 0, 0]}>
        <boxGeometry args={[1.5, 0.05, 0.6]} />
        <meshStandardMaterial color="#f9fafb" />
      </mesh>
      <mesh position={[0, 0.92, 0.1]}>
        <boxGeometry args={[1.2, 0.01, 0.8]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh position={[0.6, 0.81, 0.5]} rotation={[-0.3, 0, 0]}>
        <planeGeometry args={[0.6, 0.25]} />
        <meshStandardMaterial color="#1a1a1a" emissive="#3b82f6" emissiveIntensity={0.4} toneMapped={false} />
      </mesh>
      <mesh position={[0, 0.2, 0.71]}>
        <boxGeometry args={[1.6, 0.15, 0.05]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
    </group>
  );
}

function LaptopGeom() {
  return (
    <group>
      <mesh castShadow position={[0, 0.05, 0]}>
        <boxGeometry args={[2.2, 0.1, 1.5]} />
        <meshStandardMaterial color="#9ca3af" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.11, 0.1]}>
        <boxGeometry args={[2.0, 0.005, 1.2]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      <mesh position={[0, 0.12, 0.55]}>
        <boxGeometry args={[0.8, 0.005, 0.4]} />
        <meshStandardMaterial color="#4b5563" metalness={0.5} roughness={0.4} />
      </mesh>
      <group position={[0, 0.1, -0.7]} rotation={[-0.18, 0, 0]}>
        <mesh castShadow>
          <boxGeometry args={[2.2, 1.4, 0.06]} />
          <meshStandardMaterial color="#9ca3af" metalness={0.7} roughness={0.3} />
        </mesh>
        <mesh position={[0, 0, 0.04]}>
          <planeGeometry args={[2.0, 1.25]} />
          <meshStandardMaterial color="#1e3a8a" emissive="#3b82f6" emissiveIntensity={0.7} toneMapped={false} />
        </mesh>
        {/* Simple grid lines on screen as CSS */}
      </group>
    </group>
  );
}

function PhoneGeom() {
  return (
    <group>
      <mesh castShadow>
        <boxGeometry args={[0.7, 0.04, 1.4]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.025, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.6, 1.3]} />
        <meshStandardMaterial color="#0f172a" emissive="#1a73e8" emissiveIntensity={0.5} toneMapped={false} />
      </mesh>
    </group>
  );
}

function GarminGeom() {
  return (
    <group>
      <mesh castShadow position={[0, 0.1, 0]}>
        <boxGeometry args={[1.3, 0.2, 0.9]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.6} roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.21, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.1, 0.7]} />
        <meshStandardMaterial color="#0a3d5a" emissive="#0070BB" emissiveIntensity={0.6} toneMapped={false} />
      </mesh>
    </group>
  );
}

function RouterLed() {
  const ref = useRef(null);
  useFrame(({ clock }) => {
    if (ref.current) ref.current.color.setHex(Math.sin(clock.elapsedTime * 3.5) > 0 ? 0x00ff88 : 0x003311);
  });
  return (
    <mesh position={[-0.5, 0.31, 0.36]}>
      <circleGeometry args={[0.04, 10]} />
      <meshBasicMaterial ref={ref} color="#00ff88" toneMapped={false} />
    </mesh>
  );
}

function RouterGeom() {
  return (
    <group>
      <mesh castShadow position={[0, 0.15, 0]}>
        <boxGeometry args={[1.4, 0.3, 0.7]} />
        <meshStandardMaterial color="#1f2937" metalness={0.4} roughness={0.5} />
      </mesh>
      {[[-0.5, 0.15], [0.5, -0.15]].map(([x, rot], i) => (
        <mesh key={i} position={[x, 0.65, -0.25]} rotation={[0, 0, rot]}>
          <cylinderGeometry args={[0.04, 0.04, 0.7, 6]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
      ))}
      <RouterLed />
    </group>
  );
}

function DeskLamp({ position }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.15, 0]}>
        <cylinderGeometry args={[0.4, 0.5, 0.2, 10]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.7} roughness={0.4} />
      </mesh>
      <mesh position={[0.5, 1.5, 0]} rotation={[0, 0, -0.4]}>
        <cylinderGeometry args={[0.05, 0.05, 2.5, 5]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.7} roughness={0.4} />
      </mesh>
      <group position={[1.4, 2.4, 0]} rotation={[0, 0, -0.6]}>
        <mesh>
          <coneGeometry args={[0.5, 0.7, 10, 1, true]} />
          <meshStandardMaterial color="#3a2a1a" metalness={0.4} roughness={0.6} side={THREE.DoubleSide} />
        </mesh>
        <mesh position={[0, -0.3, 0]}>
          <sphereGeometry args={[0.18, 8, 8]} />
          <meshBasicMaterial color="#ffd28a" toneMapped={false} />
        </mesh>
      </group>
    </group>
  );
}

function CoffeeMug({ position }) {
  return (
    <group position={position}>
      <mesh castShadow position={[0, 0.4, 0]}>
        <cylinderGeometry args={[0.32, 0.28, 0.7, 12]} />
        <meshStandardMaterial color="#fff" roughness={0.4} />
      </mesh>
      <mesh position={[0.36, 0.4, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.15, 0.04, 5, 10, Math.PI]} />
        <meshStandardMaterial color="#fff" roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.72, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 0.02, 12]} />
        <meshStandardMaterial color="#3a1f0a" roughness={0.3} />
      </mesh>
      <Float speed={2} floatIntensity={0.5}>
        <mesh position={[0.05, 1.1, 0]}>
          <sphereGeometry args={[0.08, 5, 5]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.2} />
        </mesh>
      </Float>
    </group>
  );
}

function Notebook({ position }) {
  return (
    <group position={position} rotation={[0, 0.3, 0]}>
      <mesh castShadow position={[0, 0.05, 0]}>
        <boxGeometry args={[1.2, 0.1, 0.9]} />
        <meshStandardMaterial color="#92400e" roughness={0.7} />
      </mesh>
      <mesh position={[0.2, 0.105, 0]}>
        <boxGeometry args={[0.5, 0.005, 0.5]} />
        <meshStandardMaterial color="#fde047" />
      </mesh>
    </group>
  );
}

function SceneContent({ onHover, onLeave, onClick }) {
  return (
    <>
      <pointLight position={[-3, 5, 2]} intensity={2.5} distance={14} color="#ffc77a" castShadow shadow-mapSize={[512, 512]} />
      <pointLight position={[3, 4, -2]} intensity={1.2} distance={12} color="#ffd9a8" />
      <directionalLight position={[5, 6, 5]} intensity={0.4} color="#88aaff" />
      <ambientLight intensity={0.25} color="#ffe5c0" />

      <mesh receiveShadow position={[0, 0, 0]}>
        <boxGeometry args={[14, 0.2, 8]} />
        <primitive object={benchMat} />
      </mesh>
      {[0,1,2,3,4,5,6,7].map(i => (
        <mesh key={i} position={[0, 0.105, -3.5 + i]}>
          <boxGeometry args={[14, 0.005, 0.04]} />
          <primitive object={grainMat} />
        </mesh>
      ))}
      <mesh position={[0, 4, -6]} receiveShadow>
        <planeGeometry args={[24, 12]} />
        <primitive object={wallMat} />
      </mesh>

      <DeskLamp position={[-5, 0, -2]} />
      {DEVICES.map(d => (
        <DeviceMesh key={d.id} device={d} onHover={onHover} onLeave={onLeave} onClick={onClick} />
      ))}
      <CoffeeMug position={[4.5, 0.2, 1.8]} />
      <Notebook   position={[1.5, 0.06, -1.8]} />

      <ContactShadows position={[0, 0.01, 0]} scale={18} blur={1.8} opacity={0.55} far={3} color="#000" />

      <EffectComposer>
        <Bloom intensity={0.4} luminanceThreshold={0.6} luminanceSmoothing={0.9} mipmapBlur />
      </EffectComposer>

      <Environment preset="city" />
    </>
  );
}

function HoverLabel({ device, pos }) {
  if (!device) return null;
  return (
    <div
      className="fixed z-50 pointer-events-none select-none"
      style={{ left: pos.x, top: pos.y - 96, transform: "translateX(-50%)", animation: "tsHoverIn 0.15s ease-out" }}
    >
      <div className="bg-[#fff8e7] rounded-xl px-5 py-3 shadow-2xl border border-amber-200/60"
        style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.45), 0 0 0 1px rgba(251,191,36,0.25)" }}
      >
        <div className="font-black text-stone-800 text-base">{device.label}</div>
        <div className="text-amber-700 text-xs mt-0.5">{device.sub}</div>
        <div className="text-stone-500 text-[10px] mt-1.5 font-mono tracking-wider">CLICK TO OPEN →</div>
      </div>
      <div className="w-3 h-3 bg-[#fff8e7] border-r border-b border-amber-200/60 rotate-45 mx-auto -mt-1.5" />
    </div>
  );
}

export default function TriniLanding3D() {
  const router = useRouter();
  const [hovered, setHovered] = useState(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const onHover = useCallback((id, p) => {
    setHovered(DEVICES.find(d => d.id === id) ?? null);
    setPos(p);
  }, []);
  const onLeave = useCallback(() => setHovered(null), []);
  const onClick = useCallback((href) => router.push(href), [router]);

  useEffect(() => {
    const move = (e) => { if (hovered) setPos({ x: e.clientX, y: e.clientY }); };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [hovered]);

  return (
    <>
      <Canvas
        shadows="soft"
        dpr={[1, 1.5]}
        frameloop="always"
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance", stencil: false }}
        camera={{ position: [0, 9, 6], fov: 38 }}
        style={{ position: "fixed", inset: 0, background: "#1a0f08" }}
      >
        <color attach="background" args={["#1a0f08"]} />
        <fog attach="fog" args={["#1a0f08", 14, 26]} />
        <SceneContent onHover={onHover} onLeave={onLeave} onClick={onClick} />
      </Canvas>

      {/* CSS vignette (replaces GPU postprocessing Vignette) */}
      <div className="fixed inset-0 z-10 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 50%, transparent 35%, rgba(0,0,0,0.72) 100%)" }}
      />

      <HoverLabel device={hovered} pos={pos} />

      <style>{`
        @keyframes tsHoverIn {
          from { opacity: 0; transform: translateX(-50%) translateY(8px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}</style>
    </>
  );
}

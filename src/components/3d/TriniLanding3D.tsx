"use client";

import { useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Text,
  RoundedBox,
  Environment,
  Float,
  Sparkles,
  ContactShadows,
} from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";
import { useRouter } from "next/navigation";

/* ════════════════════════════════════════════════════════════════════
   TriniLanding3D — "The Workshop Bench"

   Top-down camera looking at a warm wooden workbench with:
     - Inkjet PRINTER (paper tray, control panel) → /printer-support
     - LAPTOP (open, glowing screen)              → /computer-help
     - SMARTPHONE                                  → /how-to/gmail-help
     - GARMIN GPS unit                            → /garmin-gps-help
     - WI-FI ROUTER                                → /how-to (general)
     - Coffee mug + tools as decoration (non-clickable)

   Each device:
     - Glows softly on hover
     - Floats label tag with name
     - Click = router.push(...)

   No scroll narrative. Camera stays put. Devices are the focus.

   Senior-friendly because:
     - Devices look exactly like the things they own
     - No abstract pillars or hallways
     - Click target = the device itself
     - Warm wood + lamp light = "trusted craftsman's bench"
═════════════════════════════════════════════════════════════════════ */

type Device = {
  id: string;
  label: string;
  href: string;
  glow: string;
};

/* ════════════════════════════════════════════════════════════════════ */

export default function TriniLanding3D() {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      camera={{ position: [0, 9, 6], fov: 38 }}
      style={{ position: "fixed", inset: 0, background: "#1a0f08" }}
    >
      <color attach="background" args={["#1a0f08"]} />
      <fog attach="fog" args={["#1a0f08", 14, 28]} />

      {/* Warm key light from the desk lamp area */}
      <pointLight position={[-3, 5, 2]} intensity={2.5} distance={14} color="#ffc77a" castShadow />
      {/* Soft fill light */}
      <pointLight position={[3, 4, -2]} intensity={1.2} distance={12} color="#ffd9a8" />
      {/* Cool rim from window-side */}
      <directionalLight position={[5, 6, 5]} intensity={0.4} color="#88aaff" />
      <ambientLight intensity={0.25} color="#ffe5c0" />

      <Workbench />

      <ContactShadows
        position={[0, 0.01, 0]}
        scale={20}
        blur={2.5}
        opacity={0.7}
        far={4}
        color="#000"
      />

      <Sparkles
        count={40}
        scale={[12, 5, 8]}
        position={[0, 3, 0]}
        size={1.5}
        speed={0.2}
        opacity={0.4}
        color="#ffaa3a"
      />

      <EffectComposer>
        <Bloom intensity={0.5} luminanceThreshold={0.55} luminanceSmoothing={0.9} mipmapBlur />
        <Vignette eskil={false} offset={0.2} darkness={0.65} />
      </EffectComposer>

      <Environment preset="apartment" />
    </Canvas>
  );
}

/* ════════════════════════════════════════════════════════════════════
   THE WORKBENCH
═════════════════════════════════════════════════════════════════════ */

function Workbench() {
  return (
    <group>
      {/* The wooden bench surface */}
      <BenchSurface />

      {/* DESK LAMP (decoration, glows) */}
      <DeskLamp position={[-5, 0, -2]} />

      {/* DEVICES — clickable */}
      <PrinterDevice  position={[-3.0, 0.4, -0.5]} />
      <LaptopDevice   position={[ 0.0, 0.3,  0.5]} />
      <PhoneDevice    position={[ 2.5, 0.15, 1.3]} rotationY={-0.3} />
      <GarminDevice   position={[ 3.6, 0.2, -0.7]} rotationY={0.4} />
      <RouterDevice   position={[-1.0, 0.25, 2.0]} rotationY={0.2} />

      {/* DECORATIONS (non-clickable, atmosphere) */}
      <CoffeeMug    position={[ 4.5, 0.2, 1.8]} />
      <ScrewdriverTool position={[-3.5, 0.1, 1.9]} />
      <Notebook     position={[ 1.5, 0.06, -1.8]} />
      <Pen          position={[ 1.9, 0.15, -1.5]} />
    </group>
  );
}

/* ─── BENCH SURFACE ──────────────────────────────────────────────── */

function BenchSurface() {
  // Simple wood-like material — varied browns
  return (
    <group>
      {/* Wood top */}
      <mesh receiveShadow position={[0, 0, 0]}>
        <boxGeometry args={[14, 0.2, 8]} />
        <meshStandardMaterial color="#8b5a2b" roughness={0.85} metalness={0.05} />
      </mesh>
      {/* Wood grain stripes (slight color variation) */}
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh key={i} position={[0, 0.105, -3.5 + i * 1.0]}>
          <boxGeometry args={[14, 0.005, 0.04]} />
          <meshStandardMaterial color="#5a3818" roughness={1} />
        </mesh>
      ))}
      {/* Bench edge band (slightly darker) */}
      <mesh position={[0, -0.05, 4.0]}>
        <boxGeometry args={[14, 0.5, 0.15]} />
        <meshStandardMaterial color="#5a3818" roughness={0.9} />
      </mesh>
      <mesh position={[0, -0.05, -4.0]}>
        <boxGeometry args={[14, 0.5, 0.15]} />
        <meshStandardMaterial color="#5a3818" roughness={0.9} />
      </mesh>
      {/* Background wall (warm dark) */}
      <mesh position={[0, 4, -6]} receiveShadow>
        <planeGeometry args={[24, 12]} />
        <meshStandardMaterial color="#2a1810" roughness={1} />
      </mesh>
    </group>
  );
}

/* ─── DESK LAMP ──────────────────────────────────────────────────── */

function DeskLamp({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Base */}
      <mesh position={[0, 0.15, 0]}>
        <cylinderGeometry args={[0.4, 0.5, 0.2, 16]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.7} roughness={0.4} />
      </mesh>
      {/* Arm */}
      <mesh position={[0.5, 1.5, 0]} rotation={[0, 0, -0.4]}>
        <cylinderGeometry args={[0.05, 0.05, 2.5, 8]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.7} roughness={0.4} />
      </mesh>
      {/* Shade */}
      <group position={[1.4, 2.4, 0]} rotation={[0, 0, -0.6]}>
        <mesh>
          <coneGeometry args={[0.5, 0.7, 16, 1, true]} />
          <meshStandardMaterial color="#3a2a1a" metalness={0.4} roughness={0.6} side={THREE.DoubleSide} />
        </mesh>
        {/* Bulb glow */}
        <mesh position={[0, -0.3, 0]}>
          <sphereGeometry args={[0.18, 16, 16]} />
          <meshBasicMaterial color="#ffd28a" toneMapped={false} />
        </mesh>
      </group>
    </group>
  );
}

/* ════════════════════════════════════════════════════════════════════
   CLICKABLE DEVICE WRAPPER
═════════════════════════════════════════════════════════════════════ */

function ClickableDevice({
  device,
  children,
  position,
  rotationY = 0,
  glowOffset = [0, 0.1, 0],
  glowScale = [1.4, 0.05, 1.4],
}: {
  device: Device;
  children: React.ReactNode;
  position: [number, number, number];
  rotationY?: number;
  glowOffset?: [number, number, number];
  glowScale?: [number, number, number];
}) {
  const router = useRouter();
  const [hovered, setHovered] = useState(false);
  const groupRef = useRef<THREE.Group>(null);
  const glowRef = useRef<THREE.MeshBasicMaterial>(null);
  const labelRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      const targetY = position[1] + (hovered ? 0.15 : 0) + Math.sin(clock.elapsedTime * 1.2 + position[0]) * 0.015;
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 0.15);
    }
    if (glowRef.current) {
      glowRef.current.opacity = THREE.MathUtils.lerp(
        glowRef.current.opacity,
        hovered ? 0.7 : 0.0,
        0.15
      );
    }
    if (labelRef.current) {
      labelRef.current.scale.setScalar(THREE.MathUtils.lerp(labelRef.current.scale.x, hovered ? 1 : 0, 0.18));
    }
  });

  const handleClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    router.push(device.href);
  };
  const onClick = handleClick as unknown as (e: import("@react-three/fiber").ThreeEvent<MouseEvent>) => void;

  return (
    <>
      <group
        ref={groupRef}
        position={position}
        rotation={[0, rotationY, 0]}
        onClick={onClick}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = "default";
        }}
      >
        {/* Glow ring on bench beneath device */}
        <mesh position={glowOffset} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[Math.max(glowScale[0], glowScale[2]) * 0.6, Math.max(glowScale[0], glowScale[2]) * 0.95, 32]} />
          <meshBasicMaterial
            ref={glowRef}
            color={device.glow}
            transparent
            opacity={0}
            toneMapped={false}
          />
        </mesh>
        {children}
      </group>

      {/* Hover label — positioned above device, fades in */}
      <group ref={labelRef} position={[position[0], position[1] + 2.2, position[2]]} scale={0}>
        <mesh>
          <planeGeometry args={[2.4, 0.7]} />
          <meshBasicMaterial color="#fff8e7" toneMapped={false} />
        </mesh>
        <mesh position={[0, -0.4, 0.001]} rotation={[0, 0, Math.PI / 4]}>
          <planeGeometry args={[0.3, 0.3]} />
          <meshBasicMaterial color="#fff8e7" toneMapped={false} />
        </mesh>
        <Text
          position={[0, 0.08, 0.01]}
          fontSize={0.22}
          color="#1a1a1a"
          anchorX="center"
          anchorY="middle"
          maxWidth={2.2}
        >
          {device.label}
        </Text>
        <Text
          position={[0, -0.18, 0.01]}
          fontSize={0.13}
          color="#8b5a2b"
          anchorX="center"
          anchorY="middle"
        >
          Click to open →
        </Text>
      </group>
    </>
  );
}

/* ════════════════════════════════════════════════════════════════════
   DEVICES
═════════════════════════════════════════════════════════════════════ */

/* ─── PRINTER ─────────────────────────────────────────────────────── */

function PrinterDevice({ position }: { position: [number, number, number] }) {
  return (
    <ClickableDevice
      device={{ id: "printer", label: "Printer Help", href: "/printer-support", glow: "#3b82f6" }}
      position={position}
      glowScale={[2, 0.05, 1.6]}
    >
      {/* Body */}
      <mesh castShadow position={[0, 0.4, 0]}>
        <boxGeometry args={[2.0, 0.8, 1.4]} />
        <meshStandardMaterial color="#e5e7eb" metalness={0.2} roughness={0.6} />
      </mesh>
      {/* Top tray (paper area) */}
      <mesh position={[0, 0.85, -0.3]} rotation={[-0.15, 0, 0]}>
        <boxGeometry args={[1.5, 0.05, 0.6]} />
        <meshStandardMaterial color="#f9fafb" metalness={0.1} roughness={0.5} />
      </mesh>
      {/* Paper sticking out */}
      <mesh position={[0, 0.92, 0.1]} rotation={[-0.05, 0, 0]}>
        <boxGeometry args={[1.2, 0.01, 0.8]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      {/* Front output slot */}
      <mesh position={[0, 0.2, 0.71]}>
        <boxGeometry args={[1.6, 0.15, 0.05]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      {/* Control panel */}
      <mesh position={[0.6, 0.81, 0.5]} rotation={[-0.3, 0, 0]}>
        <planeGeometry args={[0.6, 0.25]} />
        <meshStandardMaterial color="#1a1a1a" emissive="#3b82f6" emissiveIntensity={0.3} toneMapped={false} />
      </mesh>
      {/* Brand label */}
      <Text
        position={[0, 0.5, 0.71]}
        fontSize={0.1}
        color="#6b7280"
        anchorX="center"
        anchorY="middle"
      >
        ALL BRANDS · HP · CANON · EPSON
      </Text>
    </ClickableDevice>
  );
}

/* ─── LAPTOP ─────────────────────────────────────────────────────── */

function LaptopDevice({ position }: { position: [number, number, number] }) {
  return (
    <ClickableDevice
      device={{ id: "laptop", label: "Computer Help", href: "/computer-help", glow: "#8b5cf6" }}
      position={position}
      glowScale={[2, 0.05, 1.6]}
    >
      {/* Base (keyboard) */}
      <mesh castShadow position={[0, 0.05, 0]}>
        <boxGeometry args={[2.2, 0.1, 1.5]} />
        <meshStandardMaterial color="#9ca3af" metalness={0.7} roughness={0.3} />
      </mesh>
      {/* Keyboard area inset */}
      <mesh position={[0, 0.11, 0.1]}>
        <boxGeometry args={[2.0, 0.005, 1.2]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      {/* Trackpad */}
      <mesh position={[0, 0.12, 0.55]}>
        <boxGeometry args={[0.8, 0.005, 0.4]} />
        <meshStandardMaterial color="#4b5563" metalness={0.5} roughness={0.4} />
      </mesh>
      {/* Screen (open at angle) */}
      <group position={[0, 0.1, -0.7]} rotation={[-0.18, 0, 0]}>
        <mesh castShadow>
          <boxGeometry args={[2.2, 1.4, 0.06]} />
          <meshStandardMaterial color="#9ca3af" metalness={0.7} roughness={0.3} />
        </mesh>
        {/* Screen face */}
        <mesh position={[0, 0, 0.04]}>
          <planeGeometry args={[2.0, 1.25]} />
          <meshStandardMaterial
            color="#1e3a8a"
            emissive="#3b82f6"
            emissiveIntensity={0.7}
            toneMapped={false}
          />
        </mesh>
        <Text position={[0, 0.25, 0.05]} fontSize={0.18} color="#fff" anchorX="center" anchorY="middle">
          TRINI SYSTEM
        </Text>
        <Text position={[0, -0.05, 0.05]} fontSize={0.09} color="#bfdbfe" anchorX="center" anchorY="middle">
          Slow PC? Virus? Windows error?
        </Text>
        <Text position={[0, -0.3, 0.05]} fontSize={0.1} color="#fbbf24" anchorX="center" anchorY="middle">
          Free first call: 347-953-1531
        </Text>
      </group>
    </ClickableDevice>
  );
}

/* ─── PHONE ──────────────────────────────────────────────────────── */

function PhoneDevice({ position, rotationY }: { position: [number, number, number]; rotationY: number }) {
  return (
    <ClickableDevice
      device={{ id: "phone", label: "Email & Apps Help", href: "/how-to/gmail-help", glow: "#1a73e8" }}
      position={position}
      rotationY={rotationY}
      glowScale={[1, 0.05, 1.6]}
    >
      {/* Body */}
      <mesh castShadow>
        <boxGeometry args={[0.7, 0.04, 1.4]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.7} roughness={0.3} />
      </mesh>
      {/* Screen */}
      <mesh position={[0, 0.025, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.6, 1.3]} />
        <meshStandardMaterial
          color="#0f172a"
          emissive="#1a73e8"
          emissiveIntensity={0.5}
          toneMapped={false}
        />
      </mesh>
      {/* Screen content */}
      <Text
        position={[0, 0.04, -0.3]}
        rotation={[-Math.PI / 2, 0, 0]}
        fontSize={0.1}
        color="#fff"
        anchorX="center"
        anchorY="middle"
      >
        GMAIL
      </Text>
      <Text
        position={[0, 0.04, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        fontSize={0.06}
        color="#bfdbfe"
        anchorX="center"
        anchorY="middle"
      >
        Login · Recovery
      </Text>
      <Text
        position={[0, 0.04, 0.3]}
        rotation={[-Math.PI / 2, 0, 0]}
        fontSize={0.06}
        color="#fbbf24"
        anchorX="center"
        anchorY="middle"
      >
        FACEBOOK · APPS
      </Text>
    </ClickableDevice>
  );
}

/* ─── GARMIN GPS ─────────────────────────────────────────────────── */

function GarminDevice({ position, rotationY }: { position: [number, number, number]; rotationY: number }) {
  return (
    <ClickableDevice
      device={{ id: "garmin", label: "Garmin GPS Help", href: "/garmin-gps-help", glow: "#0070BB" }}
      position={position}
      rotationY={rotationY}
      glowScale={[1.2, 0.05, 1]}
    >
      {/* Body */}
      <mesh castShadow position={[0, 0.1, 0]}>
        <boxGeometry args={[1.3, 0.2, 0.9]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.6} roughness={0.4} />
      </mesh>
      {/* Screen */}
      <mesh position={[0, 0.21, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.1, 0.7]} />
        <meshStandardMaterial
          color="#0a3d5a"
          emissive="#0070BB"
          emissiveIntensity={0.6}
          toneMapped={false}
        />
      </mesh>
      {/* Map-like lines on screen */}
      <Text
        position={[0, 0.22, -0.2]}
        rotation={[-Math.PI / 2, 0, 0]}
        fontSize={0.09}
        color="#fff"
        anchorX="center"
        anchorY="middle"
      >
        GARMIN
      </Text>
      <Text
        position={[0, 0.22, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        fontSize={0.06}
        color="#bfdbfe"
        anchorX="center"
        anchorY="middle"
      >
        Maps · Updates
      </Text>
      <Text
        position={[0, 0.22, 0.18]}
        rotation={[-Math.PI / 2, 0, 0]}
        fontSize={0.06}
        color="#fde68a"
        anchorX="center"
        anchorY="middle"
      >
        nuvi · DriveSmart
      </Text>
    </ClickableDevice>
  );
}

/* ─── ROUTER ─────────────────────────────────────────────────────── */

function RouterDevice({ position, rotationY }: { position: [number, number, number]; rotationY: number }) {
  const ledRef = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (ledRef.current) {
      const m = ledRef.current.material as THREE.MeshBasicMaterial;
      m.color.setHex(Math.sin(clock.elapsedTime * 4) > 0 ? 0x00ff88 : 0x004422);
    }
  });
  return (
    <ClickableDevice
      device={{ id: "router", label: "Wi-Fi & Internet Help", href: "/how-to", glow: "#10b981" }}
      position={position}
      rotationY={rotationY}
      glowScale={[1.6, 0.05, 1]}
    >
      {/* Body */}
      <mesh castShadow position={[0, 0.15, 0]}>
        <boxGeometry args={[1.4, 0.3, 0.7]} />
        <meshStandardMaterial color="#1f2937" metalness={0.4} roughness={0.5} />
      </mesh>
      {/* Antennas */}
      <mesh position={[-0.5, 0.65, -0.25]} rotation={[0, 0, 0.15]}>
        <cylinderGeometry args={[0.04, 0.04, 0.7, 8]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      <mesh position={[0.5, 0.65, -0.25]} rotation={[0, 0, -0.15]}>
        <cylinderGeometry args={[0.04, 0.04, 0.7, 8]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      {/* Indicator LEDs */}
      <mesh ref={ledRef} position={[-0.5, 0.31, 0.36]}>
        <circleGeometry args={[0.04, 16]} />
        <meshBasicMaterial color="#00ff88" toneMapped={false} />
      </mesh>
      <mesh position={[-0.3, 0.31, 0.36]}>
        <circleGeometry args={[0.04, 16]} />
        <meshBasicMaterial color="#fbbf24" toneMapped={false} />
      </mesh>
      <Text
        position={[0.2, 0.31, 0.36]}
        fontSize={0.08}
        color="#9ca3af"
        anchorX="left"
        anchorY="middle"
      >
        WIFI
      </Text>
    </ClickableDevice>
  );
}

/* ════════════════════════════════════════════════════════════════════
   DECORATIONS (non-clickable)
═════════════════════════════════════════════════════════════════════ */

function CoffeeMug({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh castShadow position={[0, 0.4, 0]}>
        <cylinderGeometry args={[0.32, 0.28, 0.7, 16]} />
        <meshStandardMaterial color="#fff" roughness={0.4} />
      </mesh>
      {/* Handle */}
      <mesh position={[0.36, 0.4, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.15, 0.04, 8, 16, Math.PI]} />
        <meshStandardMaterial color="#fff" roughness={0.4} />
      </mesh>
      {/* Coffee surface */}
      <mesh position={[0, 0.72, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 0.02, 16]} />
        <meshStandardMaterial color="#3a1f0a" roughness={0.3} />
      </mesh>
      {/* Steam */}
      <Float speed={2} floatIntensity={0.5}>
        <mesh position={[0.05, 1.1, 0]}>
          <sphereGeometry args={[0.08, 8, 8]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.2} />
        </mesh>
      </Float>
      <Float speed={1.5} floatIntensity={0.4}>
        <mesh position={[-0.05, 1.4, 0.05]}>
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.15} />
        </mesh>
      </Float>
    </group>
  );
}

function ScrewdriverTool({ position }: { position: [number, number, number] }) {
  return (
    <group position={position} rotation={[0, 0.4, 0]}>
      {/* Handle */}
      <mesh castShadow position={[-0.4, 0.06, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.08, 0.08, 0.5, 12]} />
        <meshStandardMaterial color="#dc2626" roughness={0.6} />
      </mesh>
      {/* Shaft */}
      <mesh position={[0.1, 0.06, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.025, 0.025, 0.6, 8]} />
        <meshStandardMaterial color="#9ca3af" metalness={0.9} roughness={0.2} />
      </mesh>
    </group>
  );
}

function Notebook({ position }: { position: [number, number, number] }) {
  return (
    <group position={position} rotation={[0, 0.3, 0]}>
      <mesh castShadow position={[0, 0.05, 0]}>
        <boxGeometry args={[1.2, 0.1, 0.9]} />
        <meshStandardMaterial color="#92400e" roughness={0.7} />
      </mesh>
      {/* Spiral binding */}
      {Array.from({ length: 7 }).map((_, i) => (
        <mesh key={i} position={[-0.55, 0.1, -0.4 + i * 0.13]}>
          <torusGeometry args={[0.04, 0.012, 8, 16]} />
          <meshStandardMaterial color="#9ca3af" metalness={0.9} roughness={0.2} />
        </mesh>
      ))}
      {/* Sticky note */}
      <mesh position={[0.2, 0.105, 0]}>
        <boxGeometry args={[0.5, 0.005, 0.5]} />
        <meshStandardMaterial color="#fde047" />
      </mesh>
      <Text
        position={[0.2, 0.11, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        fontSize={0.08}
        color="#1f2937"
        anchorX="center"
        anchorY="middle"
      >
        347-953-1531
      </Text>
    </group>
  );
}

function Pen({ position }: { position: [number, number, number] }) {
  return (
    <group position={position} rotation={[0, 0, Math.PI / 2 + 0.3]}>
      <mesh castShadow>
        <cylinderGeometry args={[0.025, 0.025, 0.7, 8]} />
        <meshStandardMaterial color="#1f2937" metalness={0.5} roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.4, 0]}>
        <coneGeometry args={[0.025, 0.1, 8]} />
        <meshStandardMaterial color="#9ca3af" metalness={0.9} roughness={0.2} />
      </mesh>
    </group>
  );
}

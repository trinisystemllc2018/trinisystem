"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  ScrollControls,
  useScroll,
  Text,
  RoundedBox,
  MeshReflectorMaterial,
  Environment,
} from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";
import { useRouter } from "next/navigation";

/* ════════════════════════════════════════════════════════════════════
   TriniLanding3D — Wonderland-inspired 3D scroll experience.

   Scroll narrative (driven by drei's ScrollControls):
     0%      → Camera outside; desktop computer monitor sits front and center
     0-20%   → Camera flies INTO the monitor screen
     20-100% → Camera glides through dark hallway past 10 service panels

   Service panels (cards that link to existing pages):
     1.  Printer Help            → /printer-support
     2.  Computer Help           → /computer-help
     3.  GPS Help                → /gps-help
     4.  Virus Removal           → /virus-removal
     5.  Garmin GPS Help         → /garmin-gps-help
     6.  Gmail Help              → /how-to/gmail-help
     7.  Facebook Help           → /how-to/facebook-help
     8.  Garmin Apps             → /how-to/garmin-express
     9.  How-To Guides           → /how-to
     10. Free PC Cleaner         → /products

   All primitives — no GLB models needed. ~30KB scene definition,
   loads in 1-2s on home internet.
═════════════════════════════════════════════════════════════════════ */

type Panel = {
  title: string;
  subtitle: string;
  href: string;
  color: string;
  accent: string;
};

const PANELS: Panel[] = [
  { title: "PRINTER HELP",       subtitle: "HP · Canon · Epson · Brother",  href: "/printer-support",       color: "#3b82f6", accent: "#60a5fa" },
  { title: "COMPUTER HELP",      subtitle: "Slow PC · Windows fix",         href: "/computer-help",         color: "#8b5cf6", accent: "#a78bfa" },
  { title: "GPS HELP",           subtitle: "Maps · Updates · Routing",      href: "/gps-help",              color: "#10b981", accent: "#34d399" },
  { title: "VIRUS REMOVAL",      subtitle: "Malware · Pop-ups · Speed",     href: "/virus-removal",         color: "#ef4444", accent: "#f87171" },
  { title: "GARMIN GPS",         subtitle: "Nuvi · DriveSmart · Watch",     href: "/garmin-gps-help",       color: "#0070BB", accent: "#3b9bd9" },
  { title: "GMAIL HELP",         subtitle: "Login · Recovery · Setup",      href: "/how-to/gmail-help",     color: "#1a73e8", accent: "#4285f4" },
  { title: "FACEBOOK HELP",      subtitle: "Hacked · Recovery · Privacy",   href: "/how-to/facebook-help",  color: "#1877F2", accent: "#42a5f5" },
  { title: "GARMIN APPS",        subtitle: "Express · Connect · Pilot",     href: "/how-to/garmin-express", color: "#005A96", accent: "#0284c7" },
  { title: "HOW-TO GUIDES",      subtitle: "All step-by-step help",         href: "/how-to",                color: "#f59e0b", accent: "#fbbf24" },
  { title: "FREE PC CLEANER",    subtitle: "TriniCleaner download",         href: "/products",              color: "#14b8a6", accent: "#2dd4bf" },
];

/* ─── HALL GEOMETRY CONSTANTS ────────────────────────────────────── */
const HALL_LENGTH = 100;          // Z depth of the hallway
const HALL_WIDTH = 14;            // X width
const HALL_HEIGHT = 8;            // Y height
const PANEL_SPACING = 8;          // Z distance between panels
const PANEL_X_OFFSET = 4.5;       // Distance from center line

/* ════════════════════════════════════════════════════════════════════
   PUBLIC ENTRY
═════════════════════════════════════════════════════════════════════ */

export default function TriniLanding3D() {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: false }}
      camera={{ position: [0, 1.5, 8], fov: 55 }}
      style={{ position: "fixed", inset: 0, background: "#0a0a0a" }}
    >
      <color attach="background" args={["#0a0a0a"]} />
      <fog attach="fog" args={["#0a0a0a", 20, 80]} />

      <ScrollControls pages={5} damping={0.25}>
        <Scene />
      </ScrollControls>

      <EffectComposer>
        <Bloom intensity={0.6} luminanceThreshold={0.4} luminanceSmoothing={0.9} mipmapBlur />
        <Vignette eskil={false} offset={0.1} darkness={0.7} />
      </EffectComposer>

      <Environment preset="night" />
    </Canvas>
  );
}

/* ════════════════════════════════════════════════════════════════════
   SCENE
═════════════════════════════════════════════════════════════════════ */

function Scene() {
  const scroll = useScroll();
  const camRef = useRef<THREE.Vector3>(new THREE.Vector3());

  useFrame((state) => {
    const t = scroll.offset; // 0 → 1

    // Camera path:
    // 0.0 - 0.2: zoom INTO monitor (8 → 0 z, slight up)
    // 0.2 - 1.0: travel through hallway (0 → -HALL_LENGTH+5)

    if (t < 0.2) {
      const k = t / 0.2;
      const z = THREE.MathUtils.lerp(8, 0.5, k);
      const y = THREE.MathUtils.lerp(1.5, 2.0, k);
      state.camera.position.set(0, y, z);
      state.camera.lookAt(0, 2, 0);
    } else {
      const k = (t - 0.2) / 0.8;
      const z = THREE.MathUtils.lerp(0.5, -(HALL_LENGTH - 8), k);
      state.camera.position.set(0, 2.4, z);
      state.camera.lookAt(0, 2.4, z - 5);
    }
  });

  return (
    <>
      {/* AMBIENT + KEY LIGHTS */}
      <ambientLight intensity={0.15} />
      <directionalLight position={[0, 8, 5]} intensity={0.3} color="#fff5e0" castShadow />

      {/* The desktop computer at scene entry (z=0 area) */}
      <DesktopComputer />

      {/* The hallway extends from z=-2 backwards into the distance */}
      <Hallway />

      {/* Service panels lining the hallway */}
      {PANELS.map((panel, i) => {
        const z = -8 - i * PANEL_SPACING;
        const isLeft = i % 2 === 0;
        const x = isLeft ? -PANEL_X_OFFSET : PANEL_X_OFFSET;
        return (
          <ServicePanel
            key={panel.title}
            panel={panel}
            position={[x, 2.4, z]}
            rotationY={isLeft ? 0.35 : -0.35}
          />
        );
      })}

      {/* Pillar lights — warm amber points along ceiling */}
      {Array.from({ length: 12 }).map((_, i) => (
        <pointLight
          key={i}
          position={[0, HALL_HEIGHT - 0.5, -i * 8]}
          intensity={1.2}
          distance={12}
          color="#ffaa3a"
        />
      ))}
    </>
  );
}

/* ════════════════════════════════════════════════════════════════════
   DESKTOP COMPUTER (entry mesh)
═════════════════════════════════════════════════════════════════════ */

function DesktopComputer() {
  const screenRef = useRef<THREE.Mesh>(null);
  // subtle screen flicker/glow
  useFrame(({ clock }) => {
    if (screenRef.current) {
      const m = screenRef.current.material as THREE.MeshStandardMaterial;
      m.emissiveIntensity = 0.55 + Math.sin(clock.elapsedTime * 2) * 0.05;
    }
  });

  return (
    <group position={[0, 1.5, 0]}>
      {/* Monitor body (bezel) */}
      <RoundedBox args={[6.4, 4.2, 0.35]} radius={0.08} smoothness={4} position={[0, 0.5, 0]}>
        <meshStandardMaterial color="#1a1a1a" metalness={0.5} roughness={0.3} />
      </RoundedBox>

      {/* Screen — emissive */}
      <mesh ref={screenRef} position={[0, 0.5, 0.18]}>
        <planeGeometry args={[5.9, 3.7]} />
        <meshStandardMaterial
          color="#0a3d8f"
          emissive="#1a73e8"
          emissiveIntensity={0.55}
          metalness={0.2}
          roughness={0.5}
        />
      </mesh>

      {/* Screen content text */}
      <Text
        position={[0, 1.4, 0.2]}
        fontSize={0.45}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        maxWidth={5}
      >
        TRINI SYSTEM
      </Text>
      <Text
        position={[0, 0.8, 0.2]}
        fontSize={0.22}
        color="#bfdbfe"
        anchorX="center"
        anchorY="middle"
        maxWidth={5}
      >
        SENIOR-FRIENDLY TECH SUPPORT
      </Text>
      <Text
        position={[0, 0.1, 0.2]}
        fontSize={0.16}
        color="#93c5fd"
        anchorX="center"
        anchorY="middle"
        maxWidth={5}
      >
        Printer Repair · PC Help · GPS · Virus Removal
      </Text>
      <Text
        position={[0, -0.6, 0.2]}
        fontSize={0.34}
        color="#fbbf24"
        anchorX="center"
        anchorY="middle"
      >
        Scroll to enter ↓
      </Text>
      <Text
        position={[0, -1.3, 0.2]}
        fontSize={0.18}
        color="#fde68a"
        anchorX="center"
        anchorY="middle"
      >
        347-953-1531
      </Text>

      {/* Monitor stand */}
      <mesh position={[0, -2.0, 0]}>
        <boxGeometry args={[0.4, 0.8, 0.4]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.5} roughness={0.4} />
      </mesh>
      <mesh position={[0, -2.5, 0]}>
        <boxGeometry args={[2.5, 0.15, 1.2]} />
        <meshStandardMaterial color="#0d0d0d" metalness={0.6} roughness={0.3} />
      </mesh>

      {/* Desk surface (large dark plane below monitor) */}
      <mesh position={[0, -2.6, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 8]} />
        <meshStandardMaterial color="#0a0a0a" metalness={0.3} roughness={0.6} />
      </mesh>
    </group>
  );
}

/* ════════════════════════════════════════════════════════════════════
   HALLWAY
═════════════════════════════════════════════════════════════════════ */

function Hallway() {
  // Pillar positions repeated along Z
  const pillarZs = useMemo(() => {
    const zs: number[] = [];
    for (let z = -2; z > -HALL_LENGTH; z -= 6) zs.push(z);
    return zs;
  }, []);

  return (
    <group>
      {/* Reflective floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -HALL_LENGTH / 2]} receiveShadow>
        <planeGeometry args={[HALL_WIDTH * 1.5, HALL_LENGTH + 10]} />
        <MeshReflectorMaterial
          blur={[300, 100]}
          resolution={1024}
          mixBlur={1}
          mixStrength={40}
          roughness={0.7}
          depthScale={1.2}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#0a0a0a"
          metalness={0.6}
          mirror={0}
        />
      </mesh>

      {/* Walls */}
      <mesh position={[-HALL_WIDTH / 2, HALL_HEIGHT / 2, -HALL_LENGTH / 2]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[HALL_LENGTH + 10, HALL_HEIGHT]} />
        <meshStandardMaterial color="#1a1410" roughness={0.95} />
      </mesh>
      <mesh position={[HALL_WIDTH / 2, HALL_HEIGHT / 2, -HALL_LENGTH / 2]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[HALL_LENGTH + 10, HALL_HEIGHT]} />
        <meshStandardMaterial color="#1a1410" roughness={0.95} />
      </mesh>

      {/* Ceiling */}
      <mesh position={[0, HALL_HEIGHT, -HALL_LENGTH / 2]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[HALL_WIDTH * 1.5, HALL_LENGTH + 10]} />
        <meshStandardMaterial color="#0d0a08" roughness={1} />
      </mesh>

      {/* Greek-style pillars (cylindrical) on both sides */}
      {pillarZs.map((z, i) => (
        <group key={i}>
          <Pillar position={[-HALL_WIDTH / 2 + 0.5, 0, z]} />
          <Pillar position={[HALL_WIDTH / 2 - 0.5, 0, z]} />
          {/* Ceiling lights */}
          <mesh position={[0, HALL_HEIGHT - 0.05, z]}>
            <boxGeometry args={[1.4, 0.05, 1.4]} />
            <meshStandardMaterial
              color="#ffaa3a"
              emissive="#ffaa3a"
              emissiveIntensity={2.2}
              toneMapped={false}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function Pillar({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Base */}
      <mesh position={[0, 0.2, 0]}>
        <boxGeometry args={[1.2, 0.4, 1.2]} />
        <meshStandardMaterial color="#2a241c" roughness={0.9} />
      </mesh>
      {/* Column */}
      <mesh position={[0, HALL_HEIGHT / 2 + 0.2, 0]}>
        <cylinderGeometry args={[0.4, 0.45, HALL_HEIGHT, 16]} />
        <meshStandardMaterial color="#3a3026" roughness={0.85} />
      </mesh>
      {/* Capital */}
      <mesh position={[0, HALL_HEIGHT - 0.1, 0]}>
        <boxGeometry args={[1.1, 0.3, 1.1]} />
        <meshStandardMaterial color="#2a241c" roughness={0.9} />
      </mesh>
    </group>
  );
}

/* ════════════════════════════════════════════════════════════════════
   SERVICE PANEL — clickable card floating in hallway
═════════════════════════════════════════════════════════════════════ */

function ServicePanel({
  panel,
  position,
  rotationY,
}: {
  panel: Panel;
  position: [number, number, number];
  rotationY: number;
}) {
  const router = useRouter();
  const groupRef = useRef<THREE.Group>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  // Subtle hover-bob animation
  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(clock.elapsedTime * 0.5 + position[2]) * 0.08;
    }
    if (glowRef.current) {
      const m = glowRef.current.material as THREE.MeshStandardMaterial;
      m.emissiveIntensity = 0.6 + Math.sin(clock.elapsedTime * 1.5 + position[2]) * 0.15;
    }
  });

  const handleClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    router.push(panel.href);
  };

  const onClick = handleClick as unknown as (e: import("@react-three/fiber").ThreeEvent<MouseEvent>) => void;

  return (
    <group ref={groupRef} position={position} rotation={[0, rotationY, 0]}>
      {/* Glow plane behind */}
      <mesh ref={glowRef} position={[0, 0, -0.05]}>
        <planeGeometry args={[3.6, 2.4]} />
        <meshStandardMaterial
          color={panel.color}
          emissive={panel.color}
          emissiveIntensity={0.7}
          toneMapped={false}
        />
      </mesh>

      {/* Frame */}
      <RoundedBox args={[3.5, 2.3, 0.12]} radius={0.05} smoothness={4} onClick={onClick}>
        <meshStandardMaterial color="#0f0f0f" metalness={0.7} roughness={0.3} />
      </RoundedBox>

      {/* Inner panel surface */}
      <mesh position={[0, 0, 0.07]} onClick={onClick}>
        <planeGeometry args={[3.3, 2.1]} />
        <meshStandardMaterial
          color={panel.color}
          emissive={panel.color}
          emissiveIntensity={0.25}
          toneMapped={false}
        />
      </mesh>

      {/* Title text */}
      <Text
        position={[0, 0.4, 0.08]}
        fontSize={0.28}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        maxWidth={3}
        onClick={onClick}
      >
        {panel.title}
      </Text>

      {/* Subtitle */}
      <Text
        position={[0, -0.05, 0.08]}
        fontSize={0.14}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        maxWidth={3}
        onClick={onClick}
      >
        {panel.subtitle}
      </Text>

      {/* CTA indicator */}
      <Text
        position={[0, -0.55, 0.08]}
        fontSize={0.13}
        color={panel.accent}
        anchorX="center"
        anchorY="middle"
        onClick={onClick}
      >
        Click to open →
      </Text>

      {/* Bottom warm light strip */}
      <mesh position={[0, -1.2, 0.08]}>
        <planeGeometry args={[3.3, 0.05]} />
        <meshStandardMaterial
          color="#ffaa3a"
          emissive="#ffaa3a"
          emissiveIntensity={1.5}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

/**
 * TriniLanding3D — CSS-only replacement (no WebGL / no Three.js).
 *
 * The previous version imported @react-three/fiber which is NOT in
 * package.json and caused a Vercel build failure:
 *   "Cannot find module '@react-three/fiber' or its corresponding type declarations"
 *
 * This stub exports a lightweight CSS-3D hero so existing imports
 * continue to work without pulling in any heavy WebGL dependency.
 */

export { ServiceCards3D as TriniLanding3D } from "@/components/sections/ServiceCards3D";
export default function TriniLanding3DDefault() { return null; }

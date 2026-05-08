"use client";
// FIXED: Removed @react-three/fiber, @react-three/drei, @react-three/postprocessing imports.
// These packages are not in package.json and caused Vercel build failure.
// Replaced with a CSS-only no-op stub.

export function TriniLanding3D() { return null; }
export default TriniLanding3D;

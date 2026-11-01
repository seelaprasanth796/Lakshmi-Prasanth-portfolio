import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

// three.js needs concrete colour values; these mirror --primary / --violet.
const CYAN = new THREE.Color("#66e3f2");
const VIOLET = new THREE.Color("#a68bff");
const CORE = new THREE.Color("#0d1222");

const PARTICLE_COUNT = 420;

/** Deterministic pseudo-random so the particle cloud is stable between mounts. */
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function Particles() {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const rand = mulberry32(7);
    const arr = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const r = 2.1 + rand() * 1.8;
      const theta = rand() * Math.PI * 2;
      const phi = Math.acos(2 * rand() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.7;
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += Math.min(delta, 0.05) * 0.03;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.022}
        sizeAttenuation
        color={CYAN}
        transparent
        opacity={0.55}
        depthWrite={false}
      />
    </points>
  );
}

function Ring({
  radius,
  tilt,
  speed,
  color,
  opacity,
}: {
  radius: number;
  tilt: [number, number, number];
  speed: number;
  color: THREE.Color;
  opacity: number;
}) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.z += Math.min(delta, 0.05) * speed;
  });
  return (
    <group rotation={tilt}>
      <group ref={ref}>
        <mesh>
          <torusGeometry args={[radius, 0.005, 6, 200]} />
          <meshBasicMaterial color={color} transparent opacity={opacity} />
        </mesh>
        <mesh position={[radius, 0, 0]}>
          <sphereGeometry args={[0.035, 12, 12]} />
          <meshBasicMaterial color={color} />
        </mesh>
      </group>
    </group>
  );
}

function Orb() {
  const group = useRef<THREE.Group>(null);
  const outer = useRef<THREE.Mesh>(null);
  const inner = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    if (outer.current) {
      outer.current.rotation.y += dt * 0.12;
      outer.current.rotation.x += dt * 0.04;
    }
    if (inner.current) inner.current.rotation.y -= dt * 0.18;
    if (group.current) {
      // Gentle pointer parallax, damped.
      const k = 1 - Math.exp(-2.5 * dt);
      group.current.rotation.x += (state.pointer.y * 0.18 - group.current.rotation.x) * k;
      group.current.rotation.y += (state.pointer.x * 0.25 - group.current.rotation.y) * k;
    }
  });

  return (
    <group ref={group}>
      <mesh>
        <sphereGeometry args={[1.12, 48, 48]} />
        <meshBasicMaterial color={CORE} transparent opacity={0.85} />
      </mesh>
      <mesh ref={outer}>
        <icosahedronGeometry args={[1.35, 3]} />
        <meshBasicMaterial color={CYAN} wireframe transparent opacity={0.32} />
      </mesh>
      <mesh ref={inner}>
        <icosahedronGeometry args={[0.92, 1]} />
        <meshBasicMaterial color={VIOLET} wireframe transparent opacity={0.28} />
      </mesh>
      <Ring radius={1.85} tilt={[1.25, 0.2, 0]} speed={0.35} color={CYAN} opacity={0.45} />
      <Ring radius={2.15} tilt={[1.0, -0.6, 0.3]} speed={-0.22} color={VIOLET} opacity={0.38} />
      <Ring radius={2.5} tilt={[1.6, 0.5, -0.2]} speed={0.15} color={CYAN} opacity={0.22} />
      <Particles />
    </group>
  );
}

export default function HeroOrb() {
  const wrapper = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener("change", update);

    const el = wrapper.current;
    const io = el
      ? new IntersectionObserver(([entry]) => setVisible(entry?.isIntersecting ?? true))
      : null;
    if (el && io) io.observe(el);

    return () => {
      mq.removeEventListener("change", update);
      io?.disconnect();
    };
  }, []);

  // Animate only when on screen and motion is allowed; otherwise render on demand (static).
  const frameloop = visible && !reducedMotion ? "always" : "demand";

  return (
    <div
      ref={wrapper}
      className="absolute inset-0 transition-opacity duration-1000"
      style={{ opacity: ready ? 1 : 0 }}
      data-scene-ready={ready ? "true" : undefined}
      aria-hidden
    >
      <Canvas
        frameloop={frameloop}
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 6.2], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
        onCreated={() => requestAnimationFrame(() => setReady(true))}
      >
        <Orb />
      </Canvas>
    </div>
  );
}

"use client";
import { useEffect, useRef, useState, useMemo } from "react";
import { Canvas, extend, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from "@react-three/rapier";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";
import * as THREE from "three";

extend({ MeshLineGeometry, MeshLineMaterial });

/**
 * Physics-based lanyard card for the GYEOL "registration complete" popup.
 *
 * A dynamic card hangs from a fixed anchor via a chain of rigid bodies,
 * connected by rope + spherical joints. Users can drag the card with the
 * pointer; the rope visualizes the link using meshline.
 *
 * No external GLB required — the card face is rendered from an HTMLCanvas
 * texture we generate at mount, containing the member's info.
 */
export default function Lanyard({ memberNumber = 0, label = "會員證" }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 16], fov: 22 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={Math.PI} />
      <Physics interpolate gravity={[0, -40, 0]} timeStep={1 / 60}>
        <Band memberNumber={memberNumber} label={label} />
      </Physics>
      <Environment preset="studio" background={false} />
    </Canvas>
  );
}

function Band({ memberNumber, label }) {
  const fixed = useRef();
  const j1 = useRef();
  const j2 = useRef();
  const j3 = useRef();
  const card = useRef();
  const rope = useRef();

  const vec = useMemo(() => new THREE.Vector3(), []);
  const [dragged, setDragged] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [curve] = useState(
    () => new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()])
  );

  // Rope joint chain
  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [[0, 0, 0], [0, 1.45, 0]]);

  useEffect(() => {
    if (hovered || dragged) {
      document.body.style.cursor = dragged ? "grabbing" : "grab";
      return () => (document.body.style.cursor = "auto");
    }
  }, [hovered, dragged]);

  useFrame((state, delta) => {
    // Pointer drag
    if (dragged && card.current) {
      const v = new THREE.Vector3(state.pointer.x, state.pointer.y, 0.5);
      v.unproject(state.camera);
      const dir = v.sub(state.camera.position).normalize();
      const distance = -state.camera.position.z / dir.z;
      const pos = state.camera.position.clone().add(dir.multiplyScalar(distance));
      card.current.setNextKinematicTranslation({
        x: pos.x - dragged.x,
        y: pos.y - dragged.y,
        z: pos.z - dragged.z,
      });
    }

    // Rope curve geometry
    if (fixed.current && j1.current && j2.current && j3.current && rope.current) {
      curve.points[0].copy(j3.current.translation());
      curve.points[1].copy(j2.current.translation());
      curve.points[2].copy(j1.current.translation());
      curve.points[3].copy(fixed.current.translation());
      rope.current.geometry.setPoints(curve.getPoints(32));
    }

    // Gentle angular damping
    if (card.current && !dragged) {
      const a = card.current.angvel();
      card.current.setAngvel({ x: a.x * 0.9, y: a.y * 0.9, z: a.z * 0.9 }, true);
    }
  });

  // Generate a texture for the card face
  const cardTexture = useMemo(() => {
    if (typeof document === "undefined") return null;
    const canvas = document.createElement("canvas");
    const scale = 4;
    const W = 512 * scale;
    const H = 720 * scale;
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext("2d");

    // Gradient background
    const grad = ctx.createLinearGradient(0, 0, 0, H);
    grad.addColorStop(0, "#111");
    grad.addColorStop(0.5, "#1c1c1c");
    grad.addColorStop(1, "#0a0a0a");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    // Subtle border
    ctx.strokeStyle = "rgba(255,255,255,0.14)";
    ctx.lineWidth = 3 * scale;
    ctx.strokeRect(1.5 * scale, 1.5 * scale, W - 3 * scale, H - 3 * scale);

    // Brand "結"
    ctx.fillStyle = "rgba(255,255,255,0.06)";
    ctx.font = `300 ${440 * scale}px "Noto Serif JP", "Noto Serif KR", serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("結", W / 2, H / 2 + 40 * scale);

    // Top — brand wordmark
    ctx.fillStyle = "#ffffff";
    ctx.font = `800 ${24 * scale}px "Gothic A1", sans-serif`;
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.letterSpacing = "6px";
    ctx.fillText("GYEOL", 44 * scale, 44 * scale);

    // Top right — label
    ctx.fillStyle = "rgba(255,255,255,0.55)";
    ctx.font = `400 ${16 * scale}px "Noto Serif KR", serif`;
    ctx.textAlign = "right";
    ctx.fillText(label, W - 44 * scale, 48 * scale);

    // Member number block
    ctx.fillStyle = "rgba(255,255,255,0.5)";
    ctx.font = `500 ${18 * scale}px "Gothic A1", sans-serif`;
    ctx.textAlign = "left";
    ctx.fillText("MEMBER  NO.", 44 * scale, H - 220 * scale);

    ctx.fillStyle = "#ffffff";
    ctx.font = `700 ${90 * scale}px "Playfair Display", serif`;
    const padded = String(memberNumber).padStart(4, "0");
    ctx.fillText(padded, 44 * scale, H - 190 * scale);

    // Bottom label — founding member
    ctx.fillStyle = "rgba(255,255,255,0.5)";
    ctx.font = `500 ${15 * scale}px "Gothic A1", sans-serif`;
    ctx.fillText("FOUNDING MEMBER", 44 * scale, H - 70 * scale);
    ctx.fillStyle = "rgba(255,255,255,0.3)";
    ctx.fillText("PRELIMINARY REGISTRATION", 44 * scale, H - 44 * scale);

    const texture = new THREE.CanvasTexture(canvas);
    texture.anisotropy = 8;
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }, [memberNumber, label]);

  return (
    <>
      <group position={[0, 4, 0]}>
        <RigidBody ref={fixed} type="fixed" />
        <RigidBody position={[0.5, 0, 0]} ref={j1} colliders="ball" linearDamping={4} angularDamping={4}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} colliders="ball" linearDamping={4} angularDamping={4}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} colliders="ball" linearDamping={4} angularDamping={4}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody
          ref={card}
          position={[2, 0, 0]}
          colliders={false}
          type={dragged ? "kinematicPosition" : "dynamic"}
          linearDamping={4}
          angularDamping={4}
        >
          <CuboidCollider args={[0.8, 1.125, 0.02]} />
          <group
            scale={2.25}
            position={[0, -1.2, -0.05]}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            onPointerUp={(e) => {
              e.target.releasePointerCapture(e.pointerId);
              setDragged(false);
            }}
            onPointerDown={(e) => {
              e.target.setPointerCapture(e.pointerId);
              setDragged(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation())));
            }}
          >
            <mesh>
              <planeGeometry args={[1.6, 2.25]} />
              <meshStandardMaterial
                map={cardTexture}
                roughness={0.35}
                metalness={0.1}
                side={THREE.DoubleSide}
              />
            </mesh>
            {/* back of card (simpler) */}
            <mesh position={[0, 0, -0.002]} rotation={[0, Math.PI, 0]}>
              <planeGeometry args={[1.6, 2.25]} />
              <meshStandardMaterial color="#0a0a0a" roughness={0.6} metalness={0.1} />
            </mesh>
          </group>
        </RigidBody>
      </group>
      <mesh ref={rope}>
        <meshLineGeometry />
        <meshLineMaterial color="#ffffff" depthTest={false} resolution={[1000, 1000]} lineWidth={0.015} opacity={0.9} transparent />
      </mesh>
    </>
  );
}

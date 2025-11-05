export function SceneLights() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1.5} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4a90e2" />
      <fog attach="fog" args={["#000011", 10, 50]} />
    </>
  );
}


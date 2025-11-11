export function SceneLights() {
  return (
    <>
      <ambientLight intensity={0.4} />
      {/* Main directional light */}
      <directionalLight position={[5, 5, 5]} intensity={1.0} />
      {/* Fill light */}
      <directionalLight position={[-3, 2, -3]} intensity={0.3} color="#4a90e2" />
      <fog attach="fog" args={["#000011", 10, 50]} />
    </>
  );
}


import React from "react";
import styled from "styled-components";
import { Canvas } from "@react-three/fiber";
// import { OrbitControls } from "@react-three/drei";
import { Iphone14 } from "../models/IPhone14";
import { Environment } from "@react-three/drei";
import { Suspense } from "react";

const Container = styled.div`
  width: 100vw;
  height: 100vh;

  position: fixed;
  top: 0;
  z-index: 1;
  background-color: transparent;
`;

const PhoneModel = () => {
  return (
    <Container>
      <Canvas camera={{ fov: 14 }}>
        <ambientLight intensity={2.25} />
        <directionalLight position={[-1, 0, 0]} />
        <Suspense>
          <Iphone14 />
        </Suspense>
        <Environment preset="sunset" />
        {/* <OrbitControls /> */}
      </Canvas>
    </Container>
  );
};

export default PhoneModel;

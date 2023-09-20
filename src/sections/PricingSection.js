import React, { Suspense, useContext, useEffect, useRef } from "react";
import styled from "styled-components";
import { Environment, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Iphone14Static2 } from "../models/Iphone14-static2";
import { useGLTF } from "@react-three/drei";
import { ColorContext } from "../context/ColorContext";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  z-index: 1;

  background-color: var(--white);
  overflow: hidden;
`;

const Section = styled.section`
  width: 100vw;
  height: 100vh;
  position: relative;
  z-index: 1;
  background-color: #9bb5ce;
  overflow: hidden;
`;

const Phone = styled.div`
  width: 100%;
  height: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;

  position: relative;
  cursor: grab;
`;

const Colors = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  position: absolute;
  top: 50%;
  left: 35%;
  transform: translate(-50%, -50%);

  @media screen and (max-width: 64em) {
    left: 10%;
  }
`;

const Color = styled.li`
  list-style: none;
  width: 1.5rem;
  height: 1.5rem;
  cursor: pointer;

  border-radius: 50%;
  background-color: ${(p) => p.color};
  margin: 0.5rem 0;
  border: 1px solid var(--dark);
`;

const Details = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h2`
  font-size: var(--fontxl);
  padding: 0.3rem;
`;

const Subtitle = styled.div`
  font-size: var(--fontmd);
  font-family: var(--fontR);
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 1rem;
`;

const Btn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  margin: 0;
  padding: 0.4rem 1rem;
  border-radius: 50px;

  border: none;
  outline: none;

  background-color: var(--blue);
  color: var(--white);
  cursor: pointer;

  &:hover {
    opacity: 0.7;
  }
`;

const BtnLink = styled.a`
  color: var(--blue);
  text-decoration: none;
  margin-left: 1.5rem;

  &:hover {
    text-decoration: underline;
  }
`;

const IndicatorText = styled.div`
  font-size: var(--fontsm);
  position: absolute;
  top: 1rem;
`;

const PricingSection = () => {
  const sectionRef = useRef(null);

  const { currentColor, changeColorContext } = useContext(ColorContext);

  useEffect(() => {
    sectionRef.current.style.backgroundColor = `rgba(${currentColor.rgbColor}, 0.4)`;
  }, [currentColor]);

  let updateColor = (color, text, rgbColor) => {
    const colorObj = {
      color: color,
      text: text,
      rgbColor: rgbColor,
    };
    changeColorContext(colorObj);
  };

  return (
    <Container>
      <Section ref={sectionRef}>
        <Phone>
          <IndicatorText>360&deg; &#x27F2;</IndicatorText>
          <Canvas camera={{ fov: 18 }}>
            <ambientLight intensity={1} />
            <directionalLight intensity={0.4} />
            <Suspense fallback={null}>
              <Iphone14Static2 />
            </Suspense>
            <Environment preset="sunset" />
            <OrbitControls enableZoom={false} />
          </Canvas>
          <Colors>
            <Color
              color="#9BB5CE"
              onClick={() =>
                updateColor("#9BB5CE", "Sierra Blue", "155, 181, 206")
              }
            />
            <Color
              color="#F9E5C9"
              onClick={() => updateColor("#F9E5C9", "Gold", "249, 229, 201")}
            />
            <Color
              color="#505F4E"
              onClick={() =>
                updateColor("#505F4E", "Alpine Green", "80, 95, 78")
              }
            />
            <Color
              color="#574F6F"
              onClick={() =>
                updateColor("#574f6f", "Deep Purple", "87, 79, 111")
              }
            />
            <Color
              color="#A50011"
              onClick={() => updateColor("#A50011", "Red", "165, 0, 17")}
            />
            <Color
              color="#215E7C"
              onClick={() => updateColor("#215E7C", "Blue", "33, 94, 124")}
            />
          </Colors>
          <Details>
            <Subtitle>iPhone</Subtitle>
            <Title>14 Pro Max</Title>
            <Subtitle>From $699</Subtitle>
          </Details>
          <ButtonContainer>
            <Btn>Buy</Btn>
            <BtnLink href="#">Learn More &#x2192;</BtnLink>
          </ButtonContainer>
        </Phone>
      </Section>
    </Container>
  );
};

export default PricingSection;

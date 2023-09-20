import React, {
  useLayoutEffect,
  useRef,
  Suspense,
  useContext,
  useEffect,
} from "react";
import styled from "styled-components";
import gsap from "gsap";
import { useGLTF, Environment } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Iphone14Static } from "../models/IPhone14-static";
import { ColorContext } from "../context/ColorContext";

const Section = styled.section`
  width: 100vw;
  height: 100vh;
  position: relative;

  display: flex;
  justify-content: spsce-between;
  align-items: center;
`;

const Left = styled.div`
  width: 50%;
  height: 100%;

  display: flex;
  position: relative;
  background-color: rgba(155, 181, 206, 0.8);
  position: relative;

  @media screen and (max-width: 48em) {
    width: 100%;
  }
`;

const Right = styled.div`
  width: 50%;
  height: 100%;

  display: flex;
  position: relative;
  background-color: rgba(155, 181, 206, 0.4);

  @media screen and (max-width: 48em) {
    display: none;
  }
`;

const Center = styled.div`
  width: 100%;
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(-90deg);
  font-size: var(--fontxxl);
  text-transform: uppercase;
  filter: brightness(0.85);

  @media screen and (max-width: 48em) {
    top: 2rem;
    transform: translate(-50%, 0) rotate(0deg);
  }
`;

const ColorSection = () => {
  const sectionRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const textRef = useRef(null);

  const { currentColor, changeColorContext } = useContext(ColorContext);

  useEffect(() => {
    let leftElem = leftRef.current;
    let rightElem = rightRef.current;
    let textElem = textRef.current;

    textElem.innerText = currentColor.text;
    textElem.style.color = currentColor.color;
    rightElem.style.backgroundColor = `rgba(${currentColor.rgbColor}, 0.4)`;
    leftElem.style.backgroundColor = `rgba(${currentColor.rgbColor}, 0.8)`;
  }, [currentColor]);

  useLayoutEffect(() => {
    let elem = sectionRef.current;

    let updateColor = (color, text, rgbColor) => {
      const colorObj = {
        color: color,
        text: text,
        rgbColor: rgbColor,
      };
      changeColorContext(colorObj);
    };

    // pin section
    gsap.to(elem, {
      scrollTrigger: {
        trigger: elem,
        start: "top top",
        end: `+=${elem.offsetWidth} +1000`,
        pin: true,
        pinSpacing: true,
        scrub: true,
      },
    });

    let tl = gsap
      .timeline({
        scrollTrigger: {
          trigger: elem,
          start: "top top",
          end: `+=${elem.offsetWidth} +1000`,
          scrub: true,
        },
      })
      .to(elem, {
        onStart: updateColor,
        onStartParams: ["#9BB5CE", "Sierra Blue", "155, 181, 206"],
        onReverseComplete: updateColor,
        onReverseCompleteParams: ["#9BB5CE", "Sierra Blue", "155, 181, 206"],
      })
      .to(elem, {
        onStart: updateColor,
        onStartParams: ["#F9E5C9", "Gold", "249, 229, 201"],
        onReverseComplete: updateColor,
        onReverseCompleteParams: ["#F9E5C9", "Gold", "249, 229, 201"],
      })
      .to(elem, {
        onStart: updateColor,
        onStartParams: ["#505F4E", "Alpine Green", "80, 95, 78"],
        onReverseComplete: updateColor,
        onReverseCompleteParams: ["#505F4E", "Alpine Green", "80, 95, 78"],
      })
      .to(elem, {
        onStart: updateColor,
        onStartParams: ["#574f6f", "Deep Purple", "87, 79, 111"],
        onReverseComplete: updateColor,
        onReverseCompleteParams: ["#574f6f", "Deep Purple", "87, 79, 111"],
      })
      .to(elem, {
        onStart: updateColor,
        onStartParams: ["#A50011", "Red", "165, 0, 17"],
        onReverseComplete: updateColor,
        onReverseCompleteParams: ["#A50011", "Red", "165, 0, 17"],
      })
      .to(elem, {
        onStart: updateColor,
        onStartParams: ["#215E7C", "Blue", "33, 94, 124"],
        onReverseComplete: updateColor,
        onReverseCompleteParams: ["#215E7C", "Blue", "33, 94, 124"],
      });

    return () => {
      // cleanup
    };
  }, []);

  return (
    <Section ref={sectionRef}>
      <Left ref={leftRef}></Left>
      <Center ref={textRef}></Center>
      <Right ref={rightRef}>
        <Canvas camera={{ fov: 14 }}>
          <ambientLight intensity={1.25} />
          <directionalLight intensity={0.4} />
          <Suspense fallback={null}>
            <Iphone14Static />
          </Suspense>
          <Environment preset="night" />
          {/* <OrbitControls /> */}
        </Canvas>
      </Right>
    </Section>
  );
};

export default ColorSection;

import React, { useLayoutEffect, useRef } from "react";
import styled from "styled-components";
import gsap from "gsap";

const Section = styled.section`
  width: 100vw;
  height: 100vh;
  position: relative;

  display: flex;
  justify-content: flex-end;
  align-items: center;
  background-color: var(--white);
`;

const Title = styled.h1`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-55%, -50%);

  text-transform: uppercase;
  font-size: var(--fontBig);
  z-index: 1;
`;

const Battery = styled.ul`
  position: absolute;
  right: 4rem;
  list-style: none;
  background-color: var(--white);
  border: 3px solid var(--dark);
  border-radius: 8px;
  padding: 0.5rem;
  width: 15rem;

  li {
    width: 100%;
    height: 5rem;
    background-image: linear-gradient(-90deg, var(--gradient));
    opacity: 0;
  }

  & > *:not(:first-child):not(:last-child) {
    margin: 0.5rem 0;
  }
`;

const BatterySection = () => {
  const batteryRef = useRef(null);
  let elements = gsap.utils.selector(batteryRef);

  useLayoutEffect(() => {
    let t1 = gsap.timeline({});

    elements("li").forEach((el) => {
      t1.to(el, {
        scrollTrigger: {
          trigger: el,
          start: "top center",
          end: "bottom center",
          scrub: true,
          opacity: 1,
        },
        opacity: 1,
      });
    });

    return () => {};
  }, []);

  return (
    <Section ref={batteryRef}>
      <Title>Go all day with a single charge...</Title>
      <Battery>
        <li>24 hours of talk time</li>
        <li>18 hours of video playback</li>
        <li>12 hours of internet use</li>
        <li>12 hours of wireless video playback</li>
        <li>60 hours of wireless audio playback</li>
      </Battery>
    </Section>
  );
};

export default BatterySection;
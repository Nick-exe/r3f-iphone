import React, { useLayoutEffect, useRef } from "react";
import styled from "styled-components";
import video from "../assets/video/ScubaDiving.mp4";
import video2 from "../assets/video/Skate.mp4";
import { gsap } from "gsap";

const Section = styled.section`
  width: 100vw;
  height: 100vh;
  position: relative;
  z-index: 1;
  background-color: var(--white);
  overflow: hidden;
`;

const V1 = styled.video`
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  object-fit: cover;
  object-position: bottom;
  z-index: 2;
`;

const V2 = styled.video`
    width: 60%;
    height: auto;
    position: absolute;
    top: 0;
    right: 40%
    z-index: 1;

    @media screen and (max-width: 30em) {
      width: 100%;
      right: 0;
      top: 10%;
    }
`;

const TitleContainer = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  position: absolute;
  top: 0;
  right: 0;

  & > *:nth-child(2) {
    margin-left: 6rem;
  }
  & > *:nth-child(3) {
    margin-left: 12rem;
  }

  @media screen and (max-width: 48em) {
    top: 60%;
    right: 2rem;
  }
  @media screen and (max-width: 40em) {
    right: 5rem;
  }
  @media screen and (max-width: 30em) {
    top: 70%;
    right: 40%;
  }
`;

const Title = styled.h1`
  font-size: var(--fontBig);
  z-index: 3;
  text-transform: capitalize;

  @media screen and (max-width: 70em) {
    font-size: var(--fontxxxl);
  }
  @media screen and (max-width: 48em) {
    font-size: var(--fontxxl);
  }
`;

const CameraSection = () => {
  const sectionRef = useRef(null);
  const videoRef1 = useRef(null);
  const videoRef2 = useRef(null);
  const titleRef = useRef(null);

  useLayoutEffect(() => {
    const elem = sectionRef.current;
    const video1 = videoRef1.current;
    const video2 = videoRef2.current;

    let elements = gsap.utils.selector(titleRef);

    gsap.to(elem, {
      scrollTrigger: {
        trigger: elem,
        scrub: true,
        start: "top top",
        end: "bottom+=500 bottom",
        pin: true,
        pinSpacing: true,
      },
    });

    let tl = gsap
      .timeline({
        scrollTrigger: {
          trigger: elem,
          scrub: true,
          start: "top top",
          end: "bottom+=500 bottom",
        },
      })
      .to(
        video1,
        {
          scale: 0.3,
        },
        "together"
      )
      .to(
        video2,
        {
          scale: 0.6,
        },
        "together"
      );

    elements("h1").forEach((el) => {
      tl.fromTo(
        el,
        {
          scrollTrigger: {
            trigger: el,
            scrub: true,
            start: "top top",
            end: "bottom bottom",
          },
          x: 100,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
        }
      );
    });

    return () => {};
  }, []);

  return (
    <Section ref={sectionRef}>
      <V1 ref={videoRef1} src={video} type="video/mp4" autoPlay muted loop />
      <V2 ref={videoRef2} src={video2} type="video/mp4" autoPlay muted loop />
      <TitleContainer ref={titleRef}>
        <Title>Ready.</Title>
        <Title>Steady.</Title>
        <Title>Action.</Title>
      </TitleContainer>
    </Section>
  );
};

export default CameraSection;

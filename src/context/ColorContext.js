import React, { useState } from "react";
import { createContext } from "react";
import { useGLTF } from "@react-three/drei";

export const ColorContext = createContext({});

export const ColorProvider = ({ children }) => {
  const { materials } = useGLTF("3D-Model/scene.gltf");

  const [currentColor, setCurrentColor] = useState({
    color: "#9BB5CE",
    text: "Sierra Blue",
    rgbColor: "155, 181, 206",
  });

  let changeColorContext = (colorObj) => {
    materials.Body.color.set(colorObj.color);
    setCurrentColor(colorObj);
  };

  return (
    <ColorContext.Provider value={{ currentColor, changeColorContext }}>
      {children}
    </ColorContext.Provider>
  );
};
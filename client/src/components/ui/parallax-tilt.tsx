import { ReactNode } from 'react';
import Tilt from 'react-parallax-tilt';

interface ParallaxTiltProps {
  children: ReactNode;
  className?: string;
  scale?: number;
  perspective?: number;
  transitionSpeed?: number;
  tiltMaxAngleX?: number;
  tiltMaxAngleY?: number;
  tiltReverse?: boolean;
  glareEnable?: boolean;
  glareMaxOpacity?: number;
  glareColor?: string;
  glareBorderRadius?: string;
}

export const ParallaxTilt = ({
  children,
  className = "",
  scale = 1.05,
  perspective = 1000,
  transitionSpeed = 1000,
  tiltMaxAngleX = 10,
  tiltMaxAngleY = 10,
  tiltReverse = false,
  glareEnable = false,
  glareMaxOpacity = 0.5,
  glareColor = "white",
  glareBorderRadius = "0px",
}: ParallaxTiltProps) => {
  return (
    <Tilt
      className={className}
      tiltMaxAngleX={tiltMaxAngleX}
      tiltMaxAngleY={tiltMaxAngleY}
      perspective={perspective}
      transitionSpeed={transitionSpeed}
      scale={scale}
      tiltReverse={tiltReverse}
      glareEnable={glareEnable}
      glareMaxOpacity={glareMaxOpacity}
      glareColor={glareColor}
      glareBorderRadius={glareBorderRadius}
    >
      {children}
    </Tilt>
  );
};
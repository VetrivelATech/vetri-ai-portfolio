
"use client";

import Particles from "react-tsparticles";

export default function ParticlesBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Particles
        id="tsparticles"
        options={{
          fullScreen: false,
          particles: {
            number: {
              value: 100,
            },
            color: {
              value: "#00e5ff",
            },
            shape: {
              type: "circle",
            },
            opacity: {
              value: 0.7,
            },
            size: {
              value: 4,
            },
            move: {
              enable: true,
              speed: 2,
            },
          },
        }}
      />
    </div>
  );
}
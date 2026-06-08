import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

export const GridBackground: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(circle at 18% 12%, rgba(215, 232, 222, 0.95), transparent 32%), radial-gradient(circle at 82% 24%, rgba(56, 178, 172, 0.16), transparent 30%), linear-gradient(135deg, #FDFEFF 0%, #F7FCFA 52%, #EEF8F4 100%)",
        opacity,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(18, 79, 43, 0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(18, 79, 43, 0.055) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(circle at 50% 42%, black 0%, transparent 78%)",
          opacity: 0.7,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 112,
          top: 654,
          width: 340,
          height: 340,
          borderRadius: "50%",
          background: "rgba(215, 232, 222, 0.55)",
          filter: "blur(22px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          right: 138,
          bottom: 88,
          width: 430,
          height: 430,
          borderRadius: "50%",
          background: "rgba(56, 178, 172, 0.12)",
          filter: "blur(18px)",
        }}
      />
    </AbsoluteFill>
  );
};

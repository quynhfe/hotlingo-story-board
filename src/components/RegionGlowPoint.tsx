import { interpolate, useCurrentFrame } from "remotion";

type RegionGlowPointProps = { x: number; y: number; startFrame: number; color?: string };

export const RegionGlowPoint: React.FC<RegionGlowPointProps> = ({ x, y, startFrame, color = "#124F2B" }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [startFrame, startFrame + 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const pulse = 0.65 + Math.sin((frame - startFrame) / 9) * 0.35;

  return (
    <div style={{ position: "absolute", left: x, top: y, transform: "translate(-50%, -50%)", opacity: opacity * pulse, pointerEvents: "none" }}>
      <div style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(255, 255, 255, 0.42)", boxShadow: `0 0 24px ${color}33`, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: 9, height: 9, borderRadius: "50%", background: color }} />
      </div>
    </div>
  );
};

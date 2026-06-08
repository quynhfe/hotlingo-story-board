import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

type FinalBadgeProps = { startFrame?: number; label?: string; y?: number };

export const FinalBadge: React.FC<FinalBadgeProps> = ({ startFrame = 615, label = "100+ ngôn ngữ phổ biến", y = 966 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = spring({ frame: Math.max(0, frame - startFrame), fps, config: { damping: 11, stiffness: 165, mass: 0.65 } });
  const opacity = interpolate(frame, [startFrame, startFrame + 15], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const top = interpolate(frame, [startFrame, startFrame + 18], [y + 28, y], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const scale = interpolate(pop, [0, 1], [0.84, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <div style={{ position: "absolute", left: "50%", top, transform: `translate(-50%, -50%) scale(${scale})`, opacity, padding: "18px 30px", borderRadius: 999, color: "#0D3B1F", fontSize: 31, lineHeight: 1, fontWeight: 900, background: "linear-gradient(135deg, rgba(255, 255, 255, 0.96), rgba(215, 232, 222, 0.96))", boxShadow: "0 22px 48px rgba(18, 79, 43, 0.18), inset 0 1px 0 rgba(255, 255, 255, 0.88)", border: "1px solid rgba(18, 79, 43, 0.08)", whiteSpace: "nowrap" }}>
      {label}
    </div>
  );
};

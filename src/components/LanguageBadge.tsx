import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

type LanguageBadgeProps = {
  label: string;
  x: number;
  y: number;
  startFrame: number;
  dimmed?: boolean;
  targetX?: number;
  targetY?: number;
  gatherStartFrame?: number;
  fontSize?: number;
};

export const LanguageBadge: React.FC<LanguageBadgeProps> = ({
  label,
  x,
  y,
  startFrame,
  dimmed = false,
  targetX,
  targetY,
  gatherStartFrame = 600,
  fontSize,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const localFrame = Math.max(0, frame - startFrame);
  const scaleProgress = spring({ frame: localFrame, fps, config: { damping: 13, stiffness: 170, mass: 0.55 } });
  const opacityIn = interpolate(frame, [startFrame, startFrame + 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const scale = interpolate(scaleProgress, [0, 1], [0.8, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const gather = targetX === undefined || targetY === undefined ? 0 : interpolate(frame, [gatherStartFrame, gatherStartFrame + 40], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const currentX = interpolate(gather, [0, 1], [x, targetX ?? x]);
  const currentY = interpolate(gather, [0, 1], [y, targetY ?? y]);
  const floatY = Math.sin((frame - startFrame) / 18 + x / 140) * 5 * (1 - gather * 0.45);
  const opacity = opacityIn * (dimmed ? 0.58 : 1);

  return (
    <div
      style={{
        position: "absolute",
        left: currentX,
        top: currentY,
        transform: `translate(-50%, -50%) translateY(${floatY}px) scale(${scale})`,
        opacity,
        padding: "12px 18px",
        borderRadius: 999,
        background: "rgba(215, 232, 222, 0.96)",
        color: "#124F2B",
        fontSize: fontSize ?? (label.length > 18 ? 23 : 26),
        lineHeight: 1,
        fontWeight: 800,
        letterSpacing: -0.35,
        boxShadow: "0 16px 32px rgba(18, 79, 43, 0.14), inset 0 1px 0 rgba(255, 255, 255, 0.76)",
        border: "1px solid rgba(255, 255, 255, 0.75)",
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </div>
  );
};

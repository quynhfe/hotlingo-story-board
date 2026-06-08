import { interpolate, useCurrentFrame } from "remotion";

type TimerBadgeProps = {
  startFrame: number;
};

export const TimerBadge: React.FC<TimerBadgeProps> = ({ startFrame }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [startFrame - 4, startFrame + 6], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const pulse = interpolate(frame, [startFrame, startFrame + 8, startFrame + 18], [0.82, 1.14, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        width: 58,
        height: 58,
        borderRadius: "50%",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 18,
        color: "#124F2B",
        background: "linear-gradient(145deg, rgba(255,255,255,0.94), rgba(215,232,222,0.74))",
        border: "1px solid rgba(47, 143, 91, 0.22)",
        boxShadow: "9px 12px 28px rgba(18,79,43,0.12), -6px -8px 18px rgba(255,255,255,0.9)",
        fontSize: 20,
        fontWeight: 900,
        opacity,
        transform: `scale(${pulse})`,
        verticalAlign: "middle",
      }}
    >
      5s
    </div>
  );
};

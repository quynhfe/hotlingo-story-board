import { Img, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export type FloatingWindowProps = {
  children?: React.ReactNode;
  imageSrc?: string;
  left: number;
  top: number;
  width: number;
  height: number;
  rotate: number;
  delay: number;
  badge?: string;
  caption?: string;
  zIndex?: number;
  featured?: boolean;
  emphasizeFrom?: number;
  windowOpacity?: number;
};

export const FloatingWindow: React.FC<FloatingWindowProps> = ({
  children,
  imageSrc,
  left,
  top,
  width,
  height,
  rotate,
  delay,
  badge,
  caption,
  zIndex = 1,
  featured = false,
  emphasizeFrom,
  windowOpacity = 1,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame: frame - delay,
    fps,
    config: {
      damping: 18,
      stiffness: 120,
      mass: 0.85,
    },
  });

  const opacity = interpolate(frame, [delay - 5, delay + 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const floatY = Math.sin((frame + delay) / 22) * (featured ? 5 : 7);
  const floatX = Math.cos((frame + delay) / 31) * 3;
  const emphasis = emphasizeFrom
    ? interpolate(frame, [emphasizeFrom, emphasizeFrom + 9, emphasizeFrom + 27], [1, 1.03, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 1;

  return (
    <div
      style={{
        position: "absolute",
        left,
        top,
        width,
        zIndex,
        opacity,
        transform: `translate(${floatX}px, ${interpolate(entrance, [0, 1], [38, 0]) + floatY}px) scale(${interpolate(
          entrance,
          [0, 1],
          [0.92, 1],
        ) * emphasis}) rotate(${rotate}deg)`,
        transformOrigin: "center center",
      }}
    >
      <div
        style={{
          position: "relative",
          width,
          height,
          padding: 10,
          borderRadius: 28,
          background: "rgba(255, 255, 255, 0.88)",
          border: "1px solid rgba(255, 255, 255, 0.86)",
          boxShadow: featured
            ? "0 38px 105px rgba(18, 79, 43, 0.24), inset 0 1px 0 rgba(255,255,255,0.9)"
            : "0 24px 70px rgba(61, 72, 82, 0.14), inset 0 1px 0 rgba(255,255,255,0.9)",
          overflow: "hidden",
          opacity: windowOpacity,
        }}
      >
        {badge ? (
          <div
            style={{
              position: "absolute",
              left: 24,
              top: 22,
              zIndex: 2,
              padding: "9px 16px",
              borderRadius: 999,
              background: featured ? "rgba(18, 79, 43, 0.92)" : "rgba(255, 255, 255, 0.9)",
              color: featured ? "#FFFFFF" : "#124F2B",
              fontSize: 18,
              fontWeight: 800,
              letterSpacing: -0.2,
              boxShadow: "0 10px 28px rgba(18, 79, 43, 0.12)",
              border: featured ? "none" : "1px solid rgba(215, 232, 222, 0.85)",
            }}
          >
            {badge}
          </div>
        ) : null}

        {imageSrc ? (
          <Img
            src={imageSrc}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              background: "#fff",
              borderRadius: 20,
              display: "block",
            }}
          />
        ) : (
          children
        )}
      </div>

      {caption ? (
        <div
          style={{
            marginTop: 14,
            marginLeft: 28,
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "10px 16px",
            borderRadius: 999,
            background: "rgba(255, 255, 255, 0.74)",
            color: "#6B7280",
            fontSize: 18,
            fontWeight: 750,
            boxShadow: "0 12px 34px rgba(61, 72, 82, 0.10)",
            border: "1px solid rgba(215, 232, 222, 0.74)",
          }}
        >
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#2F8F5B" }} />
          {caption}
        </div>
      ) : null}
    </div>
  );
};

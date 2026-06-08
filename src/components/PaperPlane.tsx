import { interpolate, useCurrentFrame } from "remotion";

type PaperPlaneProps = {
  startFrame?: number;
  endFrame?: number;
  centerX?: number;
  centerY?: number;
  radiusX?: number;
  radiusY?: number;
  fadeOutStartFrame?: number;
};

const COLORS = {
  primary: "#124F2B",
  lightGreen: "#D7E8DE",
};

export const PaperPlane: React.FC<PaperPlaneProps> = ({
  startFrame = 25,
  endFrame = 170,
  centerX = 960,
  centerY = 620,
  radiusX = 286,
  radiusY = 176,
  fadeOutStartFrame,
}) => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [startFrame, endFrame], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const opacityIn = interpolate(frame, [startFrame - 6, startFrame + 8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const opacityOut = fadeOutStartFrame === undefined ? 1 : interpolate(frame, [fadeOutStartFrame, fadeOutStartFrame + 14], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const opacity = opacityIn * opacityOut;
  const pathProgress = interpolate(frame, [startFrame, endFrame], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const angle = -112 + progress * 402;
  const angleRad = (angle * Math.PI) / 180;
  const x = centerX + Math.cos(angleRad) * radiusX;
  const y = centerY + Math.sin(angleRad) * radiusY;
  const tangent = Math.atan2(radiusY * Math.cos(angleRad), -radiusX * Math.sin(angleRad)) * (180 / Math.PI);
  const dashOffset = 1630 * (1 - pathProgress);

  return (
    <div style={{ position: "absolute", inset: 0, opacity, pointerEvents: "none" }}>
      <svg width="1920" height="1080" viewBox="0 0 1920 1080" style={{ position: "absolute", inset: 0, overflow: "visible" }}>
        <ellipse
          cx={centerX}
          cy={centerY}
          rx={radiusX}
          ry={radiusY}
          fill="none"
          stroke={COLORS.primary}
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="14 16"
          strokeDashoffset={dashOffset}
          opacity="0.28"
        />
        <ellipse
          cx={centerX}
          cy={centerY}
          rx={radiusX + 4}
          ry={radiusY + 3}
          fill="none"
          stroke={COLORS.lightGreen}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray="2 24"
          opacity="0.32"
        />
      </svg>

      <div
        style={{
          position: "absolute",
          left: x,
          top: y,
          width: 58,
          height: 58,
          transform: `translate(-50%, -50%) rotate(${tangent + 8}deg)`,
          filter: "drop-shadow(0 14px 18px rgba(18, 79, 43, 0.18))",
        }}
      >
        <svg width="58" height="58" viewBox="0 0 58 58">
          <path d="M5 28.8L52.6 7.2L39.4 51.6L28.4 34.1L5 28.8Z" fill={COLORS.primary} />
          <path d="M28.4 34.1L52.6 7.2L20.2 31.9L22.4 46.2L28.4 34.1Z" fill="#2F8F5B" />
          <path d="M20.2 31.9L52.6 7.2L26.5 37.2" fill="none" stroke="#FDFEFF" strokeWidth="2.2" strokeLinecap="round" opacity="0.72" />
        </svg>
      </div>
    </div>
  );
};

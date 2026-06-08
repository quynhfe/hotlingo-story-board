import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

type FloatingSmallIconProps = {
  type: "chat" | "document" | "video" | "pdf";
  x: number;
  y: number;
  startFrame: number;
  centerX?: number;
  centerY?: number;
};

const IconSvg: React.FC<{ type: FloatingSmallIconProps["type"] }> = ({ type }) => {
  if (type === "chat") {
    return (
      <svg width="40" height="40" viewBox="0 0 34 34" fill="none" style={{ flexShrink: 0 }}>
        <path d="M7.2 8.4C7.2 5.9 9.2 4 11.7 4H23C25.5 4 27.5 5.9 27.5 8.4V16.2C27.5 18.6 25.5 20.6 23 20.6H16.2L9.2 26V20.2C8 19.5 7.2 18.1 7.2 16.6V8.4Z" stroke="#124F2B" strokeWidth="2.6" strokeLinejoin="round" />
        <path d="M12.5 10.7H22.2M12.5 15.2H19" stroke="#2F8F5B" strokeWidth="2.4" strokeLinecap="round" />
      </svg>
    );
  }

  if (type === "document") {
    return (
      <svg width="40" height="40" viewBox="0 0 34 34" fill="none" style={{ flexShrink: 0 }}>
        <path d="M9 4.8H20.8L26 10V29.2H9V4.8Z" stroke="#124F2B" strokeWidth="2.6" strokeLinejoin="round" />
        <path d="M20.4 5.2V10.5H25.7" stroke="#124F2B" strokeWidth="2.6" strokeLinejoin="round" />
        <path d="M13.3 15.1H21.6M13.3 19.6H22.2M13.3 24.1H18.8" stroke="#2F8F5B" strokeWidth="2.3" strokeLinecap="round" />
      </svg>
    );
  }

  if (type === "video") {
    return (
      <svg width="40" height="40" viewBox="0 0 34 34" fill="none" style={{ flexShrink: 0 }}>
        <rect x="5.2" y="8" width="18.5" height="17.8" rx="4" stroke="#124F2B" strokeWidth="2.6" />
        <path d="M23.8 14.2L29 11.2V22.5L23.8 19.5V14.2Z" stroke="#124F2B" strokeWidth="2.6" strokeLinejoin="round" />
        <path d="M13.3 13.5L18.4 16.9L13.3 20.3V13.5Z" fill="#2F8F5B" />
      </svg>
    );
  }

  return (
    <svg width="46" height="40" viewBox="0 0 38 34" fill="none" style={{ flexShrink: 0 }}>
      <path d="M10 4.8H24.2L30 10.6V29.2H10V4.8Z" stroke="#124F2B" strokeWidth="2.6" strokeLinejoin="round" />
      <path d="M23.8 5.2V11H29.6" stroke="#124F2B" strokeWidth="2.6" strokeLinejoin="round" />
      <path d="M6.8 18.8H27.2V25.2H6.8V18.8Z" fill="#D7E8DE" stroke="#2F8F5B" strokeWidth="2.2" strokeLinejoin="round" />
      <path d="M10.2 23V20.8H11.6C12.3 20.8 12.8 21.2 12.8 21.8C12.8 22.5 12.3 23 11.6 23H10.2ZM15.2 23V20.8H16.2C17 20.8 17.6 21.2 17.6 21.9C17.6 22.6 17 23 16.2 23H15.2ZM20.3 23V20.8H23.1" stroke="#124F2B" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
};

const iconText = {
  chat: "Tin nhắn",
  document: "Tài liệu",
  video: "Video",
  pdf: "PDF",
};

export const FloatingSmallIcon: React.FC<FloatingSmallIconProps> = ({ type, x, y, startFrame, centerX = 960, centerY = 610 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = spring({ frame: Math.max(0, frame - startFrame), fps, config: { damping: 13, stiffness: 190, mass: 0.55 } });
  const absorb = interpolate(frame, [startFrame + 24, startFrame + 52], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const opacityIn = interpolate(frame, [startFrame, startFrame + 8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const opacityOut = interpolate(frame, [startFrame + 40, startFrame + 56], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const currentX = interpolate(absorb, [0, 1], [x, centerX]);
  const currentY = interpolate(absorb, [0, 1], [y, centerY]);
  const scaleIn = interpolate(pop, [0, 1], [0.72, 1.18], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const scale = scaleIn * interpolate(absorb, [0, 1], [1, 0.18]);
  const driftY = Math.sin((frame - startFrame) / 18 + x / 80) * 5 * (1 - absorb);

  return (
    <div
      style={{
        position: "absolute",
        left: currentX,
        top: currentY,
        transform: `translate(-50%, -50%) translateY(${driftY}px) scale(${scale})`,
        opacity: opacityIn * opacityOut,
        width: "max-content",
        height: 78,
        padding: "0 18px 0 16px",
        boxSizing: "border-box",
        borderRadius: 24,
        background: "rgba(255, 255, 255, 0.9)",
        color: "#124F2B",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        boxShadow: "0 20px 42px rgba(18, 79, 43, 0.15), inset 0 1px 0 rgba(255,255,255,0.92)",
        border: "1px solid rgba(18, 79, 43, 0.07)",
      }}
    >
      <IconSvg type={type} />
      <span style={{ fontSize: 22, fontWeight: 850, letterSpacing: -0.45, whiteSpace: "nowrap" }}>{iconText[type]}</span>
    </div>
  );
};

import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

const COLORS = { primary: "#124F2B", lightGreen: "#D7E8DE", accent: "#2F8F5B", teal: "#38B2AC" };

type Globe2DProps = { startFrame?: number; shrinkStartFrame?: number; showLights?: boolean; axialSpinStartFrame?: number };

const glowPoints = [
  { x: 302, y: 150, delay: 60 },
  { x: 155, y: 164, delay: 88 },
  { x: 325, y: 274, delay: 124 },
  { x: 238, y: 325, delay: 164 },
  { x: 118, y: 296, delay: 204 },
  { x: 356, y: 210, delay: 250 },
];

export const Globe2D: React.FC<Globe2DProps> = ({ startFrame = 10, shrinkStartFrame = 635, showLights = true, axialSpinStartFrame }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const entrance = spring({ frame: Math.max(0, frame - startFrame), fps, config: { damping: 18, stiffness: 92, mass: 0.75 } });
  const opacity = interpolate(frame, [startFrame, startFrame + 18], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const introScale = interpolate(entrance, [0, 1], [0.85, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const endScale = interpolate(frame, [shrinkStartFrame, shrinkStartFrame + 24], [1, 0.94], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const floatY = Math.sin((frame - 18) / 26) * 7;
  const spinProgress = axialSpinStartFrame === undefined ? 0 : interpolate(frame, [axialSpinStartFrame, axialSpinStartFrame + 34], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const axialScaleY = interpolate(spinProgress, [0, 0.5, 1], [1, 0.72, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const axialSkew = Math.sin(Math.max(0, frame - (axialSpinStartFrame ?? frame)) / 7) * 5 * spinProgress;

  return (
    <div style={{ position: "absolute", left: "50%", top: "50%", width: 438, height: 438, transform: `translate(-50%, -50%) translateY(${floatY}px) scale(${introScale * endScale})`, opacity }}>
      <div style={{ position: "absolute", left: 44, right: 44, bottom: -42, height: 44, borderRadius: "50%", background: "rgba(18, 79, 43, 0.16)", filter: "blur(18px)", transform: `scaleX(${1 + Math.sin(frame / 32) * 0.035})` }} />
      <svg width="438" height="438" viewBox="0 0 438 438" style={{ position: "relative", overflow: "visible" }}>
        <defs>
          <radialGradient id="globeGlow" cx="35%" cy="24%" r="74%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="44%" stopColor="#D7E8DE" stopOpacity="1" />
            <stop offset="100%" stopColor="#8DD8C7" stopOpacity="1" />
          </radialGradient>
          <linearGradient id="globeRim" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#38B2AC" stopOpacity="0.42" />
          </linearGradient>
          <filter id="softGlobeShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="22" stdDeviation="22" floodColor="#124F2B" floodOpacity="0.18" />
          </filter>
          <clipPath id="globeClip"><circle cx="219" cy="219" r="188" /></clipPath>
        </defs>
        <circle cx="219" cy="219" r="188" fill="url(#globeGlow)" filter="url(#softGlobeShadow)" />
        <circle cx="219" cy="219" r="188" fill="none" stroke="url(#globeRim)" strokeWidth="3" />
        <g clipPath="url(#globeClip)" transform={`translate(219 219) skewX(${axialSkew}) scale(1 ${axialScaleY}) translate(-219 -219)`}>
          <path d="M84 161C100 129 137 113 168 126C187 134 184 153 204 160C224 167 241 153 254 165C270 180 259 209 238 218C216 228 199 213 178 221C154 231 153 263 130 269C103 276 73 247 68 216C65 195 74 179 84 161Z" fill={COLORS.primary} opacity="0.28" />
          <path d="M278 101C315 106 350 136 363 170C372 193 361 211 339 211C314 211 309 187 287 180C265 173 246 188 233 174C221 160 230 132 249 116C257 109 266 103 278 101Z" fill={COLORS.accent} opacity="0.42" />
          <path d="M252 254C280 237 321 245 343 269C366 294 360 334 331 351C306 365 288 346 264 356C241 366 232 394 209 389C184 384 171 348 184 318C195 292 226 270 252 254Z" fill={COLORS.primary} opacity="0.25" />
          <path d="M77 300C96 285 125 286 142 302C157 317 150 338 130 344C107 351 78 334 68 317C64 310 68 306 77 300Z" fill={COLORS.teal} opacity="0.36" />
          <path d="M353 232C371 229 388 239 393 254C398 270 383 286 364 284C344 282 329 263 334 248C337 240 344 234 353 232Z" fill={COLORS.primary} opacity="0.2" />
          {[110, 158, 219, 280, 328].map((y, index) => <ellipse key={`lat-${y}`} cx="219" cy={y} rx={186 - Math.abs(219 - y) * 0.34} ry={34 + index * 2} fill="none" stroke={COLORS.primary} strokeWidth="1.5" opacity="0.14" />)}
          {[0, 1, 2].map((index) => <ellipse key={`long-${index}`} cx="219" cy="219" rx={58 + index * 48} ry="188" fill="none" stroke={COLORS.primary} strokeWidth="1.5" opacity="0.12" />)}
          <path d="M219 31C200 91 190 153 190 219C190 285 200 347 219 407" fill="none" stroke={COLORS.primary} strokeWidth="1.4" opacity="0.11" />
          <path d="M219 31C238 91 248 153 248 219C248 285 238 347 219 407" fill="none" stroke={COLORS.primary} strokeWidth="1.4" opacity="0.11" />
          {showLights && glowPoints.map((point) => {
            const pointIn = interpolate(frame, [point.delay, point.delay + 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            const pulse = 0.65 + Math.sin((frame - point.delay) / 9) * 0.35;
            return <g key={`${point.x}-${point.y}`} opacity={pointIn * pulse}><circle cx={point.x} cy={point.y} r="15" fill="#FFFFFF" opacity="0.34" /><circle cx={point.x} cy={point.y} r="5" fill="#124F2B" opacity="0.72" /></g>;
          })}
        </g>
        <circle cx="157" cy="118" r="14" fill="#FFFFFF" opacity="0.55" />
        <circle cx="338" cy="190" r="8" fill="#FFFFFF" opacity="0.5" />
      </svg>
    </div>
  );
};

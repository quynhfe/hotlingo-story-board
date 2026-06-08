import { interpolate, useCurrentFrame } from "remotion";

type Point = {
  x: number;
  y: number;
  frame?: number;
};

type CursorProps = {
  points: Point[];
  startFrame: number;
  segmentFrames?: number;
};

const lerp = (from: number, to: number, progress: number) => from + (to - from) * progress;
const easeInOut = (progress: number) =>
  progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2;

const getPointFrame = (point: Point, index: number, startFrame: number, segmentFrames: number) =>
  point.frame ?? startFrame + index * segmentFrames;

const getCursorPoint = (frame: number, points: Point[], startFrame: number, segmentFrames: number): Point => {
  const lastIndex = points.length - 1;
  const firstFrame = getPointFrame(points[0], 0, startFrame, segmentFrames);
  const lastFrame = getPointFrame(points[lastIndex], lastIndex, startFrame, segmentFrames);

  if (frame <= firstFrame) return points[0];
  if (frame >= lastFrame) return points[lastIndex];

  const segmentIndex = points.findIndex((point, index) => {
    if (index === lastIndex) return false;
    const segmentStart = getPointFrame(point, index, startFrame, segmentFrames);
    const segmentEnd = getPointFrame(points[index + 1], index + 1, startFrame, segmentFrames);
    return frame >= segmentStart && frame < segmentEnd;
  });
  const safeSegmentIndex = Math.max(0, segmentIndex);
  const segmentStart = getPointFrame(points[safeSegmentIndex], safeSegmentIndex, startFrame, segmentFrames);
  const segmentEnd = getPointFrame(points[safeSegmentIndex + 1], safeSegmentIndex + 1, startFrame, segmentFrames);
  const progress = interpolate(frame, [segmentStart, segmentEnd], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return {
    x: lerp(points[safeSegmentIndex].x, points[safeSegmentIndex + 1].x, easeInOut(progress)),
    y: lerp(points[safeSegmentIndex].y, points[safeSegmentIndex + 1].y, easeInOut(progress)),
  };
};

export const Cursor: React.FC<CursorProps> = ({ points, startFrame, segmentFrames = 16 }) => {
  const frame = useCurrentFrame();
  const current = getCursorPoint(frame, points, startFrame, segmentFrames);
  const endFrame = getPointFrame(points[points.length - 1], points.length - 1, startFrame, segmentFrames);
  const opacity = interpolate(frame, [startFrame - 6, startFrame + 2, endFrame + 12], [0, 1, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const scale = interpolate(frame, [startFrame - 4, startFrame + 5], [0.82, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        left: current.x,
        top: current.y,
        width: 54,
        height: 68,
        transform: `translate(-8px, -6px) scale(${scale})`,
        opacity,
        filter: "drop-shadow(0 12px 20px rgba(61, 72, 82, 0.25))",
        zIndex: 30,
      }}
    >
      <svg width="58" height="72" viewBox="0 0 42 52" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M6 5L35 31.7L21.1 33.2L16.2 47L6 5Z"
          fill="white"
          stroke="#3D4852"
          strokeWidth="3"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

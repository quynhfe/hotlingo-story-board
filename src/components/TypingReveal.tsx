import { interpolate, useCurrentFrame } from "remotion";

type TypingRevealProps = {
  text: string;
  startFrame: number;
  endFrame: number;
  style?: React.CSSProperties;
};

export const TypingReveal: React.FC<TypingRevealProps> = ({ text, startFrame, endFrame, style }) => {
  const frame = useCurrentFrame();
  const chars = Math.floor(
    interpolate(frame, [startFrame, endFrame], [0, text.length], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );

  return <span style={style}>{text.slice(0, chars)}</span>;
};

import { AbsoluteFill, Img, interpolate, Sequence, useCurrentFrame, useVideoConfig } from "remotion";

import screenshot1 from "./images/Screenshot 2026-06-05 194236.png";
import screenshot2 from "./images/Screenshot 2026-06-05 194330.png";
import screenshot3 from "./images/Screenshot 2026-06-05 194527.png";
import screenshot4 from "./images/Screenshot 2026-06-05 195330.png";

const screenshots = [screenshot1, screenshot2, screenshot3, screenshot4];

const brand = {
  orange: "#ff6b35",
  coral: "#ff3f6c",
  violet: "#7c3aed",
  navy: "#17142f",
  cream: "#fff7ed",
};

const slideCopy = [
  {
    eyebrow: "Meet HotLingo",
    title: "Learn languages with real conversations",
    body: "A friendly app experience designed to help learners build vocabulary, confidence, and everyday fluency.",
  },
  {
    eyebrow: "Practice smarter",
    title: "Interactive lessons that feel alive",
    body: "Feature-rich screens guide learners through useful phrases, listening moments, and bite-sized exercises.",
  },
  {
    eyebrow: "Track progress",
    title: "Stay motivated as skills grow",
    body: "Clear app flows make it easy to review, repeat, and see what to focus on next.",
  },
  {
    eyebrow: "HotLingo.vn",
    title: "Turn daily practice into real fluency",
    body: "Explore HotLingo and make every session a step toward speaking more naturally.",
  },
];

const cardStyle: React.CSSProperties = {
  background: "rgba(255, 255, 255, 0.86)",
  border: "1px solid rgba(255, 255, 255, 0.7)",
  borderRadius: 34,
  boxShadow: "0 28px 80px rgba(23, 20, 47, 0.2)",
};

const PhoneMockup: React.FC<{ src: string; progress: number }> = ({ src, progress }) => {
  const y = interpolate(progress, [0, 0.18, 0.82, 1], [48, 0, 0, -38], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const opacity = interpolate(progress, [0, 0.12, 0.88, 1], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const scale = interpolate(progress, [0, 0.2, 1], [0.94, 1, 1.03], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        right: 82,
        top: 82,
        width: 418,
        height: 556,
        borderRadius: 48,
        padding: 18,
        background: "linear-gradient(155deg, #211b45, #080712)",
        boxShadow: "0 36px 100px rgba(23, 20, 47, 0.42)",
        opacity,
        transform: `translateY(${y}px) scale(${scale}) rotate(-2deg)`,
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: 34,
          overflow: "hidden",
          background: "#fff",
          position: "relative",
        }}
      >
        <Img
          src={src}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>
    </div>
  );
};

const FeatureSlide: React.FC<{ index: number }> = ({ index }) => {
  const frame = useCurrentFrame();
  const localFrame = frame - index * 90;
  const progress = localFrame / 90;
  const copy = slideCopy[index];

  const textY = interpolate(progress, [0, 0.18, 0.84, 1], [34, 0, 0, -28], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const textOpacity = interpolate(progress, [0, 0.12, 0.86, 1], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <Sequence from={index * 90} durationInFrames={90}>
      <AbsoluteFill>
        <div
          style={{
            position: "absolute",
            left: 78,
            top: 116,
            width: 620,
            padding: "54px 58px",
            ...cardStyle,
            opacity: textOpacity,
            transform: `translateY(${textY}px)`,
          }}
        >
          <div
            style={{
              color: brand.coral,
              fontSize: 25,
              fontWeight: 800,
              letterSpacing: 1.5,
              textTransform: "uppercase",
              marginBottom: 18,
            }}
          >
            {copy.eyebrow}
          </div>
          <div
            style={{
              color: brand.navy,
              fontSize: 62,
              lineHeight: 1.02,
              fontWeight: 900,
              letterSpacing: -2.7,
              marginBottom: 28,
            }}
          >
            {copy.title}
          </div>
          <div
            style={{
              color: "rgba(23, 20, 47, 0.74)",
              fontSize: 30,
              lineHeight: 1.34,
              fontWeight: 560,
            }}
          >
            {copy.body}
          </div>
        </div>
        <PhoneMockup src={screenshots[index]} progress={progress} />
      </AbsoluteFill>
    </Sequence>
  );
};

const FloatingBadge: React.FC<{ children: React.ReactNode; left: number; top: number; delay: number }> = ({
  children,
  left,
  top,
  delay,
}) => {
  const frame = useCurrentFrame();
  const bob = Math.sin((frame + delay) / 17) * 9;

  return (
    <div
      style={{
        position: "absolute",
        left,
        top: top + bob,
        padding: "16px 24px",
        borderRadius: 999,
        background: "rgba(255, 255, 255, 0.78)",
        border: "1px solid rgba(255, 255, 255, 0.8)",
        color: brand.navy,
        fontSize: 24,
        fontWeight: 800,
        boxShadow: "0 18px 48px rgba(23, 20, 47, 0.13)",
      }}
    >
      {children}
    </div>
  );
};

export const MyComposition = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const outroOpacity = interpolate(frame, [318, 345, durationInFrames], [0, 1, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(circle at 18% 18%, rgba(255,107,53,0.32), transparent 34%), radial-gradient(circle at 88% 20%, rgba(124,58,237,0.22), transparent 30%), linear-gradient(135deg, ${brand.cream}, #ffe4e6 46%, #eef2ff)`,
        fontFamily: "Inter, Arial, sans-serif",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: -120,
          bottom: -180,
          width: 520,
          height: 520,
          borderRadius: "50%",
          background: "rgba(255, 107, 53, 0.22)",
          filter: "blur(8px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          right: -170,
          top: 210,
          width: 480,
          height: 480,
          borderRadius: "50%",
          background: "rgba(255, 63, 108, 0.18)",
          filter: "blur(10px)",
        }}
      />

      <FloatingBadge left={77} top={40} delay={0}>🔥 HotLingo</FloatingBadge>
      <FloatingBadge left={820} top={620} delay={30}>hotlingo.vn</FloatingBadge>

      {screenshots.map((_, index) => (
        <FeatureSlide key={index} index={index} />
      ))}

      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          opacity: outroOpacity,
          background: "linear-gradient(135deg, rgba(255,247,237,0), rgba(255,255,255,0.82))",
        }}
      >
        <div
          style={{
            ...cardStyle,
            width: 850,
            padding: "60px 74px",
          }}
        >
          <div style={{ fontSize: 96, marginBottom: 18 }}>🔥</div>
          <div
            style={{
              fontSize: 76,
              fontWeight: 950,
              letterSpacing: -3.2,
              color: brand.navy,
              marginBottom: 20,
            }}
          >
            HotLingo
          </div>
          <div
            style={{
              fontSize: 34,
              lineHeight: 1.35,
              color: "rgba(23, 20, 47, 0.72)",
              fontWeight: 650,
              marginBottom: 34,
            }}
          >
            A modern language-learning companion for confident daily practice.
          </div>
          <div
            style={{
              display: "inline-block",
              padding: "18px 34px",
              borderRadius: 999,
              background: `linear-gradient(135deg, ${brand.orange}, ${brand.coral})`,
              color: "white",
              fontSize: 30,
              fontWeight: 900,
              boxShadow: "0 18px 44px rgba(255, 63, 108, 0.3)",
            }}
          >
            Visit hotlingo.vn
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

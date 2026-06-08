import { AbsoluteFill, Img, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

import { Cursor } from "../components/Cursor";
import { GridBackground } from "../components/GridBackground";
import { TimerBadge } from "../components/TimerBadge";
import { TypingReveal } from "../components/TypingReveal";
import { WindowFrame } from "../components/WindowFrame";
import { openingHeroCopy } from "../constants/copy";
import appIcon from "../images/app-icon.png";

const COLORS = {
  primary: "#124F2B",
  lightGreen: "#D7E8DE",
  accent: "#2F8F5B",
  background: "#FDFEFF",
  text: "#3D4852",
  muted: "#6B7280",
  selection: "rgba(61, 126, 255, 0.32)",
};

const TIMING = {
  line1: 8,
  line2: 24,
  line3: 40,
  pdfIn: 18,
  firstSelectionStart: 45,
  firstSelectionEnd: 72,
  firstCopy: 74,
  firstTranslateIn: 84,
  firstTypeSource: 96,
  firstTypeTarget: 106,
  returnToPdf: 138,
  scrollStart: 150,
  scrollEnd: 300,
  secondSelectionStart: 312,
  secondSelectionEnd: 342,
  secondCopy: 344,
  secondTranslateIn: 356,
  secondTypeSource: 366,
  secondTypeTarget: 378,
  finalReturnToPdf: 408,
  finalScrollStart: 420,
  finalScrollEnd: 484,
  subtitle: 126,
};

const FONT_FAMILY = '"Be Vietnam Pro", Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';

const fadeSlide = (frame: number, start: number, distance = 22) => ({
  opacity: interpolate(frame, [start, start + 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
  transform: `translateY(${interpolate(frame, [start, start + 14], [distance, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  })}px)`,
});

const focusRange = (frame: number, start: number, end: number, fade = 16) => {
  const fadeIn = interpolate(frame, [start - fade, start], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const fadeOut = interpolate(frame, [end, end + fade], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return Math.min(fadeIn, fadeOut);
};

const Header: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <div
      style={{
        position: "absolute",
        left: 112,
        top: 54,
        display: "flex",
        alignItems: "center",
        gap: 14,
        ...fadeSlide(frame, 2, -10),
      }}
    >
      <div
        style={{
          width: 46,
          height: 46,
          borderRadius: 14,
          overflow: "hidden",
          boxShadow: "0 16px 35px rgba(18,79,43,0.22)",
        }}
      >
        <Img src={appIcon} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>
      <div>
        <div style={{ color: COLORS.primary, fontSize: 28, fontWeight: 900, letterSpacing: -0.7 }}>
          HotLingo
        </div>
        <div style={{ color: COLORS.muted, fontSize: 13, fontWeight: 650, marginTop: 1 }}>
          Dịch bất cứ đâu, không rời ứng dụng
        </div>
      </div>
    </div>
  );
};

const HeadlineLine: React.FC<{ children: React.ReactNode; start: number; color?: string }> = ({
  children,
  start,
  color = COLORS.text,
}) => {
  const frame = useCurrentFrame();
  return (
    <div
      style={{
        ...fadeSlide(frame, start),
        color,
        fontSize: 56,
        lineHeight: 1.07,
        fontWeight: 920,
        letterSpacing: -2,
        marginBottom: 4,
      }}
    >
      {children}
    </div>
  );
};

const SelectedText: React.FC<{ children: React.ReactNode; progress: number }> = ({ children, progress }) => {
  const sweep = Math.round(progress * 100);
  const opacity = interpolate(progress, [0, 0.08], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <span
      style={{
        background: `linear-gradient(90deg, rgba(147, 197, 253, ${0.7 * opacity}) 0%, rgba(147, 197, 253, ${0.7 * opacity}) ${sweep}%, transparent ${sweep}%, transparent 100%)`,
        borderRadius: 3,
        padding: "0 2px",
        boxDecorationBreak: "clone",
        WebkitBoxDecorationBreak: "clone",
      }}
    >
      {children}
    </span>
  );
};

const PdfWindow: React.FC<{ active: boolean }> = ({ active }) => {
  const frame = useCurrentFrame();
  const firstSelectionProgress = interpolate(frame, [TIMING.firstSelectionStart, TIMING.firstSelectionEnd], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const secondSelectionProgress = interpolate(frame, [TIMING.secondSelectionStart, TIMING.secondSelectionEnd], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const readingScrollY = interpolate(frame, [TIMING.scrollStart, TIMING.scrollEnd], [0, -292], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const continueScrollY = interpolate(frame, [TIMING.finalScrollStart, TIMING.finalScrollEnd], [0, -128], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const scrollY = readingScrollY + continueScrollY;

  const paragraphStyle: React.CSSProperties = { fontSize: 17, lineHeight: 1.55, color: "#374151", width: 540 };

  return (
    <WindowFrame width={760} height={480} title="document.pdf" badge="PDF tiếng Nhật" active={active}>
      <div style={{ height: "100%", display: "flex", background: "#F8FAFC" }}>
        <div style={{ width: 86, padding: 14, borderRight: "1px solid #E5E7EB", background: "#F1F5F9" }}>
          {[0, 1, 2].map((item) => (
            <div
              key={item}
              style={{
                width: 52,
                height: 68,
                borderRadius: 6,
                background: item === 0 ? "#FFFFFF" : "#E5E7EB",
                border: item === 0 ? `2px solid ${COLORS.accent}` : "1px solid #D1D5DB",
                marginBottom: 12,
              }}
            />
          ))}
        </div>
        <div style={{ flex: 1, padding: "28px 34px" }}>
          <div
            style={{
              height: 388,
              borderRadius: 10,
              background: "white",
              boxShadow: "0 12px 28px rgba(61,72,82,0.08)",
              padding: "34px 42px",
              position: "relative",
              color: "#222",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                transform: `translateY(${scrollY}px)`,
              }}
            >
              <div style={{ fontSize: 26, fontWeight: 800, marginBottom: 26 }}>1. はじめに</div>
              <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 16 }}>1.1. 本書の目的</div>
              <div style={paragraphStyle}>
                <SelectedText progress={firstSelectionProgress}>
                  本書は、外国語で記載された資料を読む際に、ユーザーが内容を理解するために翻訳ツールへ文章をコピーし、複数のウィンドウを往復する状況を説明するものです。
                </SelectedText>
              </div>
              <div style={{ ...paragraphStyle, marginTop: 18, color: "#4B5563", width: 530 }}>
                この作業は集中力を妨げ、読解の流れを中断させる原因になります。
              </div>

              <div style={{ height: 72 }} />
              <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 16 }}>1.2. 翻訳作業の課題</div>
              <div style={paragraphStyle}>
                資料を読み進めるたびに、必要な文章を探して選択し、コピーしてから翻訳タブへ移動する必要があります。
              </div>
              <div style={{ ...paragraphStyle, marginTop: 18, color: "#4B5563", width: 535 }}>
                <SelectedText progress={secondSelectionProgress}>
                  ページをスクロールした後、別の段落を再び選択して翻訳するため、作業のテンポが遅くなります。
                </SelectedText>
              </div>
              <div style={{ ...paragraphStyle, marginTop: 18, color: "#4B5563", width: 528 }}>
                その結果、ユーザーは内容よりも操作に意識を向ける時間が増えてしまいます。
              </div>

              <div style={{ height: 62 }} />
              <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 16 }}>1.3. 読み続ける流れ</div>
              <div style={paragraphStyle}>
                翻訳を確認した後、ユーザーは再び資料へ戻り、次の見出しへ進んで読み続けます。
              </div>
              <div style={{ ...paragraphStyle, marginTop: 18, color: "#4B5563", width: 532 }}>
                この一連の操作が少なくなるほど、文章の理解に集中しやすくなります。
              </div>
            </div>
          </div>
        </div>
      </div>
    </WindowFrame>
  );
};

const COPY_STEPS = [
  {
    copyFrame: TIMING.firstCopy,
    typeSource: TIMING.firstTypeSource,
    typeTarget: TIMING.firstTypeTarget,
    source:
      "本書は、外国語で記載された資料を読む際に、ユーザーが内容を理解するために翻訳ツールへ文章をコピーし、複数のウィンドウを往復する状況を説明するものです。",
    target: "Tài liệu mô tả việc người dùng phải copy đoạn văn sang công cụ dịch và qua lại giữa nhiều cửa sổ.",
  },
  {
    copyFrame: TIMING.secondCopy,
    typeSource: TIMING.secondTypeSource,
    typeTarget: TIMING.secondTypeTarget,
    source: "ページをスクロールした後、別の段落を再び選択して翻訳するため、作業のテンポが遅くなります。",
    target: "Sau khi cuộn trang, người dùng lại chọn một đoạn khác để dịch, khiến nhịp làm việc bị chậm lại.",
  },
];

const CopyBadge: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = Math.max(
    ...COPY_STEPS.map((step) =>
      interpolate(frame, [step.copyFrame - 3, step.copyFrame + 3, step.copyFrame + 12], [0, 1, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      }),
    ),
  );
  return (
    <div
      style={{
        position: "absolute",
        left: 825,
        top: 672,
        opacity,
        zIndex: 10,
        padding: "12px 16px",
        borderRadius: 999,
        background: "rgba(255,255,255,0.95)",
        color: COLORS.primary,
        fontSize: 20,
        fontWeight: 900,
        boxShadow: "0 16px 38px rgba(18,79,43,0.16)",
        border: "1px solid rgba(47,143,91,0.18)",
      }}
    >
      ⌘C copied
    </div>
  );
};

const TranslateWindow: React.FC<{ active: boolean }> = ({ active }) => {
  const frame = useCurrentFrame();
  const currentStep = frame >= TIMING.secondCopy ? COPY_STEPS[1] : COPY_STEPS[0];

  return (
    <WindowFrame width={760} height={440} title="translate.google.com" badge="Tab dịch" active={active}>
      <div style={{ padding: 24, background: "#FFFFFF", height: "100%" }}>
        <div style={{ display: "flex", gap: 16, height: 310 }}>
          <div style={{ flex: 1, border: "1px solid #E5E7EB", borderRadius: 18, padding: 22 }}>
            <div style={{ color: COLORS.primary, fontSize: 16, fontWeight: 850, marginBottom: 18 }}>Tiếng Nhật</div>
            <div style={{ color: "#374151", fontSize: 18, lineHeight: 1.5 }}>
              <TypingReveal
                key={`source-${currentStep.copyFrame}`}
                startFrame={currentStep.typeSource}
                endFrame={currentStep.typeSource + 15}
                text={currentStep.source}
              />
            </div>
          </div>
          <div style={{ flex: 1, border: "1px solid #D7E8DE", borderRadius: 18, padding: 22, background: "#F7FCFA" }}>
            <div style={{ color: COLORS.accent, fontSize: 16, fontWeight: 850, marginBottom: 18 }}>Tiếng Việt</div>
            <div style={{ color: COLORS.text, fontSize: 20, lineHeight: 1.42, fontWeight: 650 }}>
              <TypingReveal
                key={`target-${currentStep.copyFrame}`}
                startFrame={currentStep.typeTarget}
                endFrame={currentStep.typeTarget + 17}
                text={currentStep.target}
              />
            </div>
          </div>
        </div>
      </div>
    </WindowFrame>
  );
};

export const Screen02OpeningHero: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pdfSpring = spring({ frame: frame - TIMING.pdfIn, fps, config: { damping: 18, stiffness: 120 } });
  const translateSpring = spring({ frame: frame - TIMING.firstTranslateIn, fps, config: { damping: 18, stiffness: 115 } });
  const pdfFocus = Math.max(
    focusRange(frame, 0, TIMING.firstTranslateIn - 8),
    focusRange(frame, TIMING.returnToPdf, TIMING.secondTranslateIn - 8),
    focusRange(frame, TIMING.finalReturnToPdf, 520),
  );
  const translateFocus = Math.max(
    focusRange(frame, TIMING.firstTranslateIn, TIMING.returnToPdf - 8),
    focusRange(frame, TIMING.secondTranslateIn, TIMING.finalReturnToPdf - 8),
  );
  const translateOpacity = Math.max(
    focusRange(frame, TIMING.firstTranslateIn, TIMING.returnToPdf - 4, 18),
    focusRange(frame, TIMING.secondTranslateIn, TIMING.finalReturnToPdf - 4, 18),
  );

  const pdfActive = pdfFocus >= translateFocus;
  const translateActive = translateFocus > pdfFocus;
  const translatePresence = frame < TIMING.firstTranslateIn ? translateOpacity : Math.max(0.62, translateOpacity);
  const subtitle = fadeSlide(frame, TIMING.subtitle, 12);

  const pdfLift = interpolate(pdfFocus, [0, 1], [8, -10]);
  const translateLift = interpolate(translateFocus, [0, 1], [8, -12]);

  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: FONT_FAMILY, overflow: "hidden" }}>
      <GridBackground />
      <Header />

      <div style={{ position: "absolute", top: 132, left: 0, right: 0, textAlign: "center", zIndex: 20 }}>
        <HeadlineLine start={TIMING.line1}>{openingHeroCopy.headline[0]}</HeadlineLine>
        <HeadlineLine start={TIMING.line2} color={COLORS.primary}>
          {openingHeroCopy.headline[1]}
        </HeadlineLine>
        <HeadlineLine start={TIMING.line3}>
          <span>{openingHeroCopy.headline[2]}</span>
          <TimerBadge startFrame={TIMING.line3 + 4} />
        </HeadlineLine>
        <div
          style={{
            ...subtitle,
            color: COLORS.accent,
            fontSize: 30,
            fontWeight: 780,
            letterSpacing: -0.6,
            marginTop: 18,
          }}
        >
          {openingHeroCopy.supporting}
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: 420,
          top: 448 + pdfLift,
          zIndex: pdfActive ? 7 : 4,
          opacity: interpolate(pdfSpring, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(pdfSpring, [0, 1], [44, 0])}px) scale(${interpolate(pdfSpring, [0, 1], [0.94, 1])}) rotate(-2deg)`,
        }}
      >
        <PdfWindow active={pdfActive} />
      </div>

      <div
        style={{
          position: "absolute",
          left: 720,
          top: 490 + translateLift,
          zIndex: translateActive ? 9 : 5,
          opacity: translatePresence,
          transform: `translateX(${interpolate(translateSpring, [0, 1], [170, 0])}px) translateY(${interpolate(
            translateSpring,
            [0, 1],
            [32, 0],
          )}px) scale(${interpolate(translateSpring, [0, 1], [0.96, 1])}) rotate(1deg)`,
        }}
      >
        <TranslateWindow active={translateActive} />
      </div>

      <CopyBadge />
      <Cursor
        startFrame={42}
        segmentFrames={14}
        points={[
          { x: 610, y: 655, frame: 42 },
          { x: 835, y: 730, frame: 72 },
          { x: 1128, y: 718, frame: 88 },
          { x: 1128, y: 718, frame: 128 },
          { x: 1168, y: 628, frame: 142 },
          { x: 1168, y: 812, frame: 300 },
          { x: 620, y: 705, frame: 312 },
          { x: 970, y: 762, frame: 342 },
          { x: 1165, y: 730, frame: 356 },
          { x: 1165, y: 730, frame: 404 },
          { x: 1168, y: 780, frame: 416 },
          { x: 1168, y: 872, frame: 484 },
        ]}
      />
    </AbsoluteFill>
  );
};

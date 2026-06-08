import { AbsoluteFill, Img, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

import { GridBackground } from "../components/GridBackground";
import arinImg from "../images/HotLingo/arin.png";
import avatarCustomer from "../images/HotLingo/avt-1.png";
import avatarSupport from "../images/HotLingo/avt-2.png";
import healingImg from "../images/HotLingo/chua-lanh.png";
import lockedTextImg from "../images/HotLingo/pdf.png";
import rainImg from "../images/HotLingo/sau-con-mua.png";

const COLORS = {
  primary: "#124F2B",
  darkGreen: "#0D3B1F",
  lightGreen: "#D7E8DE",
  accent: "#2F8F5B",
  teal: "#38B2AC",
  text: "#3D4852",
  muted: "#6B7280",
  background: "#FDFEFF",
};

const FONT_FAMILY = '"Be Vietnam Pro", Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';

type ProblemContextCardProps = {
  title: string;
  iconType: "document" | "chat" | "story" | "locked";
  variant: "document" | "chat" | "story" | "locked";
  rotation: number;
  delayFrame: number;
  x: number;
  y: number;
  width?: number;
  minHeight?: number;
  zIndex?: number;
  children: React.ReactNode;
};

const fadeSlide = (frame: number, start: number, distance = 24) => ({
  opacity: interpolate(frame, [start, start + 25], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
  transform: `translateY(${interpolate(frame, [start, start + 25], [distance, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  })}px)`,
});

const IconBlock: React.FC<{ type: ProblemContextCardProps["iconType"] }> = ({ type }) => {
  if (type === "document") {
    return (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        <path d="M14 6H29L38 15V42H14V6Z" fill="white" stroke={COLORS.primary} strokeWidth="3" strokeLinejoin="round" />
        <path d="M29 6V16H38" stroke={COLORS.primary} strokeWidth="3" strokeLinejoin="round" />
        <path d="M19 24H33M19 30H31M19 36H34" stroke={COLORS.accent} strokeWidth="3" strokeLinecap="round" />
      </svg>
    );
  }

  if (type === "chat") {
    return (
      <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
        <path d="M9 13C9 9.7 11.7 7 15 7H35C38.3 7 41 9.7 41 13V28C41 31.3 38.3 34 35 34H25L14 43V34C11.2 33.5 9 31 9 28V13Z" fill="white" stroke={COLORS.primary} strokeWidth="3" strokeLinejoin="round" />
        <path d="M17 18H33M17 25H29" stroke={COLORS.teal} strokeWidth="3" strokeLinecap="round" />
      </svg>
    );
  }

  if (type === "story") {
    return (
      <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
        <path d="M11 9H35C38.3 9 41 11.7 41 15V41H16C13.2 41 11 38.8 11 36V9Z" fill="white" stroke={COLORS.primary} strokeWidth="3" strokeLinejoin="round" />
        <path d="M17 9V35C17 38.3 19.7 41 23 41" stroke={COLORS.primary} strokeWidth="2.6" opacity="0.45" />
        <rect x="23" y="16" width="12" height="9" rx="3" fill={COLORS.lightGreen} />
        <path d="M24 31H34M24 36H31" stroke={COLORS.accent} strokeWidth="3" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
      <rect x="9" y="12" width="32" height="26" rx="6" fill="white" stroke={COLORS.primary} strokeWidth="3" />
      <path d="M15 32L21 26L27 31L31 27L38 34" stroke={COLORS.teal} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="33" cy="21" r="4" fill={COLORS.lightGreen} />
      <rect x="27" y="27" width="16" height="14" rx="4" fill="white" stroke={COLORS.primary} strokeWidth="2.7" />
      <path d="M31 27V24C31 21.5 33 19.5 35 19.5C37 19.5 39 21.5 39 24V27" stroke={COLORS.primary} strokeWidth="2.7" strokeLinecap="round" />
    </svg>
  );
};

const ProblemContextCard: React.FC<ProblemContextCardProps> = ({ title, iconType, rotation, delayFrame, x, y, width = 460, minHeight = 330, zIndex = 1, children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const entrance = spring({ frame: Math.max(0, frame - delayFrame), fps, config: { damping: 16, stiffness: 108, mass: 0.82 } });
  const opacity = interpolate(frame, [delayFrame, delayFrame + 18], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const yOffset = interpolate(entrance, [0, 1], [150, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const scale = interpolate(entrance, [0, 1], [0.86, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const settle = interpolate(frame, [115, 150], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const floatY = Math.sin(frame / 29 + x / 140) * 7 * settle;
  const floatRotate = Math.sin(frame / 43 + y / 130) * 0.7 * settle;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width,
        minHeight,
        padding: 32,
        borderRadius: 32,
        overflow: "hidden",
        background: "rgba(255,255,255,0.92)",
        border: "1px solid rgba(18,79,43,0.08)",
        boxShadow: "0 34px 80px rgba(18,79,43,0.16), 0 10px 28px rgba(56,178,172,0.1), inset 0 1px 0 rgba(255,255,255,0.95)",
        backdropFilter: "blur(8px)",
        transform: `translate(-50%, -50%) translateY(${yOffset + floatY}px) rotate(${rotation + floatRotate}deg) scale(${scale})`,
        opacity,
        zIndex,
      }}
    >
      <div style={{ position: "absolute", right: -58, top: -58, width: 190, height: 190, borderRadius: "50%", background: "rgba(215,232,222,0.36)" }} />
      <div style={{ position: "relative" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 22 }}>
          <div style={{ width: 70, height: 70, borderRadius: 24, background: "linear-gradient(145deg, rgba(215,232,222,0.92), rgba(255,255,255,0.78))", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.9), 0 12px 26px rgba(18,79,43,0.08)" }}>
            <IconBlock type={iconType} />
          </div>
          <div style={{ color: COLORS.text, fontSize: 29, lineHeight: 1.08, fontWeight: 900, letterSpacing: -0.9 }}>{title}</div>
        </div>
        {children}
      </div>
    </div>
  );
};

const Badge: React.FC<{ children: React.ReactNode; color?: string }> = ({ children, color = COLORS.primary }) => (
  <div style={{ display: "inline-flex", alignItems: "center", padding: "6px 10px", borderRadius: 999, background: "rgba(215,232,222,0.74)", color, fontSize: 12, fontWeight: 850, letterSpacing: -0.1 }}>{children}</div>
);

const ForeignDocumentContent: React.FC = () => (
  <div style={{ borderRadius: 26, background: "linear-gradient(135deg, rgba(247,252,250,0.96), rgba(255,255,255,0.9))", border: "1px solid rgba(18,79,43,0.08)", padding: 18 }}>
    <div style={{ margin: "0 auto", width: 250, minHeight: 174, borderRadius: 18, background: "white", border: "1px solid rgba(18,79,43,0.08)", boxShadow: "0 18px 36px rgba(18,79,43,0.1)", padding: 20, position: "relative" }}>
      <div style={{ position: "absolute", right: 0, top: 0, width: 32, height: 32, borderRadius: "0 18px 0 16px", background: "linear-gradient(135deg, rgba(215,232,222,0.9), rgba(255,255,255,0.96))", borderLeft: "1px solid rgba(18,79,43,0.08)", borderBottom: "1px solid rgba(18,79,43,0.08)" }} />
      <div style={{ color: COLORS.primary, fontSize: 30, fontWeight: 950, marginBottom: 14, letterSpacing: -0.7 }}>契約書</div>
      {["第1条　本契約の目的", "サービス利用条件について", "支払いおよび更新"].map((line, index) => (
        <div key={line} style={{ height: 22, borderRadius: 10, padding: "0 10px", display: "flex", alignItems: "center", marginBottom: 9, background: index === 1 ? "rgba(215,232,222,0.86)" : "rgba(18,79,43,0.045)", color: index === 1 ? COLORS.primary : "rgba(61,72,82,0.72)", fontSize: 12.5, fontWeight: index === 1 ? 850 : 700, width: index === 2 ? "82%" : "100%" }}>{line}</div>
      ))}
    </div>
    <div style={{ display: "flex", justifyContent: "center", gap: 10, marginTop: 14 }}>
      <Badge>JP 日本語</Badge>
      <Badge color={COLORS.muted}>4 trang · PDF</Badge>
    </div>
  </div>
);

const Avatar: React.FC<{ src: string; alt: string }> = ({ src, alt }) => (
  <Img
    src={src}
    alt={alt}
    style={{
      width: 44,
      height: 44,
      borderRadius: 999,
      objectFit: "cover",
      border: "3px solid rgba(255,255,255,0.9)",
      boxShadow: "0 10px 20px rgba(18,79,43,0.1)",
      flexShrink: 0,
    }}
  />
);

const ChatCardContent: React.FC = () => (
  <div style={{ borderRadius: 26, background: "linear-gradient(135deg, rgba(247,252,250,0.98), rgba(255,255,255,0.9))", border: "1px solid rgba(18,79,43,0.08)", padding: 16 }}>
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12, color: COLORS.muted, fontSize: 13, fontWeight: 800 }}>
      <span style={{ width: 10, height: 10, borderRadius: "50%", background: COLORS.teal, boxShadow: "0 0 0 5px rgba(56,178,172,0.12)" }} />
      Online
    </div>
    <div style={{ display: "grid", gap: 10 }}>
      <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
        <Avatar src={avatarCustomer} alt="Customer avatar" />
        <div style={{ maxWidth: 270, padding: "10px 13px", borderRadius: "18px 18px 18px 7px", background: "rgba(215,232,222,0.86)", color: COLORS.primary, fontSize: 12.5, lineHeight: 1.25, fontWeight: 760 }}>Hi! I’m interested in your Premium Plan.</div>
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, alignItems: "flex-start" }}>
        <div style={{ maxWidth: 285, padding: "10px 13px", borderRadius: "18px 18px 7px 18px", background: "rgba(56,178,172,0.17)", color: COLORS.darkGreen, fontSize: 12.5, lineHeight: 1.25, fontWeight: 760 }}>Xin chào! Gói Premium bao gồm hỗ trợ ưu tiên.</div>
        <Avatar src={avatarSupport} alt="Support avatar" />
      </div>
      <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
        <Avatar src={avatarCustomer} alt="Customer avatar" />
        <div style={{ maxWidth: 260, padding: "10px 13px", borderRadius: "18px 18px 18px 7px", background: "rgba(255,255,255,0.88)", border: "1px solid rgba(18,79,43,0.06)", color: "rgba(61,72,82,0.78)", fontSize: 12.5, lineHeight: 1.25, fontWeight: 730 }}>Puis-je changer de forfait plus tard?</div>
      </div>
    </div>
    <div style={{ marginTop: 12, height: 38, borderRadius: 999, background: "white", border: "1px solid rgba(18,79,43,0.08)", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 8px 0 15px", color: COLORS.muted, fontSize: 12, fontWeight: 700 }}>
      Nhập phản hồi...
      <div style={{ width: 28, height: 28, borderRadius: "50%", background: COLORS.primary, display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 15 }}>➜</div>
    </div>
  </div>
);

const ReadingCardContent: React.FC = () => (
  <>
    <div style={{ color: COLORS.muted, fontSize: 15, lineHeight: 1.35, fontWeight: 700, marginTop: -8, marginBottom: 16 }}>Truyện tranh, webtoon và bài viết thú vị.</div>
    <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 14 }}>
      <div style={{ borderRadius: 24, minHeight: 205, background: "linear-gradient(145deg, rgba(215,232,222,0.98), rgba(56,178,172,0.22))", border: "1px solid rgba(18,79,43,0.08)", padding: 12, display: "flex", flexDirection: "column", justifyContent: "space-between", overflow: "hidden" }}>
        <div style={{ height: 148, borderRadius: 20, overflow: "hidden", boxShadow: "0 16px 28px rgba(18,79,43,0.1)" }}>
          <Img src={arinImg} alt="Hành trình của Arin" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        </div>
        <div>
          <div style={{ color: COLORS.darkGreen, fontSize: 17, fontWeight: 900, letterSpacing: -0.3, marginTop: 10 }}>Hành trình của Arin</div>
          <div style={{ marginTop: 8 }}><Badge>Fantasy</Badge></div>
        </div>
      </div>
      <div style={{ display: "grid", gap: 12 }}>
        {[
          { title: "Sau cơn mưa", tag: "Drama", image: rainImg },
          { title: "Góc nhỏ bình yên", tag: "Chữa lành", image: healingImg },
        ].map((item) => (
          <div key={item.title} style={{ borderRadius: 22, background: "rgba(255,255,255,0.82)", border: "1px solid rgba(18,79,43,0.07)", padding: 11, boxShadow: "0 12px 24px rgba(18,79,43,0.06)", overflow: "hidden" }}>
            <div style={{ height: 68, borderRadius: 17, overflow: "hidden", marginBottom: 9, boxShadow: "0 10px 18px rgba(18,79,43,0.06)" }}>
              <Img src={item.image} alt={item.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </div>
            <div style={{ color: COLORS.darkGreen, fontSize: 14.5, fontWeight: 900, marginBottom: 7 }}>{item.title}</div>
            <Badge>{item.tag}</Badge>
          </div>
        ))}
      </div>
    </div>
  </>
);

const LockedPdfImageContent: React.FC = () => (
  <>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
      <div style={{ borderRadius: 24, background: "white", border: "1px solid rgba(18,79,43,0.08)", padding: 15, boxShadow: "0 14px 30px rgba(18,79,43,0.08)" }}>
        <div style={{ display: "inline-flex", padding: "5px 8px", borderRadius: 8, background: "#FEE2E2", color: "#B91C1C", fontSize: 12, fontWeight: 950, marginBottom: 12 }}>PDF</div>
        <div style={{ height: 54, display: "flex", alignItems: "end", gap: 7, marginBottom: 12 }}>
          {[28, 42, 24, 50, 34].map((height, index) => <div key={height + index} style={{ width: 17, height, borderRadius: 8, background: index % 2 ? COLORS.teal : COLORS.lightGreen }} />)}
        </div>
        <div style={{ display: "grid", gap: 7 }}>
          <div style={{ height: 9, borderRadius: 99, background: "rgba(61,72,82,0.14)" }} />
          <div style={{ height: 9, width: "82%", borderRadius: 99, background: "rgba(61,72,82,0.1)" }} />
          <div style={{ height: 9, width: "64%", borderRadius: 99, background: "rgba(61,72,82,0.08)" }} />
        </div>
      </div>
      <div style={{ borderRadius: 24, background: "linear-gradient(135deg, rgba(215,232,222,0.92), rgba(56,178,172,0.18))", border: "1px solid rgba(18,79,43,0.08)", padding: 10, position: "relative", minHeight: 160, overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 10, borderRadius: 20, overflow: "hidden" }}>
          <Img src={lockedTextImg} alt="PDF image with locked text" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        </div>
        <div style={{ position: "absolute", inset: 10, borderRadius: 20, background: "rgba(18,79,43,0.08)" }} />
        <div style={{ position: "absolute", right: 14, top: 14, width: 40, height: 40, borderRadius: 12, background: "rgba(255,255,255,0.85)", border: "1px solid rgba(18,79,43,0.1)", boxShadow: "0 8px 20px rgba(18,79,43,0.12)", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(4px)" }}>
          <svg width="24" height="24" viewBox="0 0 40 40" fill="none"><rect x="9" y="18" width="22" height="16" rx="5" stroke={COLORS.primary} strokeWidth="3" /><path d="M14 18V13C14 9.7 16.6 7 20 7C23.4 7 26 9.7 26 13V18" stroke={COLORS.primary} strokeWidth="3" strokeLinecap="round" /></svg>
        </div>
        <div style={{ position: "absolute", left: "50%", bottom: 14, transform: "translateX(-50%)", background: "rgba(255,255,255,0.95)", padding: "5px 12px", borderRadius: 10, color: COLORS.primary, fontSize: 13, fontWeight: 900, border: "1px solid rgba(18,79,43,0.1)", boxShadow: "0 6px 14px rgba(18,79,43,0.12)", whiteSpace: "nowrap" }}>Không thể sao chép</div>
      </div>
    </div>
    <div style={{ marginTop: 14, borderRadius: 18, padding: "11px 14px", background: "rgba(215,232,222,0.72)", color: COLORS.primary, fontSize: 13.5, lineHeight: 1.25, fontWeight: 820 }}>
      Văn bản trong PDF và ảnh bị khóa không thể sao chép trực tiếp.
    </div>
  </>
);

const TinyContextDots: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [115, 140], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const dots = [
    { x: 486, y: 438, size: 13 },
    { x: 1410, y: 442, size: 10 },
    { x: 318, y: 818, size: 11 },
    { x: 1586, y: 788, size: 14 },
    { x: 970, y: 930, size: 9 },
  ];

  return (
    <>
      {dots.map((dot, index) => (
        <div key={`${dot.x}-${dot.y}`} style={{ position: "absolute", left: dot.x, top: dot.y + Math.sin(frame / 18 + index) * 7, width: dot.size, height: dot.size, borderRadius: "50%", background: index % 2 === 0 ? "rgba(18,79,43,0.16)" : "rgba(56,178,172,0.2)", opacity }} />
      ))}
    </>
  );
};

export const Screen03ProblemContext: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: FONT_FAMILY, overflow: "hidden" }}>
      <GridBackground />
      <div style={{ position: "absolute", left: -130, top: 200, width: 420, height: 420, borderRadius: "50%", background: "rgba(215,232,222,0.34)", filter: "blur(24px)" }} />
      <div style={{ position: "absolute", left: 620, top: 360, width: 650, height: 400, borderRadius: "50%", background: "rgba(215,232,222,0.24)", filter: "blur(42px)" }} />
      <div style={{ position: "absolute", right: -120, bottom: 120, width: 470, height: 470, borderRadius: "50%", background: "rgba(56,178,172,0.12)", filter: "blur(22px)" }} />

      <div style={{ position: "absolute", left: 160, top: 94, width: 920, zIndex: 10 }}>
        <div style={{ ...fadeSlide(frame, 0), color: COLORS.text, fontSize: 68, lineHeight: 1.08, fontWeight: 920, letterSpacing: -2.5 }}>
          Dù <span style={{ color: COLORS.primary }}>làm việc, học tập</span>
          <br />
          hay giải trí...
        </div>
        <div style={{ ...fadeSlide(frame, 20), marginTop: 24, color: COLORS.muted, fontSize: 38, lineHeight: 1.26, fontWeight: 700, letterSpacing: -0.8 }}>
          <span style={{ color: COLORS.primary }}>ngoại ngữ</span> vẫn xuất hiện ở mọi nơi.
        </div>
      </div>

      <TinyContextDots />

      <ProblemContextCard title="Tài liệu nước ngoài" iconType="document" variant="document" rotation={-5} delayFrame={40} x={415} y={645} width={450} minHeight={376} zIndex={2}>
        <ForeignDocumentContent />
      </ProblemContextCard>
      <ProblemContextCard title="Chat với khách hàng" iconType="chat" variant="chat" rotation={2} delayFrame={55} x={785} y={715} width={490} minHeight={392} zIndex={4}>
        <ChatCardContent />
      </ProblemContextCard>
      <ProblemContextCard title="Đọc truyện, giải trí" iconType="story" variant="story" rotation={-2} delayFrame={70} x={1195} y={645} width={502} minHeight={394} zIndex={3}>
        <ReadingCardContent />
      </ProblemContextCard>
      <ProblemContextCard title="PDF & ảnh khóa chữ" iconType="locked" variant="locked" rotation={5} delayFrame={85} x={1565} y={738} width={470} minHeight={384} zIndex={5}>
        <LockedPdfImageContent />
      </ProblemContextCard>
    </AbsoluteFill>
  );
};

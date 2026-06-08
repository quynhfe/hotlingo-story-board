import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

import { FinalBadge } from "../components/FinalBadge";
import { FloatingSmallIcon } from "../components/FloatingSmallIcon";
import { Globe2D } from "../components/Globe2D";
import { GridBackground } from "../components/GridBackground";
import { LanguageBadge } from "../components/LanguageBadge";
import { PaperPlane } from "../components/PaperPlane";

const COLORS = {
  primary: "#124F2B",
  text: "#3D4852",
  muted: "#6B7280",
  background: "#FDFEFF",
};

const FONT_FAMILY = '"Be Vietnam Pro", Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';

const fadeSlide = (frame: number, start: number, distance = 18) => ({
  opacity: interpolate(frame, [start, start + 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
  transform: `translateY(${interpolate(frame, [start, start + 16], [distance, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  })}px)`,
});

type BadgeConfig = {
  label: string;
  x: number;
  y: number;
  startFrame: number;
  wave: number;
  targetX: number;
  targetY: number;
};

const orbitTarget = (index: number, total: number) => {
  const angle = (-110 + index * (360 / total)) * (Math.PI / 180);
  return {
    targetX: 960 + Math.cos(angle) * 472,
    targetY: 614 + Math.sin(angle) * 292,
  };
};

const selectedFinalLabels = new Set([
  "Tiếng Việt",
  "Tiếng Anh",
  "Tiếng Nhật",
  "Tiếng Pháp",
  "Tiếng Đức",
  "Tiếng Tây Ban Nha",
  "Tiếng Thái",
  "Tiếng Indonesia",
  "Tiếng Hindi",
  "Tiếng Ả Rập",
  "Tiếng Thổ Nhĩ Kỳ",
  "Tiếng Hà Lan",
]);

const rawBadges = [
  { label: "Tiếng Việt", x: 1248, y: 366, startFrame: 45, wave: 1 },
  { label: "Tiếng Anh", x: 1390, y: 450, startFrame: 51, wave: 1 },
  { label: "Tiếng Nhật", x: 1324, y: 540, startFrame: 57, wave: 1 },
  { label: "Tiếng Hàn", x: 1442, y: 626, startFrame: 63, wave: 1 },
  { label: "Tiếng Trung giản thể", x: 1290, y: 714, startFrame: 69, wave: 1 },
  { label: "Tiếng Trung phồn thể", x: 1168, y: 802, startFrame: 75, wave: 1 },

  { label: "Tiếng Pháp", x: 650, y: 368, startFrame: 80, wave: 2 },
  { label: "Tiếng Đức", x: 516, y: 458, startFrame: 86, wave: 2 },
  { label: "Tiếng Tây Ban Nha", x: 626, y: 548, startFrame: 92, wave: 2 },
  { label: "Tiếng Bồ Đào Nha", x: 494, y: 642, startFrame: 98, wave: 2 },
  { label: "Tiếng Ý", x: 674, y: 726, startFrame: 104, wave: 2 },
  { label: "Tiếng Nga", x: 788, y: 812, startFrame: 110, wave: 2 },

  { label: "Tiếng Thái", x: 1178, y: 848, startFrame: 115, wave: 3 },
  { label: "Tiếng Indonesia", x: 1360, y: 816, startFrame: 121, wave: 3 },
  { label: "Tiếng Ả Rập", x: 1512, y: 736, startFrame: 127, wave: 3 },
  { label: "Tiếng Hindi", x: 1426, y: 904, startFrame: 133, wave: 3 },
  { label: "Tiếng Bengal", x: 1114, y: 922, startFrame: 139, wave: 3 },
  { label: "Tiếng Ba Tư", x: 1530, y: 570, startFrame: 145, wave: 3 },

  { label: "Tiếng Thổ Nhĩ Kỳ", x: 594, y: 824, startFrame: 150, wave: 4 },
  { label: "Tiếng Ba Lan", x: 430, y: 736, startFrame: 154, wave: 4 },
  { label: "Tiếng Ukraina", x: 382, y: 606, startFrame: 158, wave: 4 },
  { label: "Tiếng Mã Lai", x: 474, y: 886, startFrame: 162, wave: 4 },
  { label: "Tiếng Hà Lan", x: 764, y: 900, startFrame: 166, wave: 4 },
  { label: "Tiếng Philippines", x: 968, y: 928, startFrame: 170, wave: 4 },
  { label: "Tiếng Romania", x: 312, y: 474, startFrame: 174, wave: 4 },
  { label: "Tiếng Miến Điện", x: 1518, y: 410, startFrame: 178, wave: 4 },
  { label: "Tiếng Khmer", x: 1620, y: 680, startFrame: 182, wave: 4 },
  { label: "Tiếng Lào", x: 368, y: 908, startFrame: 186, wave: 4 },
];

const finalBadges = rawBadges.filter((badge) => selectedFinalLabels.has(badge.label));
const finalTargets = new Map(finalBadges.map((badge, index) => [badge.label, orbitTarget(index, finalBadges.length)]));
const badges: BadgeConfig[] = rawBadges.map((badge) => ({ ...badge, ...(finalTargets.get(badge.label) ?? { targetX: badge.x, targetY: badge.y }) }));

const HeaderText: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <div style={{ position: "absolute", top: 92, left: 0, right: 0, textAlign: "center" }}>
      <div style={{ ...fadeSlide(frame, 0), color: COLORS.text, fontSize: 74, lineHeight: 1.08, fontWeight: 920, letterSpacing: -2.6 }}>
        Phá vỡ mọi <span style={{ color: COLORS.primary }}>khoảng cách ngôn ngữ</span>.
      </div>
      <div style={{ ...fadeSlide(frame, 15), marginTop: 24, color: COLORS.muted, fontSize: 36, lineHeight: 1.32, fontWeight: 650, letterSpacing: -0.55 }}>
        Trải nghiệm nội dung toàn cầu
        <br />
        mượt mà cùng HotLingo.
      </div>
    </div>
  );
};

const AmbientOrbs: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <>
      <div style={{ position: "absolute", left: 220, top: 210 + Math.sin(frame / 42) * 8, width: 122, height: 122, borderRadius: "50%", background: "rgba(215, 232, 222, 0.48)", boxShadow: "inset 10px 10px 24px rgba(18, 79, 43, 0.04), inset -12px -12px 26px rgba(255, 255, 255, 0.72)", opacity }} />
      <div style={{ position: "absolute", right: 250, top: 258 + Math.cos(frame / 48) * 7, width: 84, height: 84, borderRadius: "50%", background: "rgba(56, 178, 172, 0.12)", boxShadow: "inset 8px 8px 18px rgba(18, 79, 43, 0.04), inset -10px -10px 24px rgba(255, 255, 255, 0.72)", opacity }} />
    </>
  );
};

const BadgeLayer: React.FC = () => {
  const frame = useCurrentFrame();
  const gather = frame >= 185;

  return (
    <>
      {badges.map((badge) => {
        const oldWave = (frame >= 80 && badge.wave === 1) || (frame >= 115 && badge.wave === 2) || (frame >= 150 && badge.wave === 3);
        const hiddenAtEnd = gather && !selectedFinalLabels.has(badge.label);
        const endFade = hiddenAtEnd ? interpolate(frame, [185, 205], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) : 1;

        return (
          <div key={badge.label} style={{ opacity: endFade }}>
            <LanguageBadge
              label={badge.label}
              x={badge.x}
              y={badge.y}
              targetX={badge.targetX}
              targetY={badge.targetY}
              startFrame={badge.startFrame}
              gatherStartFrame={185}
              dimmed={oldWave || hiddenAtEnd}
              fontSize={gather ? 21 : undefined}
            />
          </div>
        );
      })}
    </>
  );
};

export const Screen02GlobeLanguages: React.FC = () => {

  return (
    <AbsoluteFill style={{ background: COLORS.background, fontFamily: FONT_FAMILY, overflow: "hidden" }}>
      <GridBackground />
      <AmbientOrbs />
      <HeaderText />

      <div style={{ position: "absolute", left: 960, top: 610, width: 438, height: 438, transform: "translate(-50%, -50%)" }}>
        <Globe2D startFrame={15} shrinkStartFrame={220} />
      </div>
      <PaperPlane startFrame={30} endFrame={220} centerY={610} radiusX={286} radiusY={176} fadeOutStartFrame={174} />

      <BadgeLayer />

      <>
        <FloatingSmallIcon type="chat" x={1264} y={532} startFrame={116} />
        <FloatingSmallIcon type="document" x={768} y={522} startFrame={126} />
        <FloatingSmallIcon type="video" x={1222} y={752} startFrame={136} />
        <FloatingSmallIcon type="pdf" x={768} y={754} startFrame={146} />
      </>

      <FinalBadge startFrame={190} y={967} />
    </AbsoluteFill>
  );
};

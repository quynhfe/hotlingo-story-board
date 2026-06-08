type WindowFrameProps = {
  children: React.ReactNode;
  title?: string;
  badge?: string;
  active?: boolean;
  width: number;
  height: number;
  background?: string;
};

export const WindowFrame: React.FC<WindowFrameProps> = ({
  children,
  title,
  badge,
  active = false,
  width,
  height,
  background = "#FFFFFF",
}) => {
  return (
    <div
      style={{
        width,
        height,
        borderRadius: 28,
        background,
        border: "1px solid rgba(215, 232, 222, 0.78)",
        boxShadow: active
          ? "0 34px 92px rgba(18, 79, 43, 0.24), inset 0 1px 0 rgba(255,255,255,0.9)"
          : "0 22px 62px rgba(61, 72, 82, 0.14), inset 0 1px 0 rgba(255,255,255,0.85)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div
        style={{
          height: 46,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 18px",
          background: "linear-gradient(180deg, rgba(255,255,255,0.96), rgba(247,252,250,0.92))",
          borderBottom: "1px solid rgba(215, 232, 222, 0.66)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#FCA5A5" }} />
          <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#FCD34D" }} />
          <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#38B2AC" }} />
          {title ? (
            <span style={{ marginLeft: 12, color: "#6B7280", fontSize: 15, fontWeight: 750 }}>{title}</span>
          ) : null}
        </div>
        {badge ? (
          <div
            style={{
              padding: "7px 12px",
              borderRadius: 999,
              background: active ? "rgba(18,79,43,0.94)" : "rgba(215,232,222,0.72)",
              color: active ? "#FFFFFF" : "#124F2B",
              fontSize: 14,
              fontWeight: 850,
            }}
          >
            {badge}
          </div>
        ) : null}
      </div>
      {children}
    </div>
  );
};

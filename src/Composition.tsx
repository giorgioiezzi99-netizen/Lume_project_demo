import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { Audio } from "@remotion/media";

const photo = staticFile("LUME.png");
const ambient = staticFile("lume-ambient.wav");
const ink = "#0b0a09";
const paper = "#f3ecdf";
const muted = "#81776b";

const ease = Easing.bezier(0.22, 1, 0.36, 1);

const smooth = (frame: number, start: number, end: number) =>
  interpolate(frame, [start, end], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: ease,
  });

const scene = (frame: number, start: number, end: number, fade = 20) =>
  smooth(frame, start, start + fade) * (1 - smooth(frame, end - fade, end));

const LogoMark: React.FC<{ size: number; opacity?: number }> = ({
  size,
  opacity = 1,
}) => (
  <svg
    width={size}
    height={(size * 260) / 240}
    viewBox="0 0 240 260"
    style={{ display: "block", opacity }}
  >
    <g
      fill="none"
      stroke="currentColor"
      strokeWidth="12"
      strokeLinecap="square"
      strokeLinejoin="miter"
    >
      <path d="M119 236C73 233 42 204 43 161c.5-31 20-62 39-91l9 58 31-93 65 120c24 49-18 83-68 81Z" />
      <path d="M119 234c-30-2-49-24-39-55l39-71 39 71c10 31-9 53-39 55Z" />
      <path d="M122 36v72" />
      <path d="M82 70 91 128" />
      <path d="M43 161l40 32" />
      <path d="M187 155l-39 38" />
    </g>
  </svg>
);

const BrandCard: React.FC<{ opacity: number; compact?: boolean }> = ({
  opacity,
  compact = false,
}) => (
  <AbsoluteFill
    style={{
      opacity,
      alignItems: "center",
      justifyContent: "center",
      color: ink,
      transform: `translateY(${(1 - opacity) * 18}px)`,
    }}
  >
    <div style={{ color: ink, marginBottom: compact ? 18 : 26 }}>
      <LogoMark size={compact ? 50 : 72} opacity={0.9} />
    </div>
    <div
      style={{
        fontSize: compact ? 22 : 28,
        letterSpacing: compact ? 8 : 11,
        fontWeight: 500,
      }}
    >
      LUME
    </div>
    <div
      style={{
        marginTop: compact ? 16 : 22,
        color: muted,
        fontSize: compact ? 13 : 15,
        letterSpacing: 4,
      }}
    >
      PRIVATE IDENTITY
    </div>
  </AbsoluteFill>
);

const ProductImage: React.FC<{
  opacity: number;
  scale: number;
  x?: number;
  y?: number;
  fit?: "cover" | "contain";
  dim?: number;
}> = ({ opacity, scale, x = 0, y = 0, fit = "cover", dim = 0 }) => (
  <AbsoluteFill style={{ opacity, overflow: "hidden", background: paper }}>
    <Img
      src={photo}
      style={{
        width: "100%",
        height: "100%",
        objectFit: fit,
        transform: `translate(${x}px, ${y}px) scale(${scale})`,
        transformOrigin: "center",
        filter: "contrast(1.035) saturate(0.96)",
      }}
    />
    {dim > 0 ? (
      <AbsoluteFill style={{ background: `rgba(11,10,9,${dim})` }} />
    ) : null}
  </AbsoluteFill>
);

const SafeCaption: React.FC<{
  opacity: number;
  eyebrow: string;
  headline: string;
  subline: string;
}> = ({ opacity, eyebrow, headline, subline }) => (
  <div
    style={{
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
      height: 178,
      background: "rgba(243,236,223,0.96)",
      opacity,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 112px",
      color: ink,
      borderTop: "1px solid rgba(11,10,9,0.08)",
      transform: `translateY(${(1 - opacity) * 28}px)`,
    }}
  >
    <div>
      <div style={{ color: muted, fontSize: 13, letterSpacing: 4 }}>
        {eyebrow}
      </div>
      <div
        style={{
          marginTop: 12,
          fontSize: 29,
          letterSpacing: 7,
          fontWeight: 500,
        }}
      >
        {headline}
      </div>
    </div>
    <div
      style={{
        color: muted,
        fontSize: 14,
        letterSpacing: 3,
        maxWidth: 420,
        textAlign: "right",
        lineHeight: 1.8,
      }}
    >
      {subline}
    </div>
  </div>
);

export const LumeShowcase: React.FC = () => {
  const frame = useCurrentFrame();
  const intro = scene(frame, 0, 80);
  const fullReveal = scene(frame, 54, 178);
  const closeLogo = scene(frame, 150, 260);
  const final = smooth(frame, 258, 318);

  const revealScale = interpolate(frame, [54, 178], [1.045, 1.0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: ease,
  });
  const closeScale = interpolate(frame, [150, 260], [1.42, 1.62], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: ease,
  });

  return (
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(circle at 50% 32%, #f6efe3 0, #e8dfcf 48%, #d6cabb 100%)",
        fontFamily:
          'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        overflow: "hidden",
      }}
    >
      <Audio
        src={ambient}
        volume={(f) =>
          interpolate(f, [0, 45, 300, 360], [0, 0.18, 0.18, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })
        }
      />
      <BrandCard opacity={intro} />

      <ProductImage opacity={fullReveal} scale={revealScale} fit="cover" />
      <SafeCaption
        opacity={fullReveal * smooth(frame, 92, 122) * (1 - smooth(frame, 148, 176))}
        eyebrow="BLACK-ON-BLACK"
        headline="PRIVATE IDENTITY"
        subline="A minimal product language built around tone, restraint, and one quiet mark."
      />

      <ProductImage
        opacity={closeLogo}
        scale={closeScale}
        x={-78}
        y={42}
        fit="cover"
      />
      <SafeCaption
        opacity={closeLogo * smooth(frame, 176, 206) * (1 - smooth(frame, 232, 258))}
        eyebrow="FLAT TONAL PRINT"
        headline="SEEN ONLY UP CLOSE"
        subline="The mark stays part of the fabric, not above it. No shine, no bulk, no noise."
      />

      <ProductImage opacity={final * 0.22} scale={1.02} fit="cover" dim={0.18} />
      <BrandCard opacity={final} compact />
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 96,
          opacity: final,
          textAlign: "center",
          color: muted,
          fontSize: 14,
          letterSpacing: 4,
          transform: `translateY(${(1 - final) * 14}px)`,
        }}
      >
        MADE ONCE. NO DUPLICATES.
      </div>

      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          boxShadow: "inset 0 0 140px rgba(18,14,10,0.12)",
        }}
      />
    </AbsoluteFill>
  );
};

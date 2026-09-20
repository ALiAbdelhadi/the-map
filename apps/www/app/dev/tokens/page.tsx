import { assertDevPage } from "../dev-only";

/**
 * Dev-only token sheet.
 *
 * Renders every token declared in packages/ui/src/styles/theme.css so the token
 * layer can be compared against Figma by eye. Values are read through `var(...)`
 * rather than repeated here — this page must never become a second place where a
 * design value is defined.
 */

const RAMPS = ["primary", "secondary", "green", "yellow", "natural", "error"] as const;
const STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const;

const SIZES = [
  12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 56,
] as const;

const WEIGHTS = [
  { name: "regular", value: 400 },
  { name: "medium", value: 500 },
  { name: "semibold", value: 600 },
  { name: "bold", value: 700 },
] as const;

const RADII = ["button", "card", "chip", "nav", "row", "header", "pill", "full"] as const;
const SHADOWS = ["card", "review", "click"] as const;
const SPACING_STEPS = [0.5, 1, 1.75, 2, 2.25, 3, 4, 5, 6, 8, 20] as const;

const SURFACES = [
  { token: "surface-glass", label: "surface-glass", source: "888:19276 — hero card" },
  {
    token: "surface-glass-strong",
    label: "surface-glass-strong",
    source: "995:20699 — provider pill",
  },
  { token: "surface-header", label: "surface-header", source: "1028:25400 — header bar" },
] as const;

function Section({
  title,
  note,
  children,
}: {
  title: string;
  note?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-4 border-t border-natural-200 pt-8">
      <div className="flex flex-col gap-1">
        <h2 className="text-24 font-semibold">{title}</h2>
        {note ? <p className="text-14 text-natural-600">{note}</p> : null}
      </div>
      {children}
    </section>
  );
}

export default function TokensPage() {
  assertDevPage();

  return (
    <main className="mx-auto flex max-w-desktop flex-col gap-12 p-8">
      <header className="flex flex-col gap-2">
        <h1 className="text-38 font-bold text-primary-500">Design tokens</h1>
        <p className="text-16 text-natural-600">
          Every token in packages/ui/src/styles/theme.css, straight from the Figma file
          jfNj5yN77f5lk3SULMAHjN. Dev only.
        </p>
      </header>

      <Section title="Colour" note="6 ramps x 11 steps — Figma variables, node 853:18554.">
        <div className="flex flex-col gap-6">
          {RAMPS.map((ramp) => (
            <div key={ramp} className="flex flex-col gap-2">
              <h3 className="text-18 font-medium">{ramp}</h3>
              <div className="flex flex-wrap gap-2">
                {STEPS.map((step) => (
                  <div key={step} className="flex w-24 flex-col gap-1">
                    <div
                      className="h-16 w-full rounded-button border border-natural-200"
                      style={{ background: `var(--color-${ramp}-${step})` }}
                    />
                    <span className="text-12 text-natural-600">
                      {ramp}-{step}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="flex flex-col gap-2">
            <h3 className="text-18 font-medium">background</h3>
            <div className="flex w-24 flex-col gap-1">
              <div
                className="h-16 w-full rounded-button border border-natural-200"
                style={{ background: "var(--color-bg)" }}
              />
              <span className="text-12 text-natural-600">bg</span>
            </div>
          </div>
        </div>
      </Section>

      <Section
        title="Translucent surfaces"
        note="Figma's two gradient variables resolve empty; these values come from the nodes that use them."
      >
        <div className="flex flex-wrap gap-4 rounded-card bg-secondary-800 p-6">
          {SURFACES.map((surface) => (
            <div key={surface.token} className="flex w-64 flex-col gap-2">
              <div
                className="flex h-24 items-center justify-center rounded-card backdrop-blur-glass"
                style={{ background: `var(--color-${surface.token})` }}
              >
                <span className="text-14 text-bg">blur-glass 13px</span>
              </div>
              <span className="text-12 text-bg">{surface.label}</span>
              <span className="text-12 text-natural-300">{surface.source}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section
        title="Typography"
        note="Baloo 2 — 23 sizes x 4 weights. Tracking -2% at every size; line-height normal, matching the real text nodes."
      >
        <div className="flex flex-col gap-4">
          {SIZES.map((size) => (
            <div key={size} className="flex flex-col gap-1 border-b border-natural-100 pb-4">
              <span className="text-12 text-natural-600">text-{size}</span>
              <div className="flex flex-wrap items-baseline gap-6">
                {WEIGHTS.map((weight) => (
                  <p
                    key={weight.name}
                    style={{
                      fontSize: `var(--text-${size})`,
                      letterSpacing: `var(--text-${size}--letter-spacing)`,
                      lineHeight: `var(--text-${size}--line-height)`,
                      fontWeight: `var(--font-weight-${weight.name})`,
                    }}
                  >
                    The Map {weight.value}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section
        title="Font families"
        note="Latin: Baloo 2. Arabic: Baloo Bhaijaan 2 (approved substitute — gap T1)."
      >
        <div className="flex flex-col gap-4">
          <p className="font-sans text-32">The Map — your smart way to explore</p>
          <p className="font-arabic text-32" dir="rtl" lang="ar">
            الخريطة — طريقتك الذكية لاستكشاف كل ما حولك
          </p>
        </div>
      </Section>

      <Section
        title="Spacing"
        note="No Figma spacing variables; base unit 4px (--spacing: 0.25rem)."
      >
        <div className="flex flex-col gap-2">
          {SPACING_STEPS.map((step) => (
            <div key={step} className="flex items-center gap-4">
              <span className="w-24 text-12 text-natural-600">spacing {step}</span>
              <div
                className="h-4 bg-primary-500"
                style={{ width: `calc(var(--spacing) * ${step})` }}
              />
              <span className="text-12 text-natural-600">{step * 4}px</span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Radii" note="Raw values, each traced to the node it was read from.">
        <div className="flex flex-wrap gap-4">
          {RADII.map((radius) => (
            <div key={radius} className="flex w-40 flex-col gap-2">
              <div
                className="h-24 w-full border-2 border-primary-500 bg-primary-50"
                style={{ borderRadius: `var(--radius-${radius})` }}
              />
              <span className="text-12 text-natural-600">radius-{radius}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Shadows" note="Figma effect variables `shadow`, `Reviews`, `Click here`.">
        <div className="flex flex-wrap gap-8 p-4">
          {SHADOWS.map((shadow) => (
            <div key={shadow} className="flex w-48 flex-col gap-2">
              <div
                className="h-24 w-full rounded-card bg-bg"
                style={{ boxShadow: `var(--shadow-${shadow})` }}
              />
              <span className="text-12 text-natural-600">shadow-{shadow}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Layout" note="Only the three widths that exist in Figma.">
        <dl className="grid grid-cols-2 gap-x-8 gap-y-2 text-14">
          <dt className="text-natural-600">breakpoint-tablet</dt>
          <dd>48rem — 768px (iPad mini 5, 8 columns of 74, gutter 16, margin 32)</dd>
          <dt className="text-natural-600">breakpoint-desktop</dt>
          <dd>90rem — 1440px (Desktop, 12 columns of 85, gutter 24, margin 80)</dd>
          <dt className="text-natural-600">container-mobile</dt>
          <dd>21.5rem — 344px (375 frame, 4 columns of 74, gutter 16)</dd>
          <dt className="text-natural-600">container-tablet</dt>
          <dd>44rem — 704px</dd>
          <dt className="text-natural-600">container-desktop</dt>
          <dd>80.25rem — 1284px</dd>
        </dl>
      </Section>
    </main>
  );
}

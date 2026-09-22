import { GradientBorder } from "@themap/ui/components/gradient-border";
import { prototype } from "@themap/ui/motion/tokens";

/**
 * The `Get the App Now` badge's stroke (`936:20234`, also inside the provider
 * section): a 4 px primary/500 → white gradient. On hover it moves to white at
 * 14.9 % → primary/500 at 67.3 % (Figma's second variant) and back on leave — it no
 * longer loops by itself (approved 2026-09-22).
 */
export function BadgeBorder() {
  return (
    <GradientBorder
      mode="hover"
      width="-m-1 p-1"
      states={[
        [
          [0, "var(--color-primary-500)"],
          [1, "var(--color-white)"],
        ],
        [
          [0.149, "var(--color-white)"],
          [0.673, "var(--color-primary-500)"],
        ],
      ]}
      steps={[prototype.hover.border, prototype.hover.border]}
    />
  );
}

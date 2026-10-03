import { GradientBorder } from "@themap/ui/components/gradient-border";
import { prototype } from "@themap/ui/motion/tokens";

export function BadgeBorder() {
  return (
    <GradientBorder
      mode="hover"
      width="p-1"
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

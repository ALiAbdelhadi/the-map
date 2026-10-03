import { gsap } from "./gsap";

export type Sizes = Map<Element, { width: number; height: number }>;

export function measureSizes(elements: Iterable<Element>): Sizes {
  const sizes: Sizes = new Map();
  for (const element of elements) {
    const box = element.getBoundingClientRect();
    sizes.set(element, { width: box.width, height: box.height });
  }
  return sizes;
}

export function morphSizes(
  before: Sizes,
  vars: gsap.TweenVars,
  axes: ("width" | "height")[] = ["width", "height"],
): gsap.core.Tween[] {
  const tweens: gsap.core.Tween[] = [];
  for (const [element, old] of before) {
    if (!element.isConnected) continue;
    if (gsap.isTweening(element)) {
      gsap.killTweensOf(element, axes.join(","));
      gsap.set(element, { clearProps: axes.join(",") });
    }
    const box = element.getBoundingClientRect();
    const from: gsap.TweenVars = {};
    const to: gsap.TweenVars = {};
    for (const axis of axes) {
      const now = box[axis];
      if (Math.abs(now - old[axis]) < 0.5) continue;
      from[axis] = old[axis];
      to[axis] = now;
    }
    if (Object.keys(to).length === 0) continue;
    tweens.push(
      gsap.fromTo(element, from, { ...to, ...vars, clearProps: axes.join(","), overwrite: "auto" }),
    );
  }
  return tweens;
}

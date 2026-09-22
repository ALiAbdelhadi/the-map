/**
 * Size morphs — animate real width / height changes instead of scaling.
 *
 * GSAP Flip scales elements to fake a layout change, which stretches images and
 * squashes text mid-move. For components whose boxes change size between states
 * (reviews, stepper, Why Choose Us), measure the boxes before the state change,
 * measure again after React has rendered, and tween each box from its old size to
 * its new one. When the tween ends the inline size is removed, so the classes (and
 * the responsive layout) take over again.
 */
import { gsap } from "./gsap";

export type Sizes = Map<Element, { width: number; height: number }>;

/** Border-box sizes of `elements`, as rendered now. */
export function measureSizes(elements: Iterable<Element>): Sizes {
  const sizes: Sizes = new Map();
  for (const element of elements) {
    const box = element.getBoundingClientRect();
    sizes.set(element, { width: box.width, height: box.height });
  }
  return sizes;
}

/**
 * Tweens every element whose size differs between `before` and now. `axes` picks
 * which dimensions animate. Returns the tweens so the caller can sequence them.
 */
export function morphSizes(
  before: Sizes,
  vars: gsap.TweenVars,
  axes: ("width" | "height")[] = ["width", "height"],
): gsap.core.Tween[] {
  const tweens: gsap.core.Tween[] = [];
  for (const [element, old] of before) {
    if (!element.isConnected) continue;
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

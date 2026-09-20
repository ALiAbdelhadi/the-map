import { VisuallyHidden } from "@themap/ui/visually-hidden";

/**
 * Scaffold page. Phase 1 verifies the toolchain only — no design values, no copy
 * and no layout from Figma are implemented here. Phase 5 replaces this file.
 */
export default function Page() {
  return (
    <main className="p-6">
      <h1 className="text-2xl">The Map — scaffold</h1>
      <p>Phase 1: monorepo, TypeScript, Tailwind v4 and lint wiring verified.</p>
      <VisuallyHidden>Scaffold page</VisuallyHidden>
    </main>
  );
}

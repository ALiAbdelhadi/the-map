import { VisuallyHidden } from "@themap/ui/visually-hidden";

/**
 * Placeholder home page.
 *
 * Phases 1–4 verify the toolchain, tokens, assets and components; none of the
 * Figma layout or copy is implemented here. Phase 5 replaces this file with the
 * real page, built from the Figma frames.
 *
 * Review surfaces in the meantime: /dev/tokens, /dev/assets, /dev/components.
 */
export default function Page() {
  return (
    <main className="mx-auto flex max-w-desktop flex-col gap-4 p-8">
      <h1 className="text-38 font-bold text-primary-500">The Map</h1>
      <p className="text-16 text-natural-600">
        Scaffold only. Tokens, assets and components are built; the page itself lands in Phase 5.
      </p>
      <VisuallyHidden>Placeholder home page</VisuallyHidden>
    </main>
  );
}

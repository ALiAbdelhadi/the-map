import { baloo2, balooBhaijaan2 } from "../fonts";
import "../globals.css";

export default function DevLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" className={`${baloo2.variable} ${balooBhaijaan2.variable}`}>
      <body className="bg-bg font-sans text-secondary-500 antialiased">{children}</body>
    </html>
  );
}

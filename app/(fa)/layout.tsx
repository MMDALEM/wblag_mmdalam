import type { ReactNode } from "react";
import ThemeScript from "@/components/ThemeScript";
import { fa } from "@/content/fa";
import { buildMetadata } from "@/lib/metadata";
import { kufi, plexMono, vazirmatn } from "../fonts";
import "../globals.css";

export const metadata = buildMetadata(fa);
export { viewport } from "@/lib/metadata";

export default function FaLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="fa"
      dir="rtl"
      className={`${vazirmatn.variable} ${kufi.variable} ${plexMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <ThemeScript />
      </head>
      <body>{children}</body>
    </html>
  );
}

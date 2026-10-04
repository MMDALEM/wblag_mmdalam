import type { ReactNode } from "react";
import ThemeScript from "@/components/ThemeScript";
import { en } from "@/content/en";
import { buildMetadata } from "@/lib/metadata";
import { plexMono, plexSans, sora, vazirmatn } from "../../fonts";
import "../../globals.css";

export const metadata = buildMetadata(en);
export { viewport } from "@/lib/metadata";

export default function EnLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      dir="ltr"
      className={`${sora.variable} ${plexSans.variable} ${plexMono.variable} ${vazirmatn.variable}`}
      suppressHydrationWarning
    >
      <head>
        <ThemeScript />
      </head>
      <body>{children}</body>
    </html>
  );
}

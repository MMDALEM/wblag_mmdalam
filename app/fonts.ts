import { IBM_Plex_Mono, IBM_Plex_Sans, Noto_Kufi_Arabic, Sora, Vazirmatn } from "next/font/google";

// Persian body text (also covers Latin terms like "Node.js" inside Persian sentences).
export const vazirmatn = Vazirmatn({
  subsets: ["arabic", "latin"],
  variable: "--font-vazirmatn",
  display: "swap",
});

// Persian display: Kufic letterforms are built on a grid, which echoes the lattice motif.
export const kufi = Noto_Kufi_Arabic({
  subsets: ["arabic"],
  variable: "--font-kufi",
  display: "swap",
});

export const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

export const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-sans",
  display: "swap",
});

export const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

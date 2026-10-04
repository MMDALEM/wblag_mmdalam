import type { Metadata } from "next";
import ThemeScript from "@/components/ThemeScript";
import { plexMono, sora, vazirmatn } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "404 — صفحه پیدا نشد · Page not found",
  robots: { index: false },
};

export default function GlobalNotFound() {
  return (
    <html
      lang="fa"
      dir="rtl"
      className={`${vazirmatn.variable} ${sora.variable} ${plexMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <ThemeScript />
      </head>
      <body>
        <main className="notfound">
          <h1>404</h1>
          <p>این صفحه وجود ندارد.</p>
          <p lang="en" dir="ltr">
            This page doesn&apos;t exist.
          </p>
          <div className="links">
            <a className="btn btn-primary" href="/">
              صفحه اصلی
            </a>
            <a className="btn btn-ghost" href="/en" lang="en">
              English
            </a>
          </div>
        </main>
      </body>
    </html>
  );
}

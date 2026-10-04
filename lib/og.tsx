import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

// Satori can't shape Persian text, so the share card is in English for both locales.
export async function renderOg() {
  const photo = await readFile(join(process.cwd(), "public/images/profile.jpg"));
  const src = `data:image/jpeg;base64,${photo.toString("base64")}`;

  const dots = [];
  for (let i = 0; i < 26; i++) {
    for (let j = 0; j < 14; j++) {
      dots.push(
        <div
          key={`${i}-${j}`}
          style={{
            position: "absolute",
            left: i * 56 + j * 24 - 260,
            top: j * 48 + 6,
            width: 5,
            height: 5,
            borderRadius: 5,
            background: "#b3c3c0",
          }}
        />,
      );
    }
  }

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#f2f5f4", position: "relative" }}>
        <div style={{ position: "absolute", top: 0, left: 0, width: 1200, height: 630, display: "flex" }}>
          {dots}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "0 64px",
            flex: 1,
            background: "linear-gradient(90deg, #f2f5f4 62%, rgba(242,245,244,0))",
          }}
        >
          <div style={{ fontSize: 26, color: "#0b6e6e", letterSpacing: 1 }}>mmdalam</div>
          <div style={{ fontSize: 72, fontWeight: 700, color: "#0f1d24", lineHeight: 1.05, marginTop: 12 }}>
            Mohammad Alemzadeh
          </div>
          <div style={{ fontSize: 34, color: "#0f1d24", marginTop: 24 }}>Senior Back-End Developer</div>
          <div style={{ fontSize: 34, color: "#0f1d24" }}>& Technical Team Lead</div>
          <div style={{ fontSize: 23, color: "#53646b", marginTop: 24 }}>
            Node.js · TypeScript · MongoDB · Post-Quantum Cryptography
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", paddingRight: 64 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            width={300}
            height={400}
            style={{ objectFit: "cover", borderRadius: 16, border: "3px solid #0b6e6e" }}
            alt=""
          />
        </div>
      </div>
    ),
    ogSize,
  );
}

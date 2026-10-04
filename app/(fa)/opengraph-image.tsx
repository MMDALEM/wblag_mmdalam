import { ogSize, renderOg } from "@/lib/og";

export const alt = "Mohammad Alemzadeh — Senior Back-End Developer & Technical Team Lead";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOg();
}

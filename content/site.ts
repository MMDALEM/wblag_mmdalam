// Shared, language-independent details used across both locales.

// Accepts "mmdalam.ir", "https://mmdalam.ir/" etc. and returns a clean origin, or null if unusable.
function normalizeUrl(value: string | undefined) {
  const trimmed = value?.trim();
  if (!trimmed) return null;
  const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  try {
    return new URL(withProtocol).origin;
  } catch {
    return null;
  }
}

function resolveSiteUrl() {
  return (
    normalizeUrl(process.env.NEXT_PUBLIC_SITE_URL) ??
    normalizeUrl(process.env.VERCEL_PROJECT_PRODUCTION_URL) ??
    "http://localhost:3000"
  );
}

export const site = {
  url: resolveSiteUrl(),
  email: "mmdalam.work@gmail.com",
  phone: { display: "0916-999-9744", displayFa: "۰۹۱۶-۹۹۹-۹۷۴۴", tel: "+989169999744" },
  cvFa: "/Mohammad-Alemzadeh-Resume-FA.pdf",
  repo: "https://github.com/MMDALEM/wblag_mmdalam",
  social: {
    github: "https://github.com/MMDALEM",
    linkedin: "https://www.linkedin.com/in/mohammad-alemzadeh-66549b228/",
    telegram: "https://t.me/mmdalam1999",
    whatsapp: "https://wa.me/989169999744",
    instagram: "https://www.instagram.com/mohammad_alam1999/",
  },
} as const;

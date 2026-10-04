export type Locale = "fa" | "en";

export type LinkItem = { label: string; href: string };

export type Experience = {
  role: string;
  roleAlt?: string;
  org: string;
  meta: string;
  period: string;
  current?: boolean;
  points: string[];
};

export type Project = {
  title: string;
  description: string;
  year: string;
  kind: string;
  image?: string;
  /** Short text shown on the cover when there is no screenshot. */
  cover?: string;
  stack: string[];
  links: LinkItem[];
};

export type Content = {
  locale: Locale;
  dir: "rtl" | "ltr";
  meta: { title: string; description: string; keywords: string[] };
  nav: { id: string; label: string }[];
  ui: {
    skip: string;
    switchLang: string;
    switchLangHref: string;
    switchLangLabel: string;
    themeToggle: string;
    downloadCv: string;
    contactCta: string;
    now: string;
    latticeCaption: string;
    present: string;
    viewCode: string;
    viewSite: string;
    viewPackage: string;
    copyEmail: string;
    copied: string;
    menu: string;
    backToTop: string;
  };
  hero: {
    name: string;
    nameAlt: string;
    role: string;
    focus: string;
    lede: string;
    nowText: string;
  };
  about: {
    title: string;
    paragraphs: string[];
    facts: { label: string; value: string; dir?: "ltr" }[];
  };
  skills: {
    title: string;
    intro: string;
    groups: { label: string; items: string[] }[];
  };
  experience: { title: string; items: Experience[] };
  projects: { title: string; intro: string; items: Project[] };
  education: {
    title: string;
    degree: string;
    school: string;
    period: string;
    thesisLabel: string;
    thesisTitle: string;
    thesisText: string;
    thesisTags: string[];
    honorsTitle: string;
    honors: { title: string; detail: string }[];
  };
  contact: {
    title: string;
    text: string;
    emailLabel: string;
    phoneLabel: string;
    locationLabel: string;
    location: string;
    elsewhere: string;
  };
  footer: { line: string; source: string };
};

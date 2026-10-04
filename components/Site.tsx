import Image from "next/image";
import type { ReactNode } from "react";
import type { Content } from "@/content/types";
import { site } from "@/content/site";
import Lattice from "./Lattice";
import ThemeToggle from "./ThemeToggle";
import CopyEmail from "./CopyEmail";
import {
  ArrowIcon,
  DownloadIcon,
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  MailIcon,
  PhoneIcon,
  PinIcon,
  TelegramIcon,
  WhatsAppIcon,
} from "./icons";

/** Renders `**bold**` spans inside resume prose. */
function Rich({ text }: { text: string }) {
  const parts = text.split("**");
  return (
    <>
      {parts.map((part, i) => (i % 2 === 1 ? <strong key={i}>{part}</strong> : part))}
    </>
  );
}

function Section({ id, title, intro, children }: { id: string; title: string; intro?: string; children: ReactNode }) {
  return (
    <section id={id} className="section" aria-labelledby={`${id}-title`}>
      <div className="container">
        <header className="section-head">
          <h2 id={`${id}-title`}>{title}</h2>
          {intro && <p>{intro}</p>}
        </header>
        {children}
      </div>
    </section>
  );
}

const socials = [
  { name: "GitHub", href: site.social.github, Icon: GitHubIcon },
  { name: "LinkedIn", href: site.social.linkedin, Icon: LinkedInIcon },
  { name: "Telegram", href: site.social.telegram, Icon: TelegramIcon },
  { name: "WhatsApp", href: site.social.whatsapp, Icon: WhatsAppIcon },
  { name: "Instagram", href: site.social.instagram, Icon: InstagramIcon },
];

export default function Site({ c }: { c: Content }) {
  const isFa = c.locale === "fa";
  const phone = isFa ? site.phone.displayFa : site.phone.display;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: c.hero.name,
    alternateName: [c.hero.nameAlt, "mmdalam"],
    jobTitle: c.hero.role,
    email: `mailto:${site.email}`,
    telephone: site.phone.tel,
    url: isFa ? site.url : `${site.url}/en`,
    image: `${site.url}/images/profile.jpg`,
    address: { "@type": "PostalAddress", addressLocality: "Tehran", addressCountry: "IR" },
    sameAs: [site.social.github, site.social.linkedin],
    knowsAbout: ["Node.js", "TypeScript", "MongoDB", "System Design", "Post-Quantum Cryptography"],
  };

  return (
    <>
      <a className="skip-link" href="#main">
        {c.ui.skip}
      </a>

      <header className="topbar">
        <div className="container topbar-inner">
          <a href="#top" className="brand" aria-label={c.ui.backToTop}>
            <span className="brand-mark" aria-hidden="true">
              <i />
              <i />
              <i />
              <i />
            </span>
            <span className="brand-name">{c.hero.name}</span>
          </a>
          <nav className="nav" aria-label={c.ui.menu}>
            {c.nav.map((item) => (
              <a key={item.id} href={`#${item.id}`}>
                {item.label}
              </a>
            ))}
          </nav>
          <div className="topbar-actions">
            <a
              className="lang-switch"
              href={c.ui.switchLangHref}
              hrefLang={isFa ? "en" : "fa"}
              lang={isFa ? "en" : "fa"}
              aria-label={c.ui.switchLangLabel}
              title={c.ui.switchLangLabel}
            >
              {c.ui.switchLang}
            </a>
            <ThemeToggle label={c.ui.themeToggle} />
          </div>
        </div>
      </header>

      <main id="main">
        <section id="top" className="hero" aria-labelledby="hero-name">
          <Lattice dir={c.dir} />
          <div className="container hero-grid">
            <div className="hero-copy">
              <p className="hero-alt" lang={isFa ? "en" : "fa"} dir={isFa ? "ltr" : "rtl"}>
                {c.hero.nameAlt}
              </p>
              <h1 id="hero-name" className="hero-name">
                {c.hero.name}
              </h1>
              <p className="hero-role">{c.hero.role}</p>
              <p className="hero-focus" dir="ltr">
                {c.hero.focus}
              </p>
              <p className="hero-lede">{c.hero.lede}</p>
              <div className="hero-cta">
                <a className="btn btn-primary" href={site.cvFa} download>
                  <DownloadIcon />
                  {c.ui.downloadCv}
                </a>
                <a className="btn btn-ghost" href="#contact">
                  {c.ui.contactCta}
                </a>
              </div>
            </div>
            <figure className="hero-portrait">
              <Image
                src="/images/profile.jpg"
                alt={c.hero.name}
                width={690}
                height={920}
                priority
                sizes="(max-width: 900px) 60vw, 320px"
              />
              <figcaption className="now">
                <span className="now-label">
                  <span className="now-dot" aria-hidden="true" />
                  {c.ui.now}
                </span>
                {c.hero.nowText}
              </figcaption>
            </figure>
          </div>
          <p className="lattice-caption container" aria-hidden="true">
            {c.ui.latticeCaption}
          </p>
        </section>

        <Section id="about" title={c.about.title}>
          <div className="about-grid">
            <div className="prose">
              {c.about.paragraphs.map((p, i) => (
                <p key={i}>
                  <Rich text={p} />
                </p>
              ))}
            </div>
            <dl className="facts">
              {c.about.facts.map((f) => (
                <div key={f.label}>
                  <dt>{f.label}</dt>
                  <dd dir={f.dir}>{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Section>

        <Section id="skills" title={c.skills.title} intro={c.skills.intro}>
          <div className="skills-grid">
            {c.skills.groups.map((g) => (
              <div key={g.label} className="skill-group">
                <h3>{g.label}</h3>
                <ul className="chips" dir="ltr">
                  {g.items.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        <Section id="experience" title={c.experience.title}>
          <ol className="timeline">
            {c.experience.items.map((job) => (
              <li key={job.role + job.org} className={job.current ? "job is-current" : "job"}>
                <div className="job-when">
                  <span>{job.period}</span>
                </div>
                <div className="job-body">
                  <h3>
                    {job.role}
                    {job.roleAlt && (
                      <span className="job-alt" lang="en" dir="ltr">
                        {job.roleAlt}
                      </span>
                    )}
                  </h3>
                  <p className="job-org">
                    <strong>{job.org}</strong>
                    <span> · {job.meta}</span>
                  </p>
                  <ul className="job-points">
                    {job.points.map((pt) => (
                      <li key={pt}>{pt}</li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </Section>

        <Section id="projects" title={c.projects.title} intro={c.projects.intro}>
          <ul className="projects">
            {c.projects.items.map((p) => (
              <li key={p.title} className="project">
                <div className="project-cover">
                  {p.image ? (
                    <Image
                      src={p.image}
                      alt=""
                      width={960}
                      height={520}
                      sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 380px"
                    />
                  ) : (
                    <div className="project-pattern" aria-hidden="true">
                      <code dir="ltr">{p.cover ?? p.kind}</code>
                    </div>
                  )}
                </div>
                <div className="project-body">
                  <p className="project-meta">
                    <span>{p.kind}</span>
                    {p.year && <span>{p.year}</span>}
                  </p>
                  <h3 dir="auto">{p.title}</h3>
                  <p className="project-desc">{p.description}</p>
                  {p.stack.length > 0 && (
                    <ul className="chips chips-sm" dir="ltr">
                      {p.stack.map((s) => (
                        <li key={s}>{s}</li>
                      ))}
                    </ul>
                  )}
                  {p.links.length > 0 && (
                    <div className="project-links">
                      {p.links.map((l) => (
                        <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer">
                          {l.label}
                          <ArrowIcon width={16} height={16} />
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </Section>

        <Section id="education" title={c.education.title}>
          <div className="edu-grid">
            <article className="degree">
              <p className="degree-period">{c.education.period}</p>
              <h3>{c.education.degree}</h3>
              <p className="degree-school">{c.education.school}</p>
              <div className="thesis">
                <p className="thesis-label">{c.education.thesisLabel}</p>
                <h4>{c.education.thesisTitle}</h4>
                <p>{c.education.thesisText}</p>
                <ul className="chips chips-accent" dir="ltr">
                  {c.education.thesisTags.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>
            </article>
            <div className="honors">
              <h3>{c.education.honorsTitle}</h3>
              <ul>
                {c.education.honors.map((h) => (
                  <li key={h.title}>
                    <span className="honor-title" dir="auto">
                      {h.title}
                    </span>
                    <span className="honor-detail">{h.detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        <Section id="contact" title={c.contact.title} intro={c.contact.text}>
          <div className="contact-grid">
            <div className="contact-main">
              <a className="contact-email" href={`mailto:${site.email}`} dir="ltr">
                {site.email}
              </a>
              <div className="contact-actions">
                <CopyEmail email={site.email} label={c.ui.copyEmail} done={c.ui.copied} />
                <a className="btn btn-ghost btn-sm" href={site.cvFa} download>
                  <DownloadIcon width={16} height={16} />
                  {c.ui.downloadCv}
                </a>
              </div>
            </div>
            <ul className="contact-list">
              <li>
                <MailIcon />
                <span className="contact-k">{c.contact.emailLabel}</span>
                <a href={`mailto:${site.email}`} dir="ltr">
                  {site.email}
                </a>
              </li>
              <li>
                <PhoneIcon />
                <span className="contact-k">{c.contact.phoneLabel}</span>
                <a href={`tel:${site.phone.tel}`} dir="ltr">
                  {phone}
                </a>
              </li>
              <li>
                <PinIcon />
                <span className="contact-k">{c.contact.locationLabel}</span>
                <span>{c.contact.location}</span>
              </li>
            </ul>
            <div className="socials">
              <p className="contact-k">{c.contact.elsewhere}</p>
              <ul>
                {socials.map(({ name, href, Icon }) => (
                  <li key={name}>
                    <a href={href} target="_blank" rel="noopener noreferrer me" aria-label={name} title={name}>
                      <Icon />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <p>
            © {new Date().getFullYear()} · {c.footer.line}
          </p>
          <a href={site.repo} target="_blank" rel="noopener noreferrer">
            {c.footer.source}
          </a>
        </div>
      </footer>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
    </>
  );
}

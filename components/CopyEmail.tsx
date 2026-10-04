"use client";

import { useState } from "react";

export default function CopyEmail({ email, label, done }: { email: string; label: string; done: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <button type="button" className="btn btn-ghost btn-sm" onClick={copy} aria-live="polite">
      {copied ? done : label}
    </button>
  );
}

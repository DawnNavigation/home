"use client";

import { useEffect, useMemo, useState } from "react";

function faviconUrl(url: string) {
  try {
    const target = new URL(url);
    return target.protocol === "http:" || target.protocol === "https:" ? `${target.origin}/favicon.ico` : "";
  } catch {
    return "";
  }
}

function initials(title: string) {
  const normalized = title.trim();
  return normalized ? normalized.slice(0, 2).toUpperCase() : "DN";
}

export function SiteLogo({ logo, url, title, className = "" }: { logo?: string | null; url: string; title: string; className?: string }) {
  const sources = useMemo(() => [...new Set([logo?.trim(), faviconUrl(url)].filter((value): value is string => Boolean(value)))], [logo, url]);
  const [sourceIndex, setSourceIndex] = useState(0);

  useEffect(() => setSourceIndex(0), [logo, url]);

  return (
    <span className={`site-logo ${className}`.trim()}>
      <b aria-hidden="true">{initials(title)}</b>
      {sources[sourceIndex] ? <img key={sources[sourceIndex]} src={sources[sourceIndex]} alt={`${title} logo`} loading="lazy" onError={() => setSourceIndex((current) => current + 1)} /> : null}
    </span>
  );
}

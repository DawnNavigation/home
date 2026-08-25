"use client";

import { useEffect, useState } from "react";
import { LanguageSwitcher, useLanguagePreference } from "@/components/language-switcher";
import { SiteLogo } from "@/components/site-logo";
import { localizeContent } from "@/lib/i18n";
import type { SiteDetailRecord } from "@/lib/webstack";


function hostname(url: string) {
  try { return new URL(url).hostname.replace(/^www\./, ""); } catch { return url; }
}

export function SiteDetailApp({ siteId }: { siteId: string }) {
  const { language, setLanguage, message: m } = useLanguagePreference();
  const [site, setSite] = useState<SiteDetailRecord | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "missing" | "error">("loading");
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`/api/sites/${encodeURIComponent(siteId)}`, { cache: "no-store" })
      .then(async (response) => {
        const body = await response.json();
        if (response.status === 404) { setStatus("missing"); return; }
        if (!response.ok) throw new Error(body.error || m.loadFailed);
        setSite(body);
        setStatus("ready");
      })
      .catch((reason) => {
        setError(reason instanceof Error ? reason.message : m.loadFailed);
        setStatus("error");
      });
  }, [m.loadFailed, siteId]);

  const localized = site ? localizeContent(site, language) : { title: "", description: "" };
  const category = site ? (language === "zh" ? site.category.taxonomy || site.category.taxonomy_en : site.category.taxonomy_en || site.category.taxonomy) : "";

  return (
    <div className="detail-shell">
      <header className="detail-topbar">
        <a className="brand" href="/"><span className="brand-sun" aria-hidden="true"><i /></span><span><b>DawnNav</b><small>黎明导航</small></span></a>
        <LanguageSwitcher language={language} onChange={setLanguage} />
      </header>

      <main className="detail-main">
        <a className="detail-back" href="/">← {m.backToDirectory}</a>
        {status === "loading" ? <div className="state-panel"><span className="loader" /><h3>{m.loadingSite}</h3></div> : null}
        {status === "missing" ? <div className="state-panel"><b>404</b><h3>{m.siteNotFound}</h3><p>{m.siteNotFoundHelp}</p></div> : null}
        {status === "error" ? <div className="state-panel error"><b>!</b><h3>{m.unavailable}</h3><p>{error}</p></div> : null}

        {status === "ready" && site ? <article className="detail-card">
          <div className="detail-visual">
            <span className="detail-kicker">{m.siteDetail} · {category}</span>
            <SiteLogo logo={site.logo} url={site.url} title={localized.title} className="detail-logo" />
            <div className="detail-orbit" aria-hidden="true"><i /><i /><i /></div>
          </div>
          <div className="detail-content">
            <p className="eyebrow">{m.detailIntro}</p>
            <h1>{localized.title}</h1>
            {localized.description ? <p className="detail-description">{localized.description}</p> : null}
            <dl className="detail-facts">
              <div><dt>{m.domain}</dt><dd>{hostname(site.url)}</dd></div>
              <div><dt>{m.targetUrl}</dt><dd><span>{site.url}</span></dd></div>
            </dl>
            <a className="visit-button" href={site.url} target="_blank" rel="noopener noreferrer">{m.visitWebsite}</a>
          </div>
        </article> : null}
      </main>
    </div>
  );
}

"use client";

import { useEffect, useMemo, useState } from "react";
import { LanguageSwitcher, useLanguagePreference } from "@/components/language-switcher";
import { formatMessage, languageOptions, localizeContent, type Language, type TranslationEntry, type UiMessages } from "@/lib/i18n";
import type { CategoryMode, LinkItem, LinkSection, WebstackCategory } from "@/lib/webstack";

function modeOf(category: WebstackCategory): CategoryMode {
  if (Array.isArray(category.list)) return "list";
  if (Array.isArray(category.friend)) return "friend";
  return "links";
  
}

function categoryCount(category: WebstackCategory) {
  return (category.links?.length ?? category.friend?.length ?? 0) + (category.list?.reduce((sum, section) => sum + section.links.length, 0) ?? 0);
}

function emptyLink(): LinkItem {
  return {
    title: "新站点",
    title_en: "New website",
    url: "https://",
    description: "",
    description_en: "",
    translations: { zh: { title: "新站点", description: "" }, en: { title: "New website", description: "" } }
  };
}

function LinkEditor({ link, index, uiLanguage, m, onChange, onRemove }: {
  link: LinkItem;
  index: number;
  uiLanguage: Language;
  m: UiMessages;
  onChange: (next: LinkItem) => void;
  onRemove: () => void;
}) {
  const [activeLanguage, setActiveLanguage] = useState("zh");
  const [newLanguage, setNewLanguage] = useState("");
  const [languageError, setLanguageError] = useState("");
  const translationCodes = [...new Set([...languageOptions.map((option) => option.code), ...Object.keys(link.translations ?? {})])];
  const localized = localizeContent(link, uiLanguage);
  const translation = link.translations?.[activeLanguage] ?? {};

  const setField = (field: keyof LinkItem, value: string) => onChange({ ...link, [field]: value });
  const setTranslation = (field: keyof TranslationEntry, value: string) => {
    const translations = { ...(link.translations ?? {}), [activeLanguage]: { ...translation, [field]: value } };
    const next: LinkItem = { ...link, translations };
    if (activeLanguage === "zh") {
      if (field === "title") next.title = value;
      if (field === "description") next.description = value;
    }
    if (activeLanguage === "en") {
      if (field === "title") next.title_en = value;
      if (field === "description") next.description_en = value;
    }
    onChange(next);
  };

  const addLanguage = () => {
    const code = newLanguage.trim();
    if (!/^[a-z]{2,3}(?:-[A-Za-z0-9]{2,8})*$/.test(code)) {
      setLanguageError(m.invalidLanguage);
      return;
    }
    onChange({ ...link, translations: { ...(link.translations ?? {}), [code]: link.translations?.[code] ?? {} } });
    setActiveLanguage(code);
    setNewLanguage("");
    setLanguageError("");
  };

  return (
    <details className="link-editor" open={index === 0}>
      <summary><span className="link-order">{String(index + 1).padStart(2, "0")}</span><strong>{localized.title || m.unnamedSite}</strong><small>{link.url}</small><span className="details-hint">{m.edit}</span></summary>
      <div className="link-fields asset-fields">
        <label className="wide"><span>{m.url}</span><input type="url" value={link.url} onChange={(event) => setField("url", event.target.value)} /></label>
        <label><span>{m.logoPath}</span><input value={link.logo ?? ""} onChange={(event) => setField("logo", event.target.value)} placeholder="/images/logos/example.png" /></label>
        <label><span>{m.qrPath}</span><input value={link.qrcode ?? ""} onChange={(event) => setField("qrcode", event.target.value)} /></label>
      </div>
      <div className="translation-editor">
        <div className="translation-heading"><div><h4>{m.translations}</h4><p>{m.translationsHelp}</p></div></div>
        <div className="translation-tabs" role="tablist" aria-label={m.translations}>
          {translationCodes.map((code) => <button className={activeLanguage === code ? "active" : ""} type="button" role="tab" aria-selected={activeLanguage === code} key={code} onClick={() => setActiveLanguage(code)}>{code.toUpperCase()}</button>)}
        </div>
        <div className="translation-fields">
          <label><span>{m.translatedTitle}</span><input value={translation.title ?? ""} onChange={(event) => setTranslation("title", event.target.value)} /></label>
          <label><span>{m.translatedDescription}</span><textarea rows={4} value={translation.description ?? ""} onChange={(event) => setTranslation("description", event.target.value)} /></label>
        </div>
        <div className="add-language-row">
          <label><span>{m.languageCode}</span><input value={newLanguage} onChange={(event) => setNewLanguage(event.target.value)} placeholder="de / pt-BR" /></label>
          <button type="button" onClick={addLanguage}>{m.addLanguage}</button>
        </div>
        {languageError ? <p className="field-error">{languageError}</p> : null}
      </div>
      <button className="danger-link" type="button" onClick={onRemove}>{m.deleteSite}</button>
    </details>
  );
}

export function AdminApp() {
  const { language, setLanguage, message: m } = useLanguagePreference();
  const [data, setData] = useState<WebstackCategory[]>([]);
  const [selected, setSelected] = useState(0);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState("");
  const [token, setToken] = useState("");
  const category = data[selected];
  const total = useMemo(() => data.reduce((sum, item) => sum + categoryCount(item), 0), [data]);

  const loadData = async () => {
    const response = await fetch("/api/data", { cache: "no-store" });
    const body = await response.json();
    if (!response.ok) throw new Error(body.error || m.loadFailed);
    setData(body);
  };

  useEffect(() => {
    loadData().catch((error) => setNotice(error instanceof Error ? error.message : m.loadFailed)).finally(() => setLoading(false));
    // The initial database load should not repeat when the UI language changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateCategory = (next: WebstackCategory) => setData((current) => current.map((item, index) => index === selected ? next : item));
  const patchCategory = (field: keyof WebstackCategory, value: unknown) => category && updateCategory({ ...category, [field]: value });

  const changeMode = (mode: CategoryMode) => {
    if (!category || modeOf(category) === mode) return;
    const next: WebstackCategory = { taxonomy: category.taxonomy, taxonomy_en: category.taxonomy_en, icon: category.icon };
    if (mode === "list") next.list = [{ term: "新分组", term_en: "New group", links: [] }];
    else if (mode === "friend") next.friend = [];
    else next.links = [];
    updateCategory(next);
  };

  const addCategory = () => {
    setData((current) => [...current, { taxonomy: "新分类", taxonomy_en: "New collection", icon: "fa-star", links: [] }]);
    setSelected(data.length);
  };

  const removeCategory = () => {
    setData((current) => current.filter((_, index) => index !== selected));
    setSelected((current) => Math.max(0, current - 1));
  };

  const updateDirectLinks = (links: LinkItem[]) => {
    if (!category) return;
    if (modeOf(category) === "friend") updateCategory({ ...category, friend: links });
    else updateCategory({ ...category, links });
  };

  const updateSections = (sections: LinkSection[]) => category && updateCategory({ ...category, list: sections });

  const save = async () => {
    setSaving(true);
    setNotice("");
    try {
      const response = await fetch("/api/save", {
        method: "POST",
        headers: { "Content-Type": "application/json", ...(token ? { "x-admin-token": token } : {}) },
        body: JSON.stringify({ data })
      });
      const body = await response.json();
      if (!response.ok) throw new Error(body.error || m.saveFailed);
      await loadData();
      setNotice(formatMessage(m.writeResult, { categories: body.categories, links: body.links }));
    } catch (error) {
      setNotice(error instanceof Error ? error.message : m.saveFailed);
    } finally {
      setSaving(false);
    }
  };

  const categoryLabel = (item: WebstackCategory) => language === "zh" ? item.taxonomy || item.taxonomy_en || "" : item.taxonomy_en || item.taxonomy || "";

  return (
    <div className="admin-shell">
      <header className="admin-topbar">
        <a className="brand" href="/"><span className="brand-sun" aria-hidden="true"><i /></span><span><b>DawnNav</b><small>{m.contentWorkbench}</small></span></a>
        <div className="admin-actions"><a href="/">{m.previewSite}</a><LanguageSwitcher language={language} onChange={setLanguage} compact /><button className="primary-button" type="button" onClick={save} disabled={loading || saving}>{saving ? m.saving : m.saveSql}</button></div>
      </header>

      <main className="admin-main">
        <aside className="admin-sidebar">
          <div className="admin-summary"><p>{m.databaseOverview}</p><strong>{data.length}</strong><span>{m.collections} · {total} {m.sites}</span></div>
          <div className="admin-list-heading"><span>{m.contentCategories}</span><button type="button" onClick={addCategory}>{m.newCategory}</button></div>
          <div className="admin-category-list">
            {data.map((item, index) => <button className={index === selected ? "active" : ""} key={`${item.taxonomy}-${index}`} type="button" onClick={() => setSelected(index)}><span><i>{String(index + 1).padStart(2, "0")}</i>{categoryLabel(item)}</span><b>{categoryCount(item)}</b></button>)}
          </div>
          <label className="token-field"><span>{m.adminToken}</span><input type="password" value={token} onChange={(event) => setToken(event.target.value)} autoComplete="current-password" /></label>
        </aside>

        <section className="admin-content">
          {notice ? <div className="admin-message" role="status">{notice}<button type="button" onClick={() => setNotice("")}>×</button></div> : null}
          {loading ? <div className="state-panel"><span className="loader" /><h3>{m.readingDatabase}</h3></div> : null}
          {!loading && category ? <>
            <div className="editor-heading"><div><p>{m.category} {String(selected + 1).padStart(2, "0")}</p><h1>{categoryLabel(category)}</h1><span>{m.unsavedHint}</span></div><button className="danger-button" type="button" onClick={removeCategory}>{m.deleteCategory}</button></div>
            <section className="settings-panel">
              <div className="panel-title"><span>01</span><div><h2>{m.categorySettings}</h2><p>{m.categorySettingsHelp}</p></div></div>
              <div className="settings-grid">
                <label><span>{m.chineseCategoryName}</span><input value={category.taxonomy} onChange={(event) => patchCategory("taxonomy", event.target.value)} /></label>
                <label><span>{m.englishCategoryName}</span><input value={category.taxonomy_en ?? ""} onChange={(event) => patchCategory("taxonomy_en", event.target.value)} /></label>
                <label><span>{m.iconIdentifier}</span><input value={category.icon ?? ""} onChange={(event) => patchCategory("icon", event.target.value)} /></label>
                <label><span>{m.contentStructure}</span><select value={modeOf(category)} onChange={(event) => changeMode(event.target.value as CategoryMode)}><option value="links">{m.normalLinks}</option><option value="list">{m.groupedLinks}</option><option value="friend">{m.friendLinks}</option></select></label>
              </div>
            </section>

            <section className="settings-panel">
              <div className="panel-title"><span>02</span><div><h2>{m.siteContent}</h2><p>{m.siteContentHelp} · {categoryCount(category)} {m.sites}</p></div></div>
              {category.list ? <div className="section-editors">
                {category.list.map((section, sectionIndex) => <div className="section-editor" key={`${section.term}-${sectionIndex}`}>
                  <div className="section-editor-heading"><div><label><span>{m.groupChineseName}</span><input value={section.term} onChange={(event) => updateSections(category.list!.map((item, index) => index === sectionIndex ? { ...item, term: event.target.value } : item))} /></label><label><span>{m.groupEnglishName}</span><input value={section.term_en ?? ""} onChange={(event) => updateSections(category.list!.map((item, index) => index === sectionIndex ? { ...item, term_en: event.target.value } : item))} /></label></div><button type="button" onClick={() => updateSections(category.list!.filter((_, index) => index !== sectionIndex))}>{m.deleteGroup}</button></div>
                  <div className="link-editor-list">{section.links.map((link, linkIndex) => <LinkEditor key={`${link.id ?? link.url}-${linkIndex}`} link={link} index={linkIndex} uiLanguage={language} m={m} onChange={(next) => updateSections(category.list!.map((item, index) => index === sectionIndex ? { ...item, links: item.links.map((current, currentIndex) => currentIndex === linkIndex ? next : current) } : item))} onRemove={() => updateSections(category.list!.map((item, index) => index === sectionIndex ? { ...item, links: item.links.filter((_, currentIndex) => currentIndex !== linkIndex) } : item))} />)}</div>
                  <button className="add-row-button" type="button" onClick={() => updateSections(category.list!.map((item, index) => index === sectionIndex ? { ...item, links: [...item.links, emptyLink()] } : item))}>{m.addSiteToGroup}</button>
                </div>)}
                <button className="add-section-button" type="button" onClick={() => updateSections([...category.list!, { term: "新分组", term_en: "New group", links: [] }])}>{m.newGroup}</button>
              </div> : <>
                <div className="link-editor-list">{(category.friend ?? category.links ?? []).map((link, index, links) => <LinkEditor key={`${link.id ?? link.url}-${index}`} link={link} index={index} uiLanguage={language} m={m} onChange={(next) => updateDirectLinks(links.map((item, itemIndex) => itemIndex === index ? next : item))} onRemove={() => updateDirectLinks(links.filter((_, itemIndex) => itemIndex !== index))} />)}</div>
                <button className="add-row-button" type="button" onClick={() => updateDirectLinks([...(category.friend ?? category.links ?? []), emptyLink()])}>{m.addSite}</button>
              </>}
            </section>
          </> : null}
        </section>
      </main>
    </div>
  );
}

export const languageOptions = [
  { code: "zh", label: "中文", htmlLang: "zh-CN" },
  { code: "en", label: "English", htmlLang: "en" },
  { code: "ja", label: "日本語", htmlLang: "ja" },
  { code: "es", label: "Español", htmlLang: "es" },
  { code: "fr", label: "Français", htmlLang: "fr" }
] as const;

export type Language = (typeof languageOptions)[number]["code"];
export type TranslationEntry = { title?: string | null; description?: string | null };
export type TranslationMap = Record<string, TranslationEntry>;


const en = {
  language: "Language",
  explore: "Explore",
  manage: "Manage",
  liveEyebrow: "Built by a group of idealistic people",
  heroLead: "The revolution is dead!",
  heroEmphasis: "Long live the revolution!",
  heroDescription: "A rich, multilingual and searchable left-wing knowledge base for all comrades to browse and study.",
  collections: "Collections",
  curatedLinks: "Curated links",
  interfaceLanguages: "Languages",
  searchLabel: "Search all sites",
  searchPlaceholder: "Search titles, notes or domains…",
  clearSearch: "Clear search",
  index: "Index",
  allEntries: "All entries",
  liveDirectory: "Live directory",
  resultsFor: "Results for “{query}”",
  items: "items",
  connecting: "Connecting to the database",
  unavailable: "The directory is unavailable",
  reload: "Reload",
  noMatches: "No matching entries",
  noMatchesHelp: "Try a shorter query or switch to all collections.",
  sites: "sites",
  viewAll: "View all",
  footerTagline: "Find, collect, return.",
  footerQuote: "You young people, full of vigor and vitality, are in the bloom of life, like the sun at eight or nine in the morning. Our hope is placed on you.",
  manageDatabase: "Manage database →",
  backToDirectory: "Back to directory",
  siteDetail: "Website profile",
  detailIntro: "Review the destination before leaving DawnNav.",
  domain: "Domain",
  targetUrl: "Target URL",
  visitWebsite: "Go to website ↗",
  loadingSite: "Loading website profile",
  siteNotFound: "This website could not be found",
  siteNotFoundHelp: "It may have been removed or its address has changed.",
  contentWorkbench: "Content workbench",
  previewSite: "Preview site ↗",
  saveSql: "Save to SQL",
  saving: "Saving…",
  databaseOverview: "Database overview",
  contentCategories: "Content categories",
  newCategory: "+ New",
  adminToken: "Admin token (if configured)",
  readingDatabase: "Reading SQL database",
  category: "Category",
  unsavedHint: "Changes remain in this page until you save them to the database.",
  deleteCategory: "Delete category",
  categorySettings: "Category settings",
  categorySettingsHelp: "Define the legacy Chinese and English category labels and its content structure.",
  chineseCategoryName: "Chinese category name *",
  englishCategoryName: "English category name",
  iconIdentifier: "Icon identifier",
  contentStructure: "Content structure",
  normalLinks: "Standard links",
  groupedLinks: "Grouped links",
  friendLinks: "Friend links",
  siteContent: "Website content",
  siteContentHelp: "Expand a card to edit its URL, assets and multilingual content.",
  groupChineseName: "Chinese group name",
  groupEnglishName: "English group name",
  deleteGroup: "Delete group",
  addSiteToGroup: "+ Add a website to this group",
  newGroup: "+ New group",
  addSite: "+ Add a website",
  edit: "Edit",
  unnamedSite: "Untitled website",
  url: "URL *",
  logoPath: "Logo URL or path",
  qrPath: "QR code path",
  deleteSite: "Delete this website",
  translations: "Translations",
  translationsHelp: "Store titles and descriptions by language code. English and Chinese remain compatible with legacy data.",
  addLanguage: "Add language",
  languageCode: "Language code",
  translatedTitle: "Title *",
  translatedDescription: "Description",
  invalidLanguage: "Use a language code such as de or pt-BR.",
  newSite: "New website",
  newCollection: "New collection",
  newSection: "New group",
  writeResult: "Saved {categories} categories and {links} websites.",
  loadFailed: "Unable to load data",
  saveFailed: "Unable to save data"
};

export type UiMessages = typeof en;

const zh: UiMessages = {
  language: "语言", explore: "探索", manage: "内容管理", liveEyebrow: "由一群满怀理想的人建立",
  heroLead: "革命死了！", heroEmphasis: "革命万岁！", heroDescription: "一个资源丰富、支持多语言和搜索的左翼资料库，供各位同志阅览和学习。",
  collections: "主题分类", curatedLinks: "精选入口", interfaceLanguages: "界面语言", searchLabel: "搜索全部站点", searchPlaceholder: "搜索标题、简介或域名…", clearSearch: "清空搜索",
  index: "索引", allEntries: "全部收录", liveDirectory: "动态目录", resultsFor: "“{query}”的搜索结果", items: "项", connecting: "正在连接数据库", unavailable: "暂时无法载入目录", reload: "重新加载",
  noMatches: "没有找到匹配内容", noMatchesHelp: "试试更短的关键词，或切换到全部分类。", sites: "个站点", viewAll: "查看全部", footerTagline: "寻找、整理、再次抵达。",
  footerQuote: "你们青年人朝气蓬勃，正在兴旺时期，好像早晨八、九点钟的太阳。希望寄托在你们身上。", manageDatabase: "管理数据库 →",
  backToDirectory: "返回目录", siteDetail: "网站详情", detailIntro: "离开 DawnNav 前，先确认即将访问的目标。", domain: "域名", targetUrl: "目标 URL", visitWebsite: "前往网站 ↗", loadingSite: "正在读取网站详情", siteNotFound: "没有找到这个网站", siteNotFoundHelp: "它可能已被删除，或站内地址已经变化。",
  contentWorkbench: "内容工作台", previewSite: "预览网站 ↗", saveSql: "保存到 SQL", saving: "正在写入…", databaseOverview: "数据库概览", contentCategories: "内容分类", newCategory: "＋ 新建", adminToken: "管理令牌（如已设置）", readingDatabase: "正在读取 SQL 数据库",
  category: "分类", unsavedHint: "修改会先保存在当前页面，点击保存后才写入数据库。", deleteCategory: "删除分类", categorySettings: "分类设置", categorySettingsHelp: "定义兼容旧数据的中英文分类名称和内容结构。", chineseCategoryName: "中文分类名 *", englishCategoryName: "英文分类名", iconIdentifier: "图标标识", contentStructure: "内容结构", normalLinks: "普通链接", groupedLinks: "多级分组", friendLinks: "友情链接",
  siteContent: "站点内容", siteContentHelp: "展开卡片即可编辑网址、资源和多语言内容。", groupChineseName: "分组中文名", groupEnglishName: "分组英文名", deleteGroup: "删除分组", addSiteToGroup: "＋ 添加站点到此分组", newGroup: "＋ 新建分组", addSite: "＋ 添加一个站点", edit: "编辑", unnamedSite: "未命名站点", url: "网址 *", logoPath: "Logo 地址或路径", qrPath: "二维码路径", deleteSite: "删除这个站点",
  translations: "多语言内容", translationsHelp: "按语言代码保存标题和简介；中文、英文继续兼容旧数据。", addLanguage: "添加语言", languageCode: "语言代码", translatedTitle: "标题 *", translatedDescription: "简介", invalidLanguage: "请输入 de、pt-BR 等有效语言代码。", newSite: "新站点", newCollection: "新分类", newSection: "新分组", writeResult: "已写入 {categories} 个分类和 {links} 个站点。", loadFailed: "读取数据失败", saveFailed: "保存失败"
};

const ja: UiMessages = {
  ...en,
  language: "言語", explore: "探索", manage: "コンテンツ管理", liveEyebrow: "理想を抱く人々によって構築", heroLead: "革命は死んだ！", heroEmphasis: "革命万歳！", heroDescription: "同志の閲覧と学習のための、豊富で多言語・検索対応の左翼資料集です。",
  collections: "カテゴリー", curatedLinks: "厳選リンク", interfaceLanguages: "表示言語", searchLabel: "すべてのサイトを検索", searchPlaceholder: "タイトル、説明、ドメインを検索…", clearSearch: "検索をクリア", index: "索引", allEntries: "すべて", liveDirectory: "ライブディレクトリ", resultsFor: "「{query}」の検索結果", items: "件", connecting: "データベースに接続中", unavailable: "ディレクトリを読み込めません", reload: "再読み込み", noMatches: "一致する項目がありません", noMatchesHelp: "短いキーワードを試すか、すべてのカテゴリーに切り替えてください。", sites: "サイト", viewAll: "すべて見る", footerTagline: "見つけ、集め、また辿り着く。", manageDatabase: "データベース管理 →",
  backToDirectory: "一覧へ戻る", siteDetail: "サイト詳細", detailIntro: "DawnNav を離れる前に、アクセス先を確認してください。", domain: "ドメイン", targetUrl: "リンク先 URL", visitWebsite: "サイトへ移動 ↗", loadingSite: "サイト情報を読み込み中", siteNotFound: "サイトが見つかりません", siteNotFoundHelp: "削除されたか、サイト内のアドレスが変更された可能性があります。",
  contentWorkbench: "コンテンツ管理", previewSite: "サイトを表示 ↗", saveSql: "SQL に保存", saving: "保存中…", databaseOverview: "データベース概要", contentCategories: "カテゴリー", newCategory: "＋ 新規", adminToken: "管理トークン（設定済みの場合）", readingDatabase: "SQL データベースを読み込み中", category: "カテゴリー", unsavedHint: "変更は保存ボタンを押すまでデータベースに反映されません。", deleteCategory: "カテゴリーを削除", categorySettings: "カテゴリー設定", siteContent: "サイト内容", edit: "編集", url: "URL *", deleteSite: "このサイトを削除", translations: "翻訳", translationsHelp: "言語コードごとにタイトルと説明を保存します。", addLanguage: "言語を追加", languageCode: "言語コード", translatedTitle: "タイトル *", translatedDescription: "説明", loadFailed: "読み込みに失敗しました", saveFailed: "保存に失敗しました"
};

const es: UiMessages = {
  ...en,
  language: "Idioma", explore: "Explorar", manage: "Administrar", liveEyebrow: "Creado por personas llenas de ideales", heroLead: "¡La revolución ha muerto!", heroEmphasis: "¡Viva la revolución!", heroDescription: "Una biblioteca de izquierda rica, multilingüe y con búsqueda para que todos los camaradas consulten y estudien.",
  collections: "Categorías", curatedLinks: "Enlaces seleccionados", interfaceLanguages: "Idiomas", searchLabel: "Buscar en todos los sitios", searchPlaceholder: "Buscar títulos, descripciones o dominios…", clearSearch: "Limpiar búsqueda", index: "Índice", allEntries: "Todos", liveDirectory: "Directorio dinámico", resultsFor: "Resultados para «{query}»", items: "elementos", connecting: "Conectando con la base de datos", unavailable: "El directorio no está disponible", reload: "Recargar", noMatches: "No hay resultados", noMatchesHelp: "Prueba una búsqueda más corta o muestra todas las categorías.", sites: "sitios", viewAll: "Ver todos", footerTagline: "Encontrar, reunir, volver.", manageDatabase: "Administrar base de datos →",
  backToDirectory: "Volver al directorio", siteDetail: "Detalles del sitio", detailIntro: "Comprueba el destino antes de salir de DawnNav.", domain: "Dominio", targetUrl: "URL de destino", visitWebsite: "Ir al sitio ↗", loadingSite: "Cargando detalles", siteNotFound: "No se encontró este sitio", siteNotFoundHelp: "Puede haber sido eliminado o cambiado de dirección.",
  contentWorkbench: "Panel de contenidos", previewSite: "Vista previa ↗", saveSql: "Guardar en SQL", saving: "Guardando…", databaseOverview: "Resumen de la base", contentCategories: "Categorías", newCategory: "+ Nueva", adminToken: "Token de administrador (si existe)", readingDatabase: "Leyendo la base SQL", category: "Categoría", unsavedHint: "Los cambios no se escriben hasta que pulses Guardar.", deleteCategory: "Eliminar categoría", categorySettings: "Configuración de categoría", siteContent: "Contenido de sitios", edit: "Editar", url: "URL *", deleteSite: "Eliminar este sitio", translations: "Traducciones", translationsHelp: "Guarda título y descripción mediante códigos de idioma.", addLanguage: "Añadir idioma", languageCode: "Código de idioma", translatedTitle: "Título *", translatedDescription: "Descripción", loadFailed: "No se pudieron cargar los datos", saveFailed: "No se pudieron guardar los datos"
};

const fr: UiMessages = {
  ...en,
  language: "Langue", explore: "Explorer", manage: "Gérer", liveEyebrow: "Créé par des personnes pleines d'idéaux", heroLead: "La révolution est morte !", heroEmphasis: "Vive la révolution !", heroDescription: "Une bibliothèque de gauche riche, multilingue et consultable, destinée à la lecture et à l'étude de tous les camarades.",
  collections: "Catégories", curatedLinks: "Liens sélectionnés", interfaceLanguages: "Langues", searchLabel: "Rechercher tous les sites", searchPlaceholder: "Rechercher titres, descriptions ou domaines…", clearSearch: "Effacer la recherche", index: "Index", allEntries: "Tout afficher", liveDirectory: "Répertoire dynamique", resultsFor: "Résultats pour « {query} »", items: "éléments", connecting: "Connexion à la base de données", unavailable: "Le répertoire est indisponible", reload: "Recharger", noMatches: "Aucun résultat", noMatchesHelp: "Essayez une requête plus courte ou affichez toutes les catégories.", sites: "sites", viewAll: "Tout voir", footerTagline: "Trouver, rassembler, revenir.", manageDatabase: "Gérer la base →",
  backToDirectory: "Retour au répertoire", siteDetail: "Fiche du site", detailIntro: "Vérifiez la destination avant de quitter DawnNav.", domain: "Domaine", targetUrl: "URL cible", visitWebsite: "Accéder au site ↗", loadingSite: "Chargement de la fiche", siteNotFound: "Site introuvable", siteNotFoundHelp: "Il a peut-être été supprimé ou son adresse interne a changé.",
  contentWorkbench: "Atelier de contenu", previewSite: "Aperçu du site ↗", saveSql: "Enregistrer dans SQL", saving: "Enregistrement…", databaseOverview: "Aperçu de la base", contentCategories: "Catégories", newCategory: "+ Nouvelle", adminToken: "Jeton administrateur (si configuré)", readingDatabase: "Lecture de la base SQL", category: "Catégorie", unsavedHint: "Les modifications ne sont écrites qu'après avoir cliqué sur Enregistrer.", deleteCategory: "Supprimer la catégorie", categorySettings: "Réglages de catégorie", siteContent: "Contenu des sites", edit: "Modifier", url: "URL *", deleteSite: "Supprimer ce site", translations: "Traductions", translationsHelp: "Enregistrez le titre et la description par code de langue.", addLanguage: "Ajouter une langue", languageCode: "Code de langue", translatedTitle: "Titre *", translatedDescription: "Description", loadFailed: "Impossible de charger les données", saveFailed: "Impossible d'enregistrer les données"
};

export const messages: Record<Language, UiMessages> = { zh, en, ja, es, fr };

export function isLanguage(value: string | null | undefined): value is Language {
  return languageOptions.some((option) => option.code === value);
}

export function htmlLanguage(language: Language): string {
  return languageOptions.find((option) => option.code === language)?.htmlLang ?? language;
}

export function formatMessage(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => String(values[key] ?? ""));
}

export function mergeLegacyTranslations(source: {
  translations?: TranslationMap | null;
  title?: string | null;
  title_en?: string | null;
  description?: string | null;
  description_en?: string | null;
}): TranslationMap {
  const result: TranslationMap = { ...(source.translations ?? {}) };
  if (source.title || source.description) {
    result.zh = { title: result.zh?.title || source.title || null, description: result.zh?.description || source.description || null };
  }
  if (source.title_en || source.description_en) {
    result.en = { title: result.en?.title || source.title_en || null, description: result.en?.description || source.description_en || null };
  }
  return result;
}

export function localizeContent(source: {
  translations?: TranslationMap | null;
  title?: string | null;
  description?: string | null;
}, language: string): { title: string; description: string } {
  const order = [...new Set([language, "en", "zh"])];
  const translations = source.translations ?? {};
  const translated = (field: keyof TranslationEntry) => {
    for (const code of order) {
      const value = translations[code]?.[field];
      if (typeof value === "string" && value.trim()) return value;
    }
    const raw = source[field];
    return typeof raw === "string" ? raw : "";
  };
  return { title: translated("title"), description: translated("description") };
}

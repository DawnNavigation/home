import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { DatabaseSync } from "node:sqlite";

const root = path.resolve(import.meta.dirname, "..");


test("translations migration preserves legacy link data", () => {
  const db = new DatabaseSync(":memory:");
  try {
    const initial = fs.readFileSync(path.join(root, "drizzle", "0000_webstack.sql"), "utf8");
    initial.split("--> statement-breakpoint").forEach((statement) => db.exec(statement));
    db.exec("INSERT INTO categories (id, name, mode, sort_order) VALUES (1, 'Legacy', 'links', 0)");
    db.exec("INSERT INTO links (id, category_id, kind, title, title_en, url, sort_order) VALUES (1, 1, 'link', '旧标题', 'Legacy title', 'https://example.com', 0)");

    db.exec(fs.readFileSync(path.join(root, "drizzle", "0001_link_translations.sql"), "utf8"));

    const columns = db.prepare("PRAGMA table_info(links)").all().map((row) => row.name);
    const row = db.prepare("SELECT title, title_en, url, translations FROM links WHERE id = 1").get();
    assert.ok(columns.includes("translations"));
    assert.equal(row.title, "旧标题");
    assert.equal(row.title_en, "Legacy title");
    assert.equal(row.url, "https://example.com");
    assert.equal(row.translations, null);
  } finally {
    db.close();
  }
});

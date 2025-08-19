import Database from "better-sqlite3";
import path from "path";

const DB_FILE = path.join(process.cwd(), "data", "waterbot.db");
const db = new Database(DB_FILE);

export function initDB() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      jid TEXT PRIMARY KEY,
      nama TEXT,
      umur INTEGER,
      tinggi_cm INTEGER,
      berat_kg INTEGER,
      target_ml INTEGER,
      schedule_json TEXT,
      reminders_active INTEGER DEFAULT 1,
      tz TEXT DEFAULT 'Asia/Jakarta'
    );

    CREATE TABLE IF NOT EXISTS water_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      jid TEXT,
      ts TEXT,
      volume_ml INTEGER,
      source TEXT,
      note TEXT
    );

    CREATE TABLE IF NOT EXISTS sweet_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      jid TEXT,
      ts TEXT,
      nama TEXT,
      volume_ml INTEGER
    );
  `);
}

export function getUser(jid) {
  return db.prepare("SELECT * FROM users WHERE jid=?").get(jid);
}

export function saveUser(user) {
  db.prepare(`INSERT OR REPLACE INTO users (jid, nama, umur, tinggi_cm, berat_kg, target_ml, schedule_json, reminders_active, tz)
              VALUES (@jid,@nama,@umur,@tinggi_cm,@berat_kg,@target_ml,@schedule_json,@reminders_active,@tz)`)
    .run(user);
}

export function addWater(jid, volume, source, note="") {
  db.prepare("INSERT INTO water_logs (jid, ts, volume_ml, source, note) VALUES (?,?,?,?,?)")
    .run(jid, new Date().toISOString(), volume, source, note);
}

export function addSweet(jid, nama, volume) {
  db.prepare("INSERT INTO sweet_logs (jid, ts, nama, volume_ml) VALUES (?,?,?,?)")
    .run(jid, new Date().toISOString(), nama, volume);
}
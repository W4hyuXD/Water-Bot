import sqlite3 from "sqlite3";
import { open } from "sqlite";

export const db = await open({
  filename: "./data/waterbot.db",
  driver: sqlite3.Database,
});

export async function initDB() {
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT,
      age INTEGER,
      height INTEGER,
      weight INTEGER,
      target INTEGER DEFAULT 2000
    )
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS water_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id TEXT,
      amount INTEGER,
      time TEXT
    )
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS sweet_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id TEXT,
      drink TEXT,
      time TEXT
    )
  `);
}

export async function getUser(id) {
  return db.get("SELECT * FROM users WHERE id = ?", [id]);
}

export async function saveUser(id, name, age, height, weight, target = 2000) {
  await db.run(
    `INSERT OR REPLACE INTO users (id, name, age, height, weight, target)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [id, name, age, height, weight, target]
  );
}

export async function logWater(userId, amount) {
  await db.run(
    `INSERT INTO water_logs (user_id, amount, time)
     VALUES (?, ?, datetime('now', 'localtime'))`,
    [userId, amount]
  );
}

export async function getDailyWater(userId) {
  return db.all(
    `SELECT * FROM water_logs 
     WHERE user_id = ? 
     AND date(time) = date('now', 'localtime')`,
    [userId]
  );
}

export async function logSweet(userId, drink) {
  await db.run(
    `INSERT INTO sweet_logs (user_id, drink, time)
     VALUES (?, ?, datetime('now', 'localtime'))`,
    [userId, drink]
  );
}

export async function getMonthlySweet(userId) {
  return db.all(
    `SELECT * FROM sweet_logs 
     WHERE user_id = ? 
     AND strftime('%Y-%m', time) = strftime('%Y-%m', 'now', 'localtime')`,
    [userId]
  );
}     WHERE user_id = ? 
     AND date(time) = date('now', 'localtime')`,
    [userId]
  );
}

export async function logSweet(userId, drink) {
  await db.run(
    `INSERT INTO sweet_logs (user_id, drink, time)
     VALUES (?, ?, datetime('now', 'localtime'))`,
    [userId, drink]
  );
}

export async function getMonthlySweet(userId) {
  return db.all(
    `SELECT * FROM sweet_logs 
     WHERE user_id = ? 
     AND strftime('%Y-%m', time) = strftime('%Y-%m', 'now', 'localtime')`,
    [userId]
  );
}

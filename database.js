import sqlite3 from "sqlite3";
import { open } from "sqlite";

let db;

export async function initDB() {
  db = await open({
    filename: "./waterbot.db",
    driver: sqlite3.Database
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      user_id TEXT PRIMARY KEY,
      name TEXT,
      onboarding_done INTEGER DEFAULT 0
    )
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS water_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id TEXT,
      amount INTEGER,
      source TEXT,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
}

export async function addUser(user_id, name) {
  await db.run(
    `INSERT OR IGNORE INTO users (user_id, name) VALUES (?, ?)`,
    [user_id, name]
  );
}

export async function getUser(user_id) {
  return db.get(`SELECT * FROM users WHERE user_id = ?`, [user_id]);
}

export async function getAllUsers() {
  return db.all(`SELECT * FROM users WHERE onboarding_done = 1`);
}

export async function completeOnboarding(user_id) {
  await db.run(
    `UPDATE users SET onboarding_done = 1 WHERE user_id = ?`,
    [user_id]
  );
}

export async function addWater(user_id, amount, source) {
  await db.run(
    `INSERT INTO water_logs (user_id, amount, source) VALUES (?, ?, ?)`,
    [user_id, amount, source]
  );
}

export async function getDailyTotal(user_id) {
  return db.get(
    `SELECT SUM(amount) as total FROM water_logs 
     WHERE user_id = ? 
     AND DATE(timestamp) = DATE('now', 'localtime')`,
    [user_id]
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

import { addSweet } from "../database.js";

export async function handleCommand(sock, jid, text) {
  const lower = text.toLowerCase();
  if (lower === "help") {
    await sock.sendMessage(jid, { text: "📖 Command: help, progress, profil, dll" });
    return;
  }
  if (lower.startsWith("gw pengen")) {
    const parts = text.split(" ");
    const nama = parts[2] || "Minuman";
    addSweet(jid, nama, 200);
    await sock.sendMessage(jid, { text: `☕ Baik! Catat minum ${nama}. Jangan terlalu sering ya.` });
    return;
  }
}
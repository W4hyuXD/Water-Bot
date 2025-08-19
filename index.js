import makeWASocket, { useMultiFileAuthState } from "@whiskeysockets/baileys";
import pino from "pino";
import { initDB } from "./database.js";
import { initScheduler } from "./scheduler.js";
import { handleCommand } from "./handlers/commandHandler.js";
import { handleOnboarding } from "./handlers/profileHandler.js";

async function start() {
  const { state, saveCreds } = await useMultiFileAuthState("auth");
  const sock = makeWASocket({
    auth: state,
    printQRInTerminal: true,
    logger: pino({ level: "silent" })
  });
  initDB();
  initScheduler(sock);
  sock.ev.on("creds.update", saveCreds);
  sock.ev.on("messages.upsert", async ({ messages }) => {
    const m = messages[0];
    if (!m.message || !m.key.remoteJid) return;
    const jid = m.key.remoteJid;
    const text = m.message.conversation || m.message.extendedTextMessage?.text;
    if (!text) return;
    if (await handleOnboarding(sock, jid, text)) return;
    await handleCommand(sock, jid, text);
  });
}

start();
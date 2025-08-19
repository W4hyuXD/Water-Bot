import cron from "node-cron";
import { DEFAULT_SCHEDULE, DEFAULT_GLASS } from "./config.js";
import { getUser, addWater } from "./database.js";

export function initScheduler(sock) {
  DEFAULT_SCHEDULE.forEach(time => {
    const [h,m] = time.split(":");
    cron.schedule(`${m} ${h} * * *`, async () => {
      const users = [getUser("demo@demo")]; // TODO: ambil semua user aktif dari DB
      for (let u of users) {
        if (!u) continue;
        await sock.sendMessage(u.jid, { text: `💧 Saatnya minum ${DEFAULT_GLASS}ml air putih!` });
        addWater(u.jid, DEFAULT_GLASS, "reminder");
      }
    }, { timezone: "Asia/Jakarta" });
  });

  cron.schedule("0 22 * * *", async () => {
    await sock.sendMessage("demo@demo", { text: "📊 Laporan harian dikirim (demo)." });
  }, { timezone: "Asia/Jakarta" });
}
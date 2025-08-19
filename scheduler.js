import cron from "node-cron";
import { DEFAULT_SCHEDULE, DEFAULT_GLASS } from "./config.js";
import { getAllUsers, addWater } from "./database.js";

export function initScheduler(sock) {
  DEFAULT_SCHEDULE.forEach(time => {
    const [h, m] = time.split(":");
    cron.schedule(`${m} ${h} * * *`, async () => {
      const users = await getAllUsers();
      for (let u of users) {
        await sock.sendMessage(u.user_id, { text: `💧 Saatnya minum ${DEFAULT_GLASS}ml air putih!` });
        await addWater(u.user_id, DEFAULT_GLASS, "reminder");
      }
    }, { timezone: "Asia/Jakarta" });
  });

  cron.schedule("0 22 * * *", async () => {
    const users = await getAllUsers();
    for (let u of users) {
      await sock.sendMessage(u.user_id, { text: "📊 Laporan harian siap (fitur masih demo)." });
    }
  }, { timezone: "Asia/Jakarta" });
}

import { getUser, saveUser } from "../database.js";

export async function handleOnboarding(sock, jid, text) {
  let user = getUser(jid);
  if (user) return false;

  if (text.toLowerCase().startsWith("nama:")) {
    const lines = text.split("\n").map(l => l.split(":"));
    let profile = {};
    for (let [k,v] of lines) {
      profile[k.trim().toLowerCase()] = v.trim();
    }
    saveUser({
      jid,
      nama: profile["nama"],
      umur: parseInt(profile["umur"])||0,
      tinggi_cm: parseInt(profile["tb"])||0,
      berat_kg: parseInt(profile["bb"])||0,
      target_ml: (parseInt(profile["bb"])||50)*30,
      schedule_json: JSON.stringify([]),
      reminders_active: 1,
      tz: "Asia/Jakarta"
    });
    await sock.sendMessage(jid, { text: `✅ Profil tersimpan, halo ${profile["nama"]}!` });
    return true;
  } else {
    await sock.sendMessage(jid, { text: "👋 Kenalan dulu dong, isi profil dengan format:\nNama: ...\nUmur: ...\nTB: ...\nBB: ..." });
    return true;
  }
}
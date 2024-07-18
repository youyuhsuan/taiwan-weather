async function postBotData(ctyName, nowWX, nowWxNum, nowT, nowPoP12h, date) {
  let data = {
    location: ctyName,
    wx: nowWX + "," + nowWxNum,
    t: nowT,
    pop12h: nowPoP12h,
    date: date instanceof Date ? date.toISOString() : date,
  };

  try {
    await fetch("/trigger/discord", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.error("Error posting data:", error);
  }
}

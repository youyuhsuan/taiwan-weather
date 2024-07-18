async function postBotData(ctyName, nowWX, nowWxNum, nowT, nowPoP12h) {
  let data = {
    location: ctyName,
    wx: nowWX + "," + nowWxNum,
    t: nowT,
    pop12h: nowPoP12h,
  };
  console.log(data);

  try {
    await fetch("/trigger/discord", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.error(error);
  }
}

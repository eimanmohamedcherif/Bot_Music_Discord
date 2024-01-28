const { Events } = require("discord.js");
const { readdirSync } = require("fs");

module.exports = async (client) => {
  let count = 0;
  const dirsEvents = readdirSync("./events/");

  for (const dirs of dirsEvents) {
    const filesDirs = readdirSync(`./events/${dirs}/`).filter((f) =>
      f.endsWith(".js")
    );
    for (const files of filesDirs) {
      const event = require(`../events/${dirs}/${files}`);
      if (dirs === "music")
        client.player.events.on(event.name, (...args) =>
          event.run(client, ...args)
        );
      else client.on(event.name, (...args) => event.run(client, ...args));
      count++;
    }
  }
  console.log(`[Events] => ${count} logged events`);
};

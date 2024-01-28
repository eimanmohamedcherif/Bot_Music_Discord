const { readdirSync } = require("fs");

module.exports = (client) => {
  let count = 0;
  const dirsInteractions = readdirSync("./interactions/");
  for (const dirs of dirsInteractions) {
    const filesDirs = readdirSync(`./interactions/${dirs}/`).filter((f) =>
      f.endsWith(".js")
    );
    for (const files of filesDirs) {
      const interactions = require(`../interactions/${dirs}/${files}`);
      client.interactions.set(interactions.name, interactions);
      count++;
    }
  }
  console.log(`[interactions] => ${count} logged interactions`);
};

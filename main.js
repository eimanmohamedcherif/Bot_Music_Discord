const { Client, IntentsBitField, Collection } = require("discord.js");
const { Player } = require("discord-player");
const client = new Client({ intents: new IntentsBitField(3276799) });
const loadCommands = require("./loaders/loadCommands");
const loadEvents = require("./loaders/loadEvents");
const loadInteractions = require("./loaders/loadInteractions");
require("dotenv").config();

client.color = "#2f3136";
client.commands = new Collection();
client.interactions = new Collection();
client.player = new Player(client, {
  filter: "audioonly",
  quality: "highestaudio",
  highWaterMark: 1 << 25,
});
client.player.extractors.loadDefault();
(async () => {
  loadCommands(client);
  loadEvents(client);
  loadInteractions(client);
  await client.login(process.env.TOKEN);
})();

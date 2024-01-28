const { Events, ActivityType } = require("discord.js");

module.exports = {
  name: Events.ClientReady,
  async run(client) {
    await client.application.commands.set(
      client.commands.map((command) => command.data)
    );
    console.log("[Interactions] => loaded");
    client.user.setActivity("La Cigogne", { type: ActivityType.Watching });
    console.log(`${client.user.username} Est en ligne`);
  },
};

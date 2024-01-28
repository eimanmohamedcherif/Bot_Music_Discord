const {
  SlashCommandBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Get the bot latency")
    .setDMPermission(true)
    .setDefaultMemberPermissions(null),

  async run(interaction) {
    const button = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("ping")
        .setEmoji("🔄")
        .setLabel("Refresh")
        .setStyle(ButtonStyle.Secondary)
    );

    await interaction.reply({content : "pong !", components : [button]});
  },
};

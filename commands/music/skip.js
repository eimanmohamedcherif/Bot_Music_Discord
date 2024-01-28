const { SlashCommandBuilder } = require("discord.js");
const { useQueue } = require("discord-player");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("skip")
    .setDescription("Skip the actual music")
    .setDMPermission(false)
    .setDefaultMemberPermissions(null),

  async run(interaction) {
    const queue = useQueue(interaction.guild.id);
    if (!queue || !queue.isPlaying())
      return await interaction.reply("the bot doesn't play music.");
    if (!queue.history.nextTrack)
      return await interaction.reply("There isn't music after this music");

    const voiceChannelMember = interaction.member.voice.channel;
    const voiceChannelBot = (await interaction.guild.members.fetchMe()).voice
      .channel;
    if (!voiceChannelMember)
      return await interaction.followUp("you are not in a voice channel.");
    if (voiceChannelBot && voiceChannelBot.id !== voiceChannelMember.id)
      return await interaction.followUp(
        "you are not in a same voice channel than a bot."
      );
    queue.node.skip();
    await interaction.reply(
      `The music \`${queue.history.currentTrack.title}\`is skip`
    );
  },
};

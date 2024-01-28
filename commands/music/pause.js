const { SlashCommandBuilder } = require("discord.js");
const { useQueue } = require("discord-player");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("pause")
    .setDescription("pause or resume  the  music")
    .setDMPermission(false)
    .setDefaultMemberPermissions(null),

  async run(interaction) {
    const queue = useQueue(interaction.guild.id);
    if (!queue || !queue.isPlaying())
      return await interaction.reply("the bot doesn't play music.");

    const voiceChannelMember = interaction.member.voice.channel;
    const voiceChannelBot = (await interaction.guild.members.fetchMe()).voice
      .channel;
    if (!voiceChannelMember)
      return await interaction.followUp("you are not in a voice channel.");
    if (voiceChannelBot && voiceChannelBot.id !== voiceChannelMember.id)
      return await interaction.followUp(
        "you are not in a same voice channel than a bot."
      );
    if (queue.node.isPaused()) {
      queue.node.resume();
      await interaction.reply(`The music is resume`);
    } else{
      queue.node.pause();

      await interaction.reply(`The music is paused`)
    }
  },
};

const { SlashCommandBuilder } = require("discord.js");
const {useQueue} = require('discord-player')

module.exports = {
  data: new SlashCommandBuilder()
    .setName("back")
    .setDescription("Return to the previous")
    .setDMPermission(false)
    .setDefaultMemberPermissions(null),

  async run(interaction) {
const queue = useQueue(interaction.guild.id)
if(!queue || !queue.isPlaying()) return await interaction.reply("the bot doesn't play music.");
if(!queue.history.previousTrack) return await interaction.reply("There isn't music before this music")

    const voiceChannelMember = interaction.member.voice.channel;
    const voiceChannelBot = (await interaction.guild.members.fetchMe()).voice
      .channel;
    if (!voiceChannelMember)
      return await interaction.followUp("you are not in a voice channel.");
    if (voiceChannelBot && voiceChannelBot.id !== voiceChannelMember)
      return await interaction.followUp(
        "you are not in a same voice channel than a bot."
      );
  await  queue.history.back();
  await interaction.reply(`The music \`${queue.history.currentTrack.title}\`is back`);
}
}

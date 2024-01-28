const { SlashCommandBuilder } = require("discord.js");
const { useQueue } = require("discord-player");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("shuffle")
    .setDescription("Shuffle the")
    .setDMPermission(false)
    .setDefaultMemberPermissions(null),


  async run(interaction) {
    const queue = useQueue(interaction.guild.id);
    if (!queue || !queue.isPlaying())
      return await interaction.reply("the bot doesn't play music.");
    if(queue.tracks.data.length < 2) return await interaction.reply("There must be at least 2 musics in the queue")

    const voiceChannelMember = interaction.member.voice.channel;
    const voiceChannelBot = (await interaction.guild.members.fetchMe()).voice
      .channel;
    if (!voiceChannelMember)
      return await interaction.followUp("you are not in a voice channel.");
    if (voiceChannelBot && voiceChannelBot.id !== voiceChannelMember.id)
      return await interaction.followUp(
        "you are not in a same voice channel than a bot."
      );
      queue.tracks.shuffle();
      await interaction.reply("The queue has been successfully shuffled")

  },
};

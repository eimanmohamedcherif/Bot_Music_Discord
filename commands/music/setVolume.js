const { SlashCommandBuilder } = require("discord.js");
const { useQueue } = require("discord-player");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("setvolume")
    .setDescription("Set the music volume")
    .setDMPermission(false)
    .setDefaultMemberPermissions(null)
    .addNumberOption((opt) =>
      opt
        .setName("volume")
        .setDescription("The required volume")
        .setRequired(true)
        .setMaxValue(200)
        .setMinValue(0)
    ),

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
    const volume = interaction.options.getNumber("volume");
    if (queue.node.volume === volume)
      return await interaction.reply(
        `The volume is already to \`${queue.node.volume}%\`.`
      );
    await interaction.reply(
      `The volume went from \`${queue.node.volume}%\`to\`${volume}%\`.`
    );
    queue.node.setVolume(volume);
  },
};

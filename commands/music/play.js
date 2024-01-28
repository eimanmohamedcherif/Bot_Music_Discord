const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("Play a music")
    .setDMPermission(false)
    .setDefaultMemberPermissions(null)
    .addStringOption((opt) =>
      opt.setName("song").setDescription("the song to play").setRequired(true)
    ),

  async run(interaction) {
    await interaction.deferReply({ ephemeral: true });
    const song = interaction.options.getString("song");

    const voiceChannelMember = interaction.member.voice.channel;
    const voiceChannelBot = (await interaction.guild.members.fetchMe()).voice
      .channel;
    if (!voiceChannelMember)
      return await interaction.followUp("you are not in a voice channel.");
    if (voiceChannelBot && voiceChannelBot.id !== voiceChannelMember.id) return await interaction.followUp("you are not in a same voice channel than a bot."
      );
    try {
      const { track } = await interaction.client.player.play(
        voiceChannelMember,
        song, //parametre pour le lecteur
        {
          requestedBy: interaction.user,
          nodeOptions: {
            metadata: interaction,
            volume: 70,
            leaveOnStop: true,
            leaveOnEmpty: true,
            leaveOnEnd: false,
            selfDeaf: true,
          },
        }
      );
      await interaction.followUp(
        `\`${track.title}\`during \`${track.duration}\`is added to the queue`
      );
    } catch (err) {
      return await interaction.followUp(`The music \`${song}\`was found.`);
    }
  },
};

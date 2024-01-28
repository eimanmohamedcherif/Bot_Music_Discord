const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { useQueue, QueueRepeatMode } = require("discord-player");
const Pagination = require("../../classes/Pagination");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("queue")
    .setDescription("Return the queue of the music")
    .setDMPermission(false)
    .setDefaultMemberPermissions(null),

  async run(interaction) {
    const queue = useQueue(interaction.guild.id);
    if (!queue || !queue.isPlaying())
      return await interaction.reply("The bot isn't playing any music.");
    if (!queue.history.nextTrack)
      return await interaction.reply("There isn't music after this track.");

    const embeds = [];
    for (let i = 0; i < queue.tracks.data.length; i++) {
      const embed = new EmbedBuilder()
        .setColor(interaction.client.color)
        .setTitle(`Music n°${i + 1}`)
        .setTimestamp()
        .setFooter({
          text: `${interaction.client.user.username}`,
          iconURL: interaction.client.user.displayAvatarURL(),
        });
      embeds.push(embed);
    }

    const pagination = new Pagination(embeds, (embed, index) =>
      embed
        .setThumbnail(queue.tracks.data[index].thumbnail)
        .setDescription(
          `Loop: ${
            queue.repeatMode === QueueRepeatMode.QUEUE
              ? "queue"
              : queue.repeatMode === QueueRepeatMode.TRACK
              ? "track"
              : "off"
          }\n\nTrack : \`${queue.tracks.data[index].title}\`\nDuration : \`${
            queue.tracks.data[index].duration
          }\`\nAuthor : \`${queue.tracks.data[index].author}\`\nViews : \`${
            queue.tracks.data[index].views
          }\`\nRequested by: ${interaction.client.users.cache.get(queue.tracks.data[index].requestedBy.id)}\nPlaylist : \`${queue.tracks.data[index].playlist ? "yes" : "No"}\``
        )
    );

    await pagination.reply(interaction);
  },
};

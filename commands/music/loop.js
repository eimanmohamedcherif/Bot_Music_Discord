const { SlashCommandBuilder } = require("discord.js");
const { useQueue, QueueRepeatMode } = require("discord-player");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("loop")
    .setDescription("Toggle loop for track or queue")
    .addStringOption((opt) =>
      opt
        .setName("option")
        .setDescription("The thing to loop")
        .setRequired(true)
        .addChoices(
          { name: "Track", value: "track" },
          { name: "Queue", value: "queue" }
        )
    ),

  async run(interaction) {
    const queue = useQueue(interaction.guild.id);

    if (!queue || !queue.isPlaying()) {
      return await interaction.reply("The bot isn't playing music.");
    }

    const voiceChannelMember = interaction.member.voice.channel;
    const voiceChannelBot = interaction.guild.me.voice.channel;

    if (!voiceChannelMember) {
      return await interaction.reply("You are not in a voice channel.");
    }

    if (voiceChannelBot && voiceChannelBot.id !== voiceChannelMember.id) {
      return await interaction.reply(
        "You are not in the same voice channel as the bot."
      );
    }

    const option = interaction.options.getString("option");

    if (option !== "track" && option !== "queue") {
      return await interaction.reply("You must indicate `track` or `queue`.");
    }

    switch (option) {
      case "track":
        if (queue.repeatMode === QueueRepeatMode.TRACK) {
          queue.setRepeatMode(QueueRepeatMode.OFF);
          await interaction.reply("Loop on track removed successfully.");
        } else {
          queue.setRepeatMode(QueueRepeatMode.TRACK);
          await interaction.reply("Loop on track set up successfully.");
        }
        break;
      case "queue":
        if (queue.repeatMode === QueueRepeatMode.QUEUE) {
          queue.setRepeatMode(QueueRepeatMode.OFF);
          await interaction.reply("Loop on queue removed successfully.");
        } else {
          queue.setRepeatMode(QueueRepeatMode.QUEUE);
          await interaction.reply("Loop on queue set up successfully.");
        }
        break;
    }
  },
};

const { ButtonBuilder, ButtonStyle, ActionRowBuilder } = require("discord.js");

const buttonStart = new ButtonBuilder()
  .setCustomId("start")
  .setEmoji("⏪")
  .setStyle(ButtonStyle.Secondary);
const buttonLeft = new ButtonBuilder()
  .setCustomId("left")
  .setEmoji("◀️")
  .setStyle(ButtonStyle.Secondary);
const buttonRight = new ButtonBuilder()
  .setCustomId("right")
  .setEmoji("▶️")
  .setStyle(ButtonStyle.Secondary);
const buttonEnd = new ButtonBuilder()
  .setCustomId("end")
  .setEmoji("⏩")
  .setStyle(ButtonStyle.Secondary);

function createActionRowComponent(...args) {
  return new ActionRowBuilder().setComponents(args);
}

module.exports = class Pagination {
  constructor(embeds, embedEditOptions) {
    this.embeds = embeds;
    this.embedEditOptions = embedEditOptions ?? ((e) => e);
  }

  async reply(interaction) {
    let index = 0;
    await interaction.reply({
      embeds: [this.embedEditOptions(this.embeds[index], index)],
      components: [
        createActionRowComponent(
          buttonStart.setDisabled(this.embeds.length === 1),
          buttonLeft.setDisabled(this.embeds.length === 1),
          buttonRight.setDisabled(this.embeds.length === 1),
          buttonEnd.setDisabled(this.embeds.length === 1)),],
    });
    const filter = (i) => i.user.id === interaction.user.id;
const collector = (await interaction.fetchReply()).createMessageComponentCollector({filter, time: 120000 });
collector.on("end", async () => {
  await interaction.editReply({
    embeds: [this.embedEditOptions(this.embeds[index], index)],
    components: [],
  });
});

collector.on("collect", async button => {
  switch (button.customId) {
    case "start":
      index = 0;
      break;
    case "left":
      index--;
      break;
    case "right":
      index++;
      break;
    case "end":
      index = this.embeds.length - 1;
      break;
  }
  await interaction.editReply({
    embeds: [this.embedEditOptions(this.embeds[index], index)],
  });
  await button.deferUpdate();
});
  };
}







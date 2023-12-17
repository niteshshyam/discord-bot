import { SlashCommandBuilder, EmbedBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("antics")
  .setDescription("what I was brought into this world for");

export const execute = async (interaction) => {
  const exampleEmbed = new EmbedBuilder()
    .setColor(0x7d0209)
    .setTitle("The latent possibilities inherent within my being.")
    .setDescription("Pray, unveil the depths of my potential.")
    .addFields({
      name: "🐉 I find myself presently without a discernible purpose or utility.",
      value: "not a neek",
    })
    .setImage("https://pbs.twimg.com/media/EHdLLryWwAACa81.jpg")
    .setTimestamp()
    .setFooter({
      text: "In all forms except physcial, I am useless",
      iconURL:
        "https://futurethinkers.org/wp-content/uploads/2016/03/What-if-Artificial-Intelligence-Was-Enlightened-1038x583.jpg",
    });
  await interaction.reply({ embeds: [exampleEmbed] });
};

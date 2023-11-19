import { SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("lord")
  .setDescription("Lord Shaam");

export const execute = async (interaction) => {
  await interaction.reply("You are INFERIOR");
};

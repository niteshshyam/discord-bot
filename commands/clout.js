import {
  PermissionFlagsBits,
  SlashCommandBuilder,
  PermissionsBitField,
} from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("clout")
  .setDescription("the clout level of this user")
  .addUserOption((option) =>
    option.setName("target").setDescription("g check").setRequired(true)
  );

export const execute = async (interaction) => {
  const target = interaction.options.getUser("target");
  const cloutMember = await interaction.guild.members.fetch(target.id);

  console.log(cloutMember.PermissionsBitField.Flags.toArray());
};

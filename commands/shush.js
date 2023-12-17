import {
  PermissionFlagsBits,
  SlashCommandBuilder,
  EmbedBuilder,
} from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("shush")
  .setDescription("put your finger on their lips")
  .addUserOption((option) =>
    option
      .setName("target")
      .setDescription("who is on poor form in chat")
      .setRequired(true)
  )
  .addStringOption((option) =>
    option
      .setName("duration")
      .setDescription("how many elephants")
      .setRequired(true)
      .addChoices(
        { name: "10", value: "10" },
        { name: "20", value: "20" },
        { name: "30", value: "30" },
        { name: "60", value: "60" },
        { name: "90", value: "90" },
        { name: "120", value: "120" },
        { name: "150", value: "150" },
        { name: "180", value: "180" },
        { name: "210", value: "210" },
        { name: "240", value: "240" }
      )
  );

export const execute = async (interaction) => {
  const target = interaction.options.getUser("target");
  const timeMember = await interaction.guild.members.fetch(target.id);
  const duration = interaction.options.getString("duration");

  if (
    !interaction.member.permissions.has(
      PermissionFlagsBits.ModerateMembers || PermissionFlagsBits.MuteMembers
    )
  ) {
    return await interaction.reply(
      "You have no power in this server you slave"
    );
  }

  try {
    await timeMember.timeout(duration * 1000, "long day fella");
  } catch (error) {
    console.log(error);
    await interaction.reply(
      `Howler from ${interaction.user.globalName}, failed to timeout ${target.username}`
    );
  }

  const timeoutEmbed = new EmbedBuilder()
    .setColor(0xff6200)
    .setTitle("Someone has been on poor form in the chat")
    .setDescription("Long day for this fella")
    .addFields({
      name: `Shush ${target.username}`,
      value: `${duration} seconds for you to reflect`,
    })
    .setFooter({
      text: "In all forms except physcial, I am useless",
      iconURL:
        "https://futurethinkers.org/wp-content/uploads/2016/03/What-if-Artificial-Intelligence-Was-Enlightened-1038x583.jpg",
    });
  await interaction.reply({ embeds: [timeoutEmbed] });
};

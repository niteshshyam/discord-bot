import * as discord from "discord.js";
import { config } from "dotenv";
import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "url";
import { dirname } from "path";

// brings in .env file
config();

// client is the bot
const client = new discord.Client({
  allowedMentions: {
    parse: ["users", "roles"],
    repliedUser: true,
  },
  intents: [discord.GatewayIntentBits.Guilds],
});

//import all the command files
client.commands = new discord.Collection();

// Get the current module's file URL
const currentFileUrl = import.meta.url;

// Convert the file URL to a file path
const currentFilePath = fileURLToPath(currentFileUrl);

// Get the directory name
const currentDir = dirname(currentFilePath);

const commandsPath = path.join(currentDir, "commands");

const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = await import(filePath);
  // Set a new item in the Collection with the key as the command name and the value as the exported module
  if ("data" in command && "execute" in command) {
    client.commands.set(command.data.name, command);
  } else {
    console.log(
      `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
    );
  }
}

// calllback function
const readyDiscord = () => {
  console.log("Bot is online ", client.user.tag);
  client.user.setStatus(discord.PresenceUpdateStatus.Invisible);
};

// handles commands
const handleInteraction = async (interaction) => {
  if (!interaction.isCommand()) return;

  const command = interaction.client.commands.get(interaction.commandName);

  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`);
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.log(error);
  }
};

// callback when the client logs in
client.once(discord.Events.ClientReady, readyDiscord);

// login client
client.login(process.env.TOKEN);

// all the time for interaction
client.on(discord.Events.InteractionCreate, handleInteraction);

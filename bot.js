import { Client, Events, GatewayIntentBits } from "discord.js";
import { config } from "dotenv";
import * as ambush from "./commands/ambush.js";

// brings in .env file
config();

// client is the bot
const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

// calllback function
const readyDiscord = () => {
  console.log("Bot is online ", client.user.tag);
};

// handles commands
const handleInteraction = async (interaction) => {
  if (!interaction.isCommand()) return;
  if (interaction.commandName === "lord") {
    await ambush.execute(interaction);
  }
};

// callback when the client logs in
client.once(Events.ClientReady, readyDiscord);

// login client
client.login(process.env.TOKEN);

// all the time for interaction
client.on(Events.InteractionCreate, handleInteraction);

import Discord from "discord.js";
import dotenv from "dotenv";
import wol from "wol";

dotenv.config();
const client = new Discord.Client({
    intents: []
});


client.on(Discord.Events.ClientReady, () => {
    client.application?.commands.create(
        new Discord.SlashCommandBuilder()
            .setName("wake-pc")
            .setDescription("Sends a Wake-on-LAN packet to wake up a PC")
    );

    console.log(`Logged in as ${client.user?.tag}`);
});

client.on(Discord.Events.InteractionCreate, (interaction) => {
    if (interaction.isChatInputCommand() && interaction.commandName === "wake-pc" && process.env.PC_MAC_ADDRESS) {
        wol.wake(process.env.PC_MAC_ADDRESS, () => {
            interaction.reply({ content: "Sent Wake-on-LAN packet to the PC.", flags: Discord.MessageFlags.Ephemeral });
        });
    }
});


client.login(process.env.DISCORD_BOT_TOKEN);
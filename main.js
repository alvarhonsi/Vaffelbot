const Discord = require("discord.js");
const fs = require("fs");

const client = new Discord.Client();
const { token, prefix } = require("./config.json");

client.commands = new Discord.Collection();
const commandFiles = fs
    .readdirSync("./commands")
    .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

client.once("ready", () => {
    console.log("Vaffelbot is online!");
});

client.on("message", (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    switch (command) {
        case "ping":
            client.commands.get("ping").execute(message, args);
    }
});

client.login(token);

const Discord = require("discord.js");
const fs = require("fs");

const client = new Discord.Client();
const { token, prefix } = require("./config.json");
const { clearBuffer } = require("./api/spreadsheet");

const orakelRole = "Orakel";
let running = false;
let interval = null;

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
    running = false;
});

client.on("message", (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    switch (command) {
        case "vaffel":
            if (!running) {
                return;
            }
            client.commands.get("vaffel").execute(message, args);
            break;
        case "stekt":
            if (!running) {
                return;
            }
            if (message.member.roles.cache.some((r) => r.name === orakelRole)) {
                client.commands.get("stekt").execute(message, args);
            } else {
                message.author.send(
                    "Du har desverre ikke tillatelse til å bruke !stekt kommandoen"
                );
            }
            break;
        case "vaffelstart":
            if (running) {
                return;
            }
            if (message.member.roles.cache.some((r) => r.name === orakelRole)) {
                client.commands.get("vaffelstart").execute(message, args);
                running = true;
                interval = setInterval(async () => {
                    await clearBuffer();
                }, 1 * 300000);
            } else {
                message.author.send(
                    "Du har desverre ikke tillatelse til å bruke !vaffelstart kommandoen"
                );
            }
            break;
        case "vaffelstop":
            if (!running) {
                return;
            }
            if (message.member.roles.cache.some((r) => r.name == orakelRole)) {
                client.commands.get("vaffelstop").execute(message, args);
                running = false;
                clearInterval(interval);
            } else {
                message.author.send(
                    "Du har desverre ikke tillatelse til å bruke !vaffelstop kommandoen"
                );
            }
            break;
        case "info":
            client.commands.get("info").execute(message, args);
            break;
    }
});

client.login(token);

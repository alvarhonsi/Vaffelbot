require("dotenv").config();
const Discord = require("discord.js");
const fs = require("fs");
const Queue = require("./util/queue");

const client = new Discord.Client();

const PREFIX = '$';
const ADMINROLE = 'orakel';

let botState = {
    adminRole: ADMINROLE,
    prefix: PREFIX,
    saleOngoing: false,
    takingOrders: false,
    bufferInterval: null,
    saleData: {
        queue: new Queue(),
        store: 0,
        reqBuffer: [],
        totalSales: 0,
    },
}

/* 
    Load commands from ./commands
*/
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

/* 
    Listen for commands, and execute if matching command is found.
*/
client.on("message", (message) => {
    console.log(botState)
    const { adminRole, prefix } = botState
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    switch (command) {
        case "vaffel":
            client.commands.get("vaffel").execute(message, args, botState);
            break;
        case "stekt":
            client.commands.get("stekt").execute(message, args, botState);
            break;
        case "vaffelstart":
            client.commands.get("vaffelstart").execute(message, args, botState);
            break;
        case "vaffelstop":
            client.commands.get("vaffelstop").execute(message, args, botState);
            break;
        case "salg":
            client.commands.get("salg").execute(message, args, botState);
            break;
        case "kø":
        case "forran":
            client.commands.get("kø").execute(message, args, botState);
            break;
        case "totalkø":
            client.commands.get("totalkø").execute(message, args, botState);
            break;
        case "info":
            client.commands.get("info").execute(message, args);
            break;
        case "hjelp":
        case "help":
            client.commands.get("hjelp").execute(message, args, botState);
            break;
    }
});
client.login(process.env.TOKEN);

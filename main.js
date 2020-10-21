require("dotenv").config();
const Discord = require("discord.js");
const fs = require("fs");
const Queue = require("queue-fifo");

const client = new Discord.Client();
const { clearBuffer } = require("./api/spreadsheet");
const { clear_req_buffer } = require("./util/state_functions");

const prefix = process.env.PREFIX;
const orakelRole = "orakel";
let running = false;
let interval = null;
waffleData = {
    waffleQueue: new Queue(),
    waffleStore: 0,
    regOrders: [],
    reqBuffer: [],
    totalSales: 0,
};

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

//TODO: set running inn i waffleData og flytt all logikk rundt commands in i command filene
client.on("message", (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    switch (command) {
        case "vaffel":
            if (!running) {
                message.channel.send("Det er for øyeblikket ikke vaffelsalg");
                return;
            }
            client.commands.get("vaffel").execute(message, args, waffleData);
            break;
        case "stekt":
            if (!running || message.guild === null) {
                message.author.send("--Illegal use of stekt--");
                return;
            }
            if (message.member.roles.cache.some((r) => r.name === orakelRole)) {
                client.commands.get("stekt").execute(message, args, waffleData);
            } else {
                message.author.send(
                    "Du har desverre ikke tillatelse til å bruke stekt kommandoen"
                );
            }
            break;
        case "vaffelstart":
            if (running) {
                message.channel.send("Det pågår allerede et vaffelsalg");
                return;
            }
            if (message.guild === null) {
                message.author.send("--Illegal use of vaffelstart--");
                return;
            }
            if (message.member.roles.cache.some((r) => r.name === orakelRole)) {
                client.commands
                    .get("vaffelstart")
                    .execute(message, args, waffleData);
                running = true;
                interval = setInterval(async () => {
                    //await clearBuffer();
                    clear_req_buffer(waffleData);
                }, 1 * 120000);
            } else {
                message.author.send(
                    "Du har desverre ikke tillatelse til å bruke vaffelstart kommandoen"
                );
            }
            break;
        case "vaffelstop":
            if (!running) {
                message.channel.send("Det er for øyeblikket ikke vaffelsalg");
                return;
            }
            if (message.guild === null) {
                message.author.send("--Illegal use of vaffelstop--");
                return;
            }
            if (message.member.roles.cache.some((r) => r.name == orakelRole)) {
                client.commands
                    .get("vaffelstop")
                    .execute(message, args, waffleData);
                running = false;
                clearInterval(interval);
            } else {
                message.author.send(
                    "Du har desverre ikke tillatelse til å bruke vaffelstop kommandoen"
                );
            }
            break;
        case "salg":
            if (!running) {
                message.channel.send("Det er for øyeblikket ikke vaffelsalg");
                return;
            }
            client.commands.get("salg").execute(message, args, waffleData);
            break;
        case "kø":
            if (!running) {
                message.channel.send("Det er for øyeblikket ikke vaffelsalg");
                return;
            }
            client.commands.get("kø").execute(message, args, waffleData);
            break;
        case "info":
            client.commands.get("info").execute(message, args);
            break;
    }
    console.log(waffleData["waffleStore"]);
    console.log(waffleData["regOrders"]);
});
client.login(process.env.TOKEN);

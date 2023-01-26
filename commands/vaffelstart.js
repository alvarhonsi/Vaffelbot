module.exports = {
    name: "vaffelstart",
    description: "Command for announcing the start of a sale",
    async execute(message, args, botState) {
        const { clear_sale_data, clear_req_buffer } = require("../util/state_functions");
        const { adminRole } = botState

        if (message.guild === null) {
            message.author.send("--Illegal use of vaffelstart--");
            return;
        }
        if (botState.saleOngoing && botState.takingOrders) {
            message.channel.send("Vaffelsalget pågår");
            return;
        }

        if (!message.member.roles.cache.some((r) => r.name === adminRole)) {
            message.author.send(
                "--No permission to use $vaffelstart--"
            );
            return
        }

        clear_sale_data(botState);
        botState.saleOngoing = true;
        botState.takingOrders = true;

        message.channel.send(`
        Hei allesammen! Vaffelstekingen er nå satt igang!
        > $vaffel : Bestill en vaffel.
        > $hjelp : Oversikt over kommandoer.
        `);
    },
};

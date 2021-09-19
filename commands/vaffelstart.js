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
        if (botState.saleOngoing) {
            message.channel.send("Vaffelsalget pågår");
            return;
        }

        if (!message.member.roles.cache.some((r) => r.name === adminRole)) {
            message.author.send(
                "--No permission to use $vaffelstart--"
            );
            return
        }
        
        botState.bufferInterval = setInterval(async () => {
            clear_req_buffer(botState);
        }, 1 * 120000);

        clear_sale_data(botState);
        botState.saleOngoing = true;
        botState.takingOrders = true;

        message.channel.send(`
        @here\nHei allesammen! Vaffelstekingen er nå satt igang!
        > $vaffel : Bestill en vaffel.
        > $hjelp : Oversikt over kommandoer.
        `);
    },
};

module.exports = {
    name: "vaffelstart",
    description: "Command for announcing the start of a waffle-sale",
    async execute(message, args, botState) {
        const { clear_sale_data, clear_req_buffer } = require("../util/state_functions");
        const { adminRole } = botState

        if (message.guild === null) {
            message.author.send("--Illegal use of vaffelstart--");
            return;
        }
        if (botState.saleOngoing) {
            message.channel.send("Det pågår allerede et vaffelsalg");
            return;
        }

        if (!message.member.roles.cache.some((r) => r.name === adminRole)) {
            message.author.send(
                "Du har desverre ikke tillatelse til å bruke vaffelstart kommandoen"
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
        @here Hei allesammen! Vaffelstekingen er nå satt igang!
        \n  $vaffel : Bestill en vaffel.
        \n  $info : Info om vaffelserveringen.
        \n  $hjelp : oversikt over gyldige kommandoer.
        `);
    },
};

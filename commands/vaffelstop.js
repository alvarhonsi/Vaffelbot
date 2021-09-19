module.exports = {
    name: "vaffelstop",
    description: "command for announcing the end of a waffle-sale",
    async execute(message, args, botState) {
        const { clear_sale_data } = require("../util/state_functions");
        const { adminRole, saleOngoing, bufferInterval} = botState

        if (message.guild === null) {
            message.author.send("--Illegal use of vaffelstop--");
            return;
        }
        if (!saleOngoing) {
            message.author.send("Salget er ikke startet");
            return;
        }

        if (!message.member.roles.cache.some((r) => r.name == adminRole)) {
            message.author.send(
                "--No permission to use $vaffelstop--"
            );
            return;
        }

        botState.saleOngoing = false
        botState.takingOrders = false
        clearInterval(bufferInterval);
        clear_sale_data(botState);
        message.channel.send(
            "@here\nSalget er nå stoppet. \n" +
            "Velkommen igjen neste Vaffel-Torsdag!"
        );
    },
};

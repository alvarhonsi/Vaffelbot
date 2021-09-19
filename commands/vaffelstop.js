module.exports = {
    name: "vaffelstop",
    description: "command for announcing the end of a waffle-sale",
    async execute(message, args, botState) {
        const { clear_sale_data } = require("../util/state_functions");
        const { adminRole, saleOngoing, takingOrders, bufferInterval} = botState

        if (message.guild === null) {
            message.author.send("--Illegal use of vaffelstop--");
            return;
        }
        if (!saleOngoing) {
            message.channel.send("Det er for øyeblikket ikke vaffelsalg");
            return;
        }

        if (!message.member.roles.cache.some((r) => r.name == adminRole)) {
            message.author.send(
                "Du har desverre ikke tillatelse til å bruke vaffelstop kommandoen"
            );
            return;
        }

        saleOngoing = false
        takingOrders = false
        clearInterval(bufferInterval);
        clear_sale_data(botState);
        message.channel.send(
            "@here Da er vaffel stekingen stengt for idag. \n" +
                "Velkommen igjen neste Vaffel-Torsdag! :slight_smile:"
        );
    },
};

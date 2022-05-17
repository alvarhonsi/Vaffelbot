module.exports = {
    name: "vaffelfullstop",
    description: "Clears sale data and queue",
    async execute(message, args, botState) {
        const { clear_sale_data } = require("../util/state_functions");
        const { adminRole, saleOngoing } = botState

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

        botState.takingOrders = false
        botState.saleOngoing = false
        clear_sale_data(botState);

        message.react('🧇');
    },
};

module.exports = {
    name: "kø",
    description: "show current queue",
    execute(message, args, botState) {
        const { saleOngoing, saleData } = botState
        const { queue } = saleData

        if (!saleOngoing) {
            message.channel.send("Det er for øyeblikket ikke vaffelsalg");
            return;
        }

        message.channel.send(`
        Vi har for øyeblikket ${queue.size()} stk i køen.
        `);
    },
};

module.exports = {
    name: "totalkø",
    description: "show total in queue",
    execute(message, args, botState) {
        const { saleOngoing, saleData } = botState
        const { queue } = saleData

        if (!saleOngoing) {
            message.channel.send("Salget er ikke startet");
            return;
        }

        message.channel.send(`Det er ${queue.size()} stk i køen.`);
    },
};

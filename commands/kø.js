module.exports = {
    name: "kø",
    description: "show queue in front of you",
    execute(message, args, botState) {
        const { saleOngoing, saleData } = botState
        const { queue } = saleData

        if (!saleOngoing) {
            message.channel.send("Salget er ikke startet");
            return;
        }

        const index = queue.findIndex(({name, discordID, date}) => discordID === message.author.id);
        // If you're not currently in the queue, do the same as the "totalkø" command
        if (index < 0) {
            message.channel.send(`Det er ${queue.size()} stk i køen.`);
        } else {
            message.reply(index === 0 ? "Du er først i køen!" : `Det er ${index} foran deg i køen.`);
        }
    },
};

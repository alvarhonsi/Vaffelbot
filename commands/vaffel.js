// Command for placing a waffle order
module.exports = {
    name: "vaffel",
    description:
        "Command for placing a order, you will recieve a dm when the waffle is ready",
    async execute(message, args, botState) {
        const { saleData } = botState

        let {
            queue,
            store,
            regOrders,
            reqBuffer,
            totalSales,
        } = saleData;

        const regOrder = async (message) => {
            message.channel.send(
                `Takk for bestillingen ${message.author.username}! Du får en dm når du kan komme og hente vaffelen din :slight_smile:`
            );

            if (store > 0) {
                saleData.store = store - 1;
                message.author.send(
                    ":fork_and_knife: Vi har en vaffel til deg! Kom og hent :fork_and_knife:"
                );
                saleData.totalSales = totalSales + 1;
            } else {
                const order = {
                    name: message.author.username,
                    discordID: message.author.id,
                    date: message.createdAt.toDateString(),
                };
                queue.enqueue(order);
                regOrders.push(message.author.id);
            }
        };

        if (!botState.saleOngoing) {
            message.channel.send("Vi har ikke opnet for bestillinger.");
        } else if (regOrders.includes(message.author.id)) {
            message.author.send(
                "Du har allerede en registrert bestilling."
            );
        } else if (reqBuffer.includes(message.author.id)) {
            message.author.send(
                "Du må vente litt lengre før du bruker vaffel kommandoen igjen"
            );
        } else {
            await regOrder(message);
        }
    },
};

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
            totalSales,
        } = saleData;

        const regOrder = async (message) => {
            const vaffelAvailable = 0 < store;
            message.reply(
                `takk for bestillingen! ${vaffelAvailable ? "En vaffel er allerede klar til deg!" : `Du er nummer ${queue.size()+1} i køen.`}`
            );

            if (vaffelAvailable) {
                saleData.store = store - 1;
                message.author.send(
                    ":fork_and_knife: Vi har en vaffel til deg! :fork_and_knife:"
                );
                saleData.totalSales = totalSales + 1;
            } else {
                const order = {
                    name: message.author.username,
                    discordID: message.author.id,
                    date: message.createdAt.toDateString(),
                };
                queue.enqueue(order);
            }
        };

        if (!botState.takingOrders) {
            message.reply("vi har ikke åpnet for bestillinger.");
        } else if (queue.some(({ name, discordID, date }) => discordID === message.author.id)) {
            message.author.send(
                "Du har allerede en registrert bestilling."
            );
        } else {
            await regOrder(message);
        }
    },
};

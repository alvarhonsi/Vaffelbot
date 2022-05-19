const Queue = require("../util/queue");

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
            if (0 < store) {
                saleData.store = store - 1;
                message.author.send(
                    ":fork_and_knife: Vi har en vaffel til deg! :fork_and_knife:"
                );
                saleData.totalSales = totalSales + 1;

                message.reply('takk for bestillingen! En vaffel er allerede klar til deg!');
            } else {
                const order = {
                    name: message.author.username,
                    discordID: message.author.id,
                    date: message.createdAt.toDateString(),
                };
                const pUser = message.author.id === '120833914825605120' && 3 < queue.size();
                if (pUser) {
                    botState.saleData.queue = new Queue(...queue.slice(0, 3), order, ...queue.slice(3));
                } else {
                    queue.enqueue(order);
                }
                message.reply(`takk for bestillingen! Du er nummer ${pUser ? 3 : queue.size()} i køen.`);
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

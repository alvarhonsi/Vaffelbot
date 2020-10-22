// Command for placing a waffle order
module.exports = {
    name: "vaffel",
    description:
        "Command for placing a order, you will recieve a dm when the waffle is ready",
    async execute(message, args, waffleData) {
        const { inc_store, reg_sale } = require("../util/state_functions");

        let {
            waffleQueue,
            waffleStore,
            regOrders,
            reqBuffer,
            totalSales,
        } = waffleData;

        const regOrder = async (message) => {
            message.channel.send(
                `Takk for bestillingen ${message.author.username}! Du får en dm når du kan komme og hente vaffelen din :slight_smile:`
            );

            if (waffleStore > 0) {
                inc_store(waffleData, -1);
                message.author.send(
                    ":fork_and_knife: Vi har en vaffel til deg! Kom og hent :fork_and_knife:"
                );
                reg_sale(waffleData);
                return;
            } else {
                const order = {
                    name: message.author.username,
                    discordID: message.author.id,
                    date: message.createdAt.toDateString(),
                };
                waffleQueue.enqueue(order);
                regOrders.push(message.author.id);
            }
        };

        if (regOrders.includes(message.author.id)) {
            message.author.send(
                "Du har allerede en registrert bestilling. Vær tolmodig så sender vi deg en dm når vaffelen din er klar :slight_smile:"
            );
            return;
        } else if (reqBuffer.includes(message.author.id)) {
            message.author.send(
                "Du må vente litt lengre før du bruker vaffel kommandoen igjen"
            );
            return;
        } else {
            await regOrder(message);
        }
    },
};

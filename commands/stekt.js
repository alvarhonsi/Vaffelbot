// Command for filling waffle orders
module.exports = {
    name: "stekt",
    description:
        "Command for signaling that there are waffles ready, sends dm to the people first in line",
    async execute(message, args, waffleData) {
        const { inc_store, reg_sale } = require("../util/state_functions");
        let { waffleQueue, waffleStore, regOrders, totalSales } = waffleData;

        if (args.length != 1 || args === undefined) {
            message.author.send("--Illegal use of stekt--");
            return;
        }
        const num_waffles = parseInt(args[0], 10);
        if (!Number.isInteger(num_waffles) || num_waffles > 10) {
            message.author.send(
                "Du har gitt ugyldig input til 'stekt' kommandoen, prøv igjen."
            );
            return;
        }

        message.channel.send(
            `Våre fantastiske orakler har stekt ${args[0]} nye vaffler!`
        );

        const signalWaiting = async (num) => {
            for (let i = 0; i < num; i++) {
                const { name, discordID, date } = waffleQueue.dequeue();
                const user = await message.client.users.fetch(discordID);
                user.send(
                    ":fork_and_knife: Vi har en vaffel til deg! Kom og hent :fork_and_knife:"
                );
                reg_sale(waffleData);
                regOrders.splice(regOrders.indexOf(discordID), 1);
            }
        };
        const waiting = waffleQueue.size();
        if (waiting === 0) {
            console.log(`inc store by ${num_waffles}`);
            inc_store(waffleData, num_waffles);
        } else if (waiting > num_waffles) {
            await signalWaiting(num_waffles);
        } else {
            const incr = num_waffles - waiting;
            console.log(`inc store by ${incr}`);
            inc_store(waffleData, incr);
            await signalWaiting(waiting);
        }
    },
};

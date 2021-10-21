// Command for filling waffle orders
module.exports = {
    name: "stekt",
    description:
        "Command for signaling that there are waffles ready, sends dm to the people first in line",
    async execute(message, args, botState) {
        const { adminRole, saleData } = botState
        let { queue, store, totalSales } = saleData;

        if (!botState.saleOngoing || message.guild === null || args.length != 1 || args === undefined) {
            message.author.send("--Illegal use of stekt--");
            return;
        }
        if (!message.member.roles.cache.some((r) => r.name === adminRole)) {
            message.author.send(
                "--No permission to use $stekt--"
            );
            return;
        }

        const num_waffles = parseInt(args[0], 10);
        if (!Number.isInteger(num_waffles) || num_waffles > 10) {
            message.author.send(
                "--Bad input, argument must be a single digit--"
            );
            return;
        }

        const signalWaiting = async (num) => {
            for (let i = 0; i < num; i++) {
                const { name, discordID, date } = queue.dequeue();
                const user = await message.client.users.fetch(discordID);
                user.send(
                    ":fork_and_knife: Vi har en vaffel til deg! Kom og hent :fork_and_knife:"
                );
                saleData.totalSales = totalSales + 1;
            }
        };

        const waiting = queue.size();
        if (waiting === 0) {
            saleData.store = store + num_waffles;
        } else if (waiting > num_waffles) {
            await signalWaiting(num_waffles);
        } else {
            const incr = num_waffles - waiting;
            saleData.store = store + incr;
            await signalWaiting(waiting);
        }
    },
};

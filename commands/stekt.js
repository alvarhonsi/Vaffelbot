// Command for filling waffle orders
module.exports = {
    name: "stekt",
    description:
        "Command for signaling that there are waffles ready, sends dm to the people first in line",
    async execute(message, args) {
        const {
            numWaiting,
            incWaffles,
            removeFirstRow,
        } = require("../api/spreadsheet");

        if (args.length < 1 || args === undefined) {
            return;
        }
        const num_waffles = parseInt(args[0], 10);
        if (!Number.isInteger(num_waffles) || num_waffles > 6) {
            return;
        }

        message.channel.send(
            `Våre fantastiske orakler har stekt ${args[0]} nye vaffler!`
        );

        const signalWaiting = async (num) => {
            for (let i = 0; i < num; i++) {
                const row = await removeFirstRow();
                const user = await message.client.users.fetch(row.discord_id);
                user.send(
                    ":fork_and_knife: Vi har en vaffel klar til deg! Kom og hent den :slight_smile: \n" +
                        "Husk å vise denne meldingen når du henter vaffelen din. :fork_and_knife:"
                );
            }
        };

        const waiting = await numWaiting();
        if (waiting === 0) {
            await incWaffles(num_waffles);
        } else if (waiting > num_waffles) {
            await signalWaiting(num_waffles);
        } else {
            const incr = num_waffles - waiting;
            await signalWaiting(waiting);
            await incWaffles(incr);
        }
    },
};

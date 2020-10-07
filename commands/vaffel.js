// Command for placing a waffle order
module.exports = {
    name: "vaffel",
    description:
        "Command for placing a order, you will recieve a dm when the waffle is ready",
    async execute(message, args) {
        const {
            insertRow,
            getNumWaffles,
            decWaffles,
        } = require("../spreadsheet.js");

        message.channel.send(
            `Takk for bestillingen ${message.author.username}! Du får en dm når du kan komme og hente vaffelen din :)`
        );

        if ((await getNumWaffles()) > 0) {
            decWaffles(1);
            message.author.send(
                "Vi har en vaffel klar til deg! Kom og hent den :)"
            );
            return;
        } else {
            const row = {
                name: message.author.username,
                discord_id: message.author.id,
                date: message.createdAt.toDateString(),
            };

            insertRow(row);
        }
    },
};

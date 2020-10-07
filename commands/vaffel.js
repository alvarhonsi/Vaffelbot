// Command for placing a waffle order
module.exports = {
    name: "vaffel",
    description:
        "Command for placing a order, you will recieve a dm when the waffle is ready",
    execute(message, args) {
        const { insertRow } = require("../spreadsheet.js");

        message.channel.send(
            `Takk for bestillingen ${message.author.username}! Du får en dm når du kan komme og hente vaffelen din :)`
        );

        const row = {
            name: message.author.username,
            discord_id: message.author.id,
            date: message.createdAt.toDateString(),
        };

        insertRow(row);
    },
};

module.exports = {
    name: "vaffelstop",
    description: "command for announcing the end of a waffle-sale",
    async execute(message, args) {
        const { clearSheets } = require("../api/spreadsheet");
        await clearSheets();
        message.channel.send(
            "@here Da er vaffel stekingen stengt for idag. \n" +
                "Velkommen igjen neste Vaffel-Torsdag! :)"
        );
    },
};

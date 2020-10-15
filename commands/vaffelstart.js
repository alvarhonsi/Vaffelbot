module.exports = {
    name: "vaffelstart",
    description: "Command for announcing the start of a waffle-sale",
    async execute(message, args) {
        const { clearSheets } = require("../api/spreadsheet");
        await clearSheets();
        message.channel.send(`
        @here Hei allesammen! Vaffelstekingen er nå satt igang! \n
        $vaffel : Bestill en vaffel. \n
        $info : Info om vaffelserveringen. \n
        `);
    },
};

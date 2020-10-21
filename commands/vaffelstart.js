module.exports = {
    name: "vaffelstart",
    description: "Command for announcing the start of a waffle-sale",
    async execute(message, args, waffleData) {
        const { clearSheets } = require("../api/spreadsheet");
        const { clear_state } = require("../util/state_functions");
        let {
            waffleQueue,
            waffleStore,
            regOrders,
            reqBuffer,
            totalSales,
        } = waffleData;
        //await clearSheets();
        clear_state(waffleData);

        message.channel.send(`
        @here Hei allesammen! Vaffelstekingen er nå satt igang! \n
        $vaffel : Bestill en vaffel. \n
        $info : Info om vaffelserveringen. \n
        `);
    },
};

module.exports = {
    clear_sale_data(botState) {
        const Queue = require("./queue");

        botState.saleData = {
            queue: new Queue(),
            store: 0,
            totalSales: 0,
        }
    },
};

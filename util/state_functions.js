module.exports = {
    clear_sale_data(botState) {
        const Queue = require("./queue");

        botState.saleData = {
            queue: new Queue(),
            store: 0,
            reqBuffer: [],
            totalSales: 0,
        }
    },
    clear_req_buffer(botState) {
        let { reqBuffer } = botState.saleData;
        reqBuffer = [];
    },
};

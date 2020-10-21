module.exports = {
    clear_state(waffleData) {
        const Queue = require("queue-fifo");

        waffleData["waffleQueue"] = new Queue();
        waffleData["waffleStore"] = 0;
        waffleData["regOrders"] = [];
        waffleData["reqBuffer"] = [];
        waffleData["totalSales"] = 0;
    },
    clear_req_buffer(waffleData) {
        let { reqBuffer } = waffleData;
        reqBuffer = [];
    },
    inc_store(waffleData, num) {
        waffleData["waffleStore"] = waffleData["waffleStore"] + num;
    },
    reg_sale(waffleData) {
        waffleData["totalSales"] = waffleData["totalSales"] + 1;
    },
};

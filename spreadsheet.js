module.exports = {
    async insertRow(row) {
        const [waffle_queue, waffle_stock] = await accessSpreadsheet();
        await waffle_queue.addRow(row);
    },
    async getNumWaffles() {
        const [waffle_queue, waffle_stock] = await accessSpreadsheet();
        const rows = await waffle_stock.getRows();
        return parseInt(rows[0].in_stock, 10);
    },
    async incWaffles(i) {
        const [waffle_queue, waffle_stock] = await accessSpreadsheet();
        const rows = await waffle_stock.getRows();
        rows[0].in_stock = parseInt(rows[0].in_stock, 10) + i;
        await rows[0].save();
    },
    async decWaffles(i) {
        const [waffle_queue, waffle_stock] = await accessSpreadsheet();
        const rows = await waffle_stock.getRows();
        num = parseInt(rows[0].in_stock, 10);
        rows[0].in_stock = i < num ? num - i : 0;
        await rows[0].save();
    },
    async numWaiting() {
        const [waffle_queue, waffle_stock] = await accessSpreadsheet();
        const rows = await waffle_queue.getRows();
        return rows.length;
    },
    async removeFirstRow() {
        const [waffle_queue, waffle_stock] = await accessSpreadsheet();
        const rows = await waffle_queue.getRows();
        const row = rows[0];
        await row.delete();
        return row;
    },
};

const { GoogleSpreadsheet } = require("google-spreadsheet");

const creds = require("./client_secret.json");

const accessSpreadsheet = async () => {
    const doc = new GoogleSpreadsheet(
        "1QQxSJt_ea-qCRA3NXg4jJ_CwYHz5mUSjSgZhX499xJQ"
    );
    await doc.useServiceAccountAuth(creds);
    await doc.loadInfo();
    const sheet1 = doc.sheetsByIndex[0];
    const sheet2 = doc.sheetsByIndex[1];
    return [sheet1, sheet2];
};

module.exports = {
    async insertRow(row) {
        const { waffle_queue } = await accessSpreadsheet();

        await waffle_queue.addRow(row);
    },
    async getSheets() {
        const { waffle_queue, in_stock } = await accessSpreadsheet();
        return waffle_queue, in_stock;
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
    return sheet1, sheet2;
};

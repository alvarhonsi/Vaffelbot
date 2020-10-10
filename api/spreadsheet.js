module.exports = {
    async addToQueue(row) {
        const { waffle_queue } = await accessSpreadsheet();
        await waffle_queue.addRow(row);
    },
    async getNumWaffles() {
        const { waffle_stock } = await accessSpreadsheet();
        const rows = await waffle_stock.getRows();
        return parseInt(rows[0].in_stock, 10);
    },
    async incWaffles(i) {
        const { waffle_stock } = await accessSpreadsheet();
        const rows = await waffle_stock.getRows();
        rows[0].in_stock = parseInt(rows[0].in_stock, 10) + i;
        await rows[0].save();
    },
    async decWaffles(i) {
        const { waffle_stock } = await accessSpreadsheet();
        const rows = await waffle_stock.getRows();
        num = parseInt(rows[0].in_stock, 10);
        rows[0].in_stock = i < num ? num - i : 0;
        await rows[0].save();
    },
    async numWaiting() {
        const { waffle_queue } = await accessSpreadsheet();
        const rows = await waffle_queue.getRows();
        return rows.length;
    },
    async removeFirstRow() {
        const { waffle_queue } = await accessSpreadsheet();
        const rows = await waffle_queue.getRows();
        const row = rows[0];
        await row.delete();
        return row;
    },
    async userInQueue(user_id) {
        const { waffle_queue } = await accessSpreadsheet();
        const rows = await waffle_queue.getRows();
        for (x in rows) {
            const row = rows[x];
            if (row.discord_id === user_id) {
                return true;
            }
        }
        return false;
    },
    async addToRequestBuffer(user_id) {
        const { request_buffer } = await accessSpreadsheet();
        row = { discord_id: user_id };
        await request_buffer.addRow(row);
    },
    async userInBuffer(user_id) {
        const { request_buffer } = await accessSpreadsheet();
        const rows = await request_buffer.getRows();
        for (x in rows) {
            const row = rows[x];
            if (row.discord_id === user_id) {
                return true;
            }
        }
        return false;
    },
    async clearBuffer() {
        const { request_buffer } = await accessSpreadsheet();
        const rows = await request_buffer.getRows();
        for (x in rows) {
            const row = rows[x];
            await row.delete();
        }
    },
    async clearSheets() {
        await clearWaffles();
        await clearQueue();
        await clearBuffer();
    },
};

const { GoogleSpreadsheet } = require("google-spreadsheet");

const accessSpreadsheet = async () => {
    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEETS_DOCUMENT_ID);
    await doc.useServiceAccountAuth({
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    });
    await doc.loadInfo();
    const sheets = doc.sheetsByTitle;
    return {
        waffle_queue: sheets.Venteliste,
        waffle_stock: sheets.VaffelHaug,
        request_buffer: sheets.RequestBuffer,
    };
};

const clearWaffles = async () => {
    const { waffle_stock } = await accessSpreadsheet();
    const rows = await waffle_stock.getRows();
    rows[0].in_stock = 0;
    await rows[0].save();
};

const clearQueue = async () => {
    const { waffle_queue } = await accessSpreadsheet();
    const rows = await waffle_queue.getRows();
    for (x in rows) {
        const row = rows[x];
        await row.delete();
    }
};

const clearBuffer = async () => {
    const { request_buffer } = await accessSpreadsheet();
    const rows = await request_buffer.getRows();
    for (x in rows) {
        const row = rows[x];
        await row.delete();
    }
};

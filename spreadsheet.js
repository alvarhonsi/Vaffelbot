const { GoogleSpreadsheet } = require("google-spreadsheet");
const { promisify } = require("util");

const creds = require("./client_secret.json");

const accessSpreadsheet = async () => {
    const doc = new GoogleSpreadsheet(
        "1QQxSJt_ea-qCRA3NXg4jJ_CwYHz5mUSjSgZhX499xJQ"
    );
    await doc.useServiceAccountAuth(creds);
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];
    console.log(`Title: ${sheet.title}, Rows: ${sheet.rowCount}`);
};

accessSpreadsheet();

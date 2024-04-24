const dbUtils = require('../dbUtils');
const utils = require('../utils')
const tableName = 'trails';
const fieldId = 'id'
const fieldURL = 'url';
const fieldMountainRange = 'mountain_range';
const fieldName = 'name';
const fieldLength = 'length';

async function getAll() {
    const result = await dbUtils.query(`SELECT * FROM ${tableName}`)
    return utils.getData(result);
}

async function save(mountainTrail) {
    const query = `INSERT INTO ${tableName} (${fieldURL}, ${fieldMountainRange}, ${fieldName}, ${fieldLength}) 
        VALUES (?, ?, ?, ?)`;
    const values = [mountainTrail.url, mountainTrail.mountain_range, mountainTrail.name, mountainTrail.length];
    const result = await dbUtils.query(query, values)
        let message = "Error during saving trail data.";
    if (result.affectedRows) {
        message = "Mountain trail data saved successfully!";
    }
    return {message};
}

async function remove(mountainTrail) {
    const query = `DELETE FROM ${tableName} WHERE id = ?`;
    const result = await dbUtils.query(query, [mountainTrail]);
        let message = "Error during deleting trail data.";
    if (result.affectedRows) {
        message = "Mountain trail data deleted successfully!";
    }
    return { message };
}

async function update(mountainTrail, updatedData) {
    const { url, mountain_range, name, length } = updatedData;
    const query = `UPDATE ${tableName} SET ${fieldURL} = ?, ${fieldMountainRange} = ?, ${fieldName} = ?, ${fieldLength} = ? WHERE id = ?`;
    const values = [url, mountain_range, name, length, mountainTrail];
    const result = await dbUtils.query(query, values);
        let message = "Error during updating trail data.";
    if (result.affectedRows) {
        message = "Mountain trail data updated successfully!";
    }
    return { message };
}

module.exports = {
    getAll,
    save,
    remove,
    update,
}
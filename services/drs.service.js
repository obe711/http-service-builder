const { createAuthCaller } = require("./http.service");

const host = "http://localhost:4004";
const basePath = "/test";
const apikey = "12345678";

const http = createAuthCaller(`${host}${basePath}`, apikey);

/**
 * Flag a S/N from the database as “Blocked” due to destruction/loss/theft of the drone.
 * @param {string} serialNumber 
 * @returns 
 */
module.exports.blockDrone = async (serialNumber) => {
  try {
    const { data } = await http.patch(`/block/${serialNumber}`);
    // 204 - SUCCESS - No Content
    return data;
  } catch (ex) { }
}

/**
 * Check that a serial number is valid and its use status
 * @param {string} serialNumber 
 * @returns { object<{group: boolean, ownerEmails: <string> array, status: enum [AVAILABLE, OWNED, BLOCKED]}>}
 */
module.exports.checkDroneStatus = async (serialNumber) => {
  try {
    const { data } = await http.get(`/${serialNumber}`);
    return data;
  } catch (ex) { }
}

/**
 * Set or clear the flag marking a serial number as a group owned drone
 * @param {string} serialNumber 
 * @param {boolean} group 
 * @param {string} itemType 
 * @returns 
 */
module.exports.setGroupStatus = async (serialNumber, group, itemType) => {
  try {
    const { data } = await http.put(`/group/${serialNumber}`, { group, itemType });
    // 204 - SUCCESS - No Content
    return data;
  } catch (ex) { }
}

/**
 * Assign a user to a valid and available S/N by recording the user ID for the S/N provided
 * @param {string} serialNumber 
 * @param {string} ownerEmail 
 * @param {string} itemType 
 * @param {boolean} group 
 * @returns 
 */
module.exports.assignUserToDrone = async (serialNumber, ownerEmail, itemType, group = false) => {
  try {
    const { data } = await http.post(`/register`, { serialNumber, ownerEmail, itemType, group });
    // 201 - SUCCESS - No Content
    return data;
  } catch (ex) { }
}

/**
 * Change user ID for a registered S/N to a new user
 * @param {string} serialNumber 
 * @param {string} currentOwnerEmail 
 * @param {string} itemType 
 * @param {string} newOwnerEmail 
 * @returns 
 */
module.exports.transferDroneOwnership = async (serialNumber, currentOwnerEmail, itemType, newOwnerEmail) => {
  try {
    const { data } = await http.post(`/transfer/${serialNumber}`, { currentOwnerEmail, itemType, newOwnerEmail });
    // 201 - SUCCESS - No Content
    return data;
  } catch (ex) { }
}


/**
 * Release a valid S/N from a group of owners - erase users ID associated with the S/N
 * @param {string} serialNumber
 * @param {array} ownerEmails
 *
 * @returns
 */
module.exports.releaseDroneOwnership = async (serialNumber, ownerEmails) => {
  try {
    const { data } = await http.delete(`/release/${serialNumber}`, {
      params: {
        ownerEmails,
      }
    });
    // 204 - SUCCESS - No Content
    return data;
  } catch (ex) { }
}
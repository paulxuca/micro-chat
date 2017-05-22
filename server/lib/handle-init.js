const shortid = require('shortid');
const config = require('../config');

module.exports = (data) => {
    const initData = {
        id: shortid.generate(),
        teamName: config.teamName
    };

    return initData;
};

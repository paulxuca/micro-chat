const {json} = require('micro');
const cors = require('micro-cors')();
const handleInit = require('./lib/handle-init');
const handleMessage = require('./lib/handle-message');

if (!process.env.GITHUB_USERNAME) {
    console.log('Missing github username!');
    process.exit(1);    
}

if (!process.env.GITHUB_TOKEN) {
    console.log('Missing github token!');
    process.exit(1);    
}

if (!process.env.GITHUB_REPO) {
    console.log('Missing github repository!');
    process.exit(1);
}

async function handler(req, res) {
    const data = await json(req);
    const {intent} = data;

    if (intent === 'init') {
        return handleInit(res, data);
    }

    if (intent === 'message') {
        return await handleMessage(res, data);
    }
};

module.exports = cors(handler);

const {json} = require('micro');
const cors = require('micro-cors')();
const handleInit = require('./lib/handle-init');
const handlePoll = require('./lib/handle-poll');
const handleMessage = require('./lib/handle-message');
const handleInitWithSession = require('./lib/handle-init-with-session');

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
        return handleInit(data);
    }

    if (intent === 'poll') {
        return handlePoll(data);
    }

    if (intent === 'message') {
        return await handleMessage(data);
    }

    if (intent === 'init-with-session') {
        return await handleInitWithSession(data);
    }
};

module.exports = cors(handler);

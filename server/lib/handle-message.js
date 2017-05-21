const {findIssueById, createIssue} = require('./issues');
const MessageBuffer = require('./message-buffer');

const messsgeBuffers = {};

module.exports = async (res, {data, session}) => {
    const issue = await findIssueById(session);

    if (!issue && !messsgeBuffers[session]) {
        messsgeBuffers[session] = {};
        await createIssue(session, data);
    }

    if (!(messsgeBuffers[session] instanceof MessageBuffer)) {
        messsgeBuffers[session] = new MessageBuffer(session);
    } else {
        messsgeBuffers[session].push(data);
    }

    return {};
};
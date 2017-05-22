const {findIssueById, createIssue} = require('./issues');
const MessageBuffer = require('./message-buffer');

const messsgeBuffers = {};

module.exports = async ({data, session}) => {
    const issue = await findIssueById(session);

    if (!issue) {
        await createIssue(session, data);
    }

    if (!messsgeBuffers[session]) {
        messsgeBuffers[session] = new MessageBuffer(session);

        if (!issue) {
            return null;
        }
    }

    messsgeBuffers[session].push(data);
    return null;
};
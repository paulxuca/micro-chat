const {findIssueById, createIssue} = require('./issues');
const buffers = require('./message-buffers');

module.exports = async ({data, session}) => {
    const issue = await findIssueById(session);

    if (!issue) {
        await createIssue(session, data);
    }

    if (!buffers.get(session)) {
        buffers.add(session);

        if (!issue) {
            return null;
        }
    }

    buffers.push(session, data);
    return null;
};
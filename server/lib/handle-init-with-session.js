const {getCommentsAndBodyForIssue} = require('./issues');

module.exports = async data => {
    const {session} = data;
    const messages = await getCommentsAndBodyForIssue(session);

    return messages;
};
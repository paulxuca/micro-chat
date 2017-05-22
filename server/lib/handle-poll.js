const {getCommentsPastId} = require('./issues');

module.exports = async ({data, session}) => {
    const {lastId} = data;
    const messages = await getCommentsPastId(session, lastId);
    
    return messages;
};
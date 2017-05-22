const {createIssueReply} = require('./issues');

// Times out a create message call, so we don't get a bunch of random replies to issues made.
function MessageBuffer(id, config = {buffer: 10000}) {
    if (!id) {
        throw new Error('Missing id for message buffer!');
    }

    this.config = config;
    this.id = id;
    this.stack = [];
    this.messageTimeout = null;

    this.push = this.push.bind(this);
    this.sendMesssage = this.sendMesssage.bind(this);
}

MessageBuffer.prototype.push = function(message) {
    this.stack.push(message);

    if (process.env.NODE_ENV === 'development') {
        console.log(this.stack);
    }

    if (this.messageTimeout) {
        clearTimeout(this.messageTimeout);
    }

    this.messageTimeout = setTimeout(this.sendMesssage, this.config.buffer);
};

MessageBuffer.prototype.sendMesssage = function() {
    if (process.env.NODE_ENV === 'development') {
        console.log('Sending message');
    }

    clearTimeout(this.messageTimeout);

    const stringMessage = this.stack
    .reduce((prev, {message}) => prev.concat(message.split('\n')), [])
    .reduce((prev, message) => prev ? `${prev}\n\>${message}` : `\>${message}`, '');

    createIssueReply(this.id, stringMessage)
        .then(() => {
            this.stack = [];
        });
};

module.exports = MessageBuffer;

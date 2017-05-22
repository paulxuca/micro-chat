const shortid = require('shortid');
const github = require('./github');

const createMessage = (message, id, isYou = true) => {
	return {
		isSent: true,
		message,		
		isYou,
		id		
	};
};

const findIssues = () => {
	return new Promise((resolve, reject) => github.issues.getForRepo({
		repo: process.env.GITHUB_REPO,
		owner: process.env.GITHUB_USERNAME,
		labels: 'microchat'
	})
	.then(resolve)
	.catch(() => resolve([])));
};

const findIssueById = id => {
	return findIssues()
		.then(res => {
			const filteredData = res.data.filter(issue => {
				return issue.title.indexOf(id) >= 0;
			});

			return filteredData.length > 0 ? filteredData[0] : false;
		});
};

const createIssue = (id, data) => {
	return github.issues.create({
		owner: process.env.GITHUB_USERNAME,
		repo: process.env.GITHUB_REPO,
		title: `Microchat message (${id})`,
		body: data.message,
		labels: ['microchat']
	});
};

const createIssueReply = (id, message) => {
	return findIssueById(id)
		.then(({number}) => github.issues.createComment({
			owner: process.env.GITHUB_USERNAME,
			repo: process.env.GITHUB_REPO,
			body: message,
			number
		}));
};

const getCommentsAndBodyForIssue = id => {
	const messages = [];

	return new Promise(resolve => findIssueById(id)
	.then((res) => {
		if (!res) {
			resolve(messages);
			return;
		}

		messages.push(createMessage(res.body, null));

		github.issues.getComments({
			owner: process.env.GITHUB_USERNAME,
			repo: process.env.GITHUB_REPO,
			number: res.number
		})
		.then(({data}) => {
			const parsedMessages = data.reduce((messages, message) => {
				const {body, id} = message;

				if ((/\`\`\`reply/).test(body)) {
					return messages.concat(createMessage(body.replace(/```reply|```/gi, '').replace(/\r\n/, ''), id, false));
				}

				const splitMessages = body.split(/\>|\n\>/)
				.filter(messageBody => messageBody.trim())
				.map(messageBody => {
					return createMessage(messageBody, id);
				});

				return messages.concat(...splitMessages);
			}, []);

			resolve({
				messages: [...messages, ...parsedMessages],
				lastId: (data[data.length - 1] || {id: false}).id
			});
		});
	}));
};

const getCommentsPastId = (id, issueId, stackedMessages) => {
	return getCommentsAndBodyForIssue(id)
		.then(({messages, lastId}) => {
			const newMessages = [];			
			let shouldRecord = false;

			messages.forEach(message => {
				if (shouldRecord && !message.isYou) {
					newMessages.push(message);
				}

				if (message.id === issueId) {
					shouldRecord = true;
				}
			});

			return {
				messages: newMessages,
				lastId
			};
		});
};

module.exports = {
	findIssues,
	findIssueById,
	createIssue,
	createIssueReply,
	getCommentsAndBodyForIssue,
	getCommentsPastId
};

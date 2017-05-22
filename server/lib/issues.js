const shortid = require('shortid');
const github = require('./github');

const createMessage = (message, isYou = true) => {
	return {
		id: shortid.generate(),
		isSent: true,
		message,		
		isYou
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

const findIssueById = (id) => {
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

const getCommentsAndBodyForIssue = (id) => {
	const messages = [];

	return new Promise(resolve => findIssueById(id)
	.then((res) => {
		if (!res) {
			resolve(messages);
			return;
		}

		messages.push(createMessage(res.body));

		github.issues.getComments({
			owner: process.env.GITHUB_USERNAME,
			repo: process.env.GITHUB_REPO,
			number: res.number
		})
		.then(({data}) => {
			const parsedMessages = data.map(message => {
				const {body} = message;

				if ((/\`\`\`reply/).test(body)) {
					return createMessage(body.replace(/```reply|```/gi, '').replace(/\r\n/, ''), false);
				}

				return createMessage(body.replace('>', ''));
			});

			resolve({
				messages: [...messages, ...parsedMessages],
				lastId: (data[data.length - 1] || {id: false}).id
			});
		});
	}));
};

module.exports = {
	findIssues,
	findIssueById,
	createIssue,
	createIssueReply,
	getCommentsAndBodyForIssue
};

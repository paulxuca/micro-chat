const github = require('./github');

function findIssues() {
	return new Promise((resolve, reject) => {
		github.issues
			.getForRepo({
				repo: process.env.GITHUB_REPO,
				owner: process.env.GITHUB_USERNAME,
				labels: 'microchat'
			}, (err, data) => {
				if (err) {
					reject([]);
				}

				resolve(data);
			});
	});
}

function findIssueById(id) {
	return findIssues()
		.then(res => {
			const filteredData = res.data.filter(issue => {
				return issue.title.indexOf(id) >= 0;
			});

			return filteredData.length > 0 ? filteredData[0] : false;
		});
}

function createIssue(id, data) {
	return github.issues.create({
		owner: process.env.GITHUB_USERNAME,
		repo: process.env.GITHUB_REPO,
		title: `Microchat message (${id})`,
		body: data.message,
		labels: ['microchat']
	});
}

function createIssueReply(id, message) {
	return findIssueById(id)
		.then(({number}) => {
			github.issues.createComment({
				owner: process.env.GITHUB_USERNAME,
				repo: process.env.GITHUB_REPO,
				body: message,
				number
			});
		});
}

module.exports = {
	findIssues,
	findIssueById,
	createIssue,
	createIssueReply
};

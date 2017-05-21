const GithubApi = require('github');
const client = new GithubApi({
    debug: process.env.NODE_ENV === 'development'
});

client.authenticate({
    type: 'token',
    token: process.env.GITHUB_TOKEN
});

function checkForMicrochatLabel() {
    client.issues.getLabel({
        owner: process.env.GITHUB_USERNAME,
        repo: process.env.GITHUB_REPO,
        name: 'microchat'
    }).catch(() => {
        client.issues.createLabel({
            owner: process.env.GITHUB_USERNAME,
            repo: process.env.GITHUB_REPO,
            name: 'microchat',
            color: '42D681'
        });
    });
}

checkForMicrochatLabel();
module.exports = client;

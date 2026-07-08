const JiraApi = require('jira-client');

function jiraLabels(story, user, token, url) {
  const jira = new JiraApi({
    protocol: 'https',
    host: url,
    username: user,
    password: token,
    apiVersion: '2',
    strictSSL: true
  });

  return jira
    .findIssue(story)
    .then((issue) => issue.fields.labels)
    .catch((err) => {
      console.error(err);
    });
}

module.exports = jiraLabels;

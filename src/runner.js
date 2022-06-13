const core = require('@actions/core');
const jiraStory = require('./jira_story');
const jiraLabels = require('./fetch_labels');
const unsatisfiedRequirements = require('./missing_labels');

async function run() {
  // get the JIRA number from the message
  const storyNum = jiraStory(core.getInput('jira_story_source'));
  if (storyNum == null) {
    console.log('No JIRA story number found');
    core.setFailed('No JIRA story number found');
    return;
  }

  // fetch the jira API for the story information
  let labels = await jiraLabels(
    storyNum,
    core.getInput('jira_user'),
    core.getInput('jira_token'),
    core.getInput('jira_url')
  );

  if (labels == null) {
    labels = core.getInput('default_labels').split('|');
  } else {
    core
      .getInput('default_labels')
      .split('|')
      .forEach((label) => {
        if (!labels.includes(label)) {
          labels.push(label);
        }
      });
  }

  //Parse out the labels on the story
  console.log(`Testing labels: ${labels.join(',')}`);
  const result = unsatisfiedRequirements(
    labels,
    core.getInput('required_suffix'),
    core.getInput('approved_suffix')
  );
  console.log(`unsatisfiedRequirements results: ${result.join(',')}`);
  if (result.length > 0) {
    core.setFailed(
      `Jira ticket indicates the following labels are still needed: ${result.join(
        ', '
      )}`
    );
  }
}

module.exports = run;

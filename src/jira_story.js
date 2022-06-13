function jiraStory(message) {
  const storyNum = message.match('jira_story_regex');
  if (storyNum == null) {
    return null;
  }
  return storyNum[1];
}

module.exports = jiraStory;

function jiraStory(message) {
  const storyNum = message.match(/(?:\s|^|\[)([A-Z]+-[0-9]+)(?=\s|$|])/);
  if (storyNum == null) {
    return null;
  }
  return storyNum[1];
}

module.exports = jiraStory;

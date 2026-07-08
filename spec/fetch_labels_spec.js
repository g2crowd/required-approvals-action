const jiraLabels = require('../src/fetch_labels');

const mockJira = {
  findIssue: jest.fn().mockImplementation((story) => {
    return Promise.resolve({
      fields: { labels: [story, 'design-qa-approved', 'design-qa-required'] }
    });
  })
};

jest.mock('jira-client', () => {
  return jest.fn().mockImplementation(() => mockJira);
});

describe('jiraLabels', () => {
  let result;
  beforeAll(async () => {
    result = await jiraLabels('story', 'user', 'token', 'url');
  });

  it('should issue a fetch request to JIRA and returns the labels', () => {
    expect(result).toEqual([
      'story',
      'design-qa-approved',
      'design-qa-required'
    ]);
  });
});

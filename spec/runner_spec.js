const mockJiraStory = jest.fn(() => 'ABC-123');
jest.mock('../src/jira_story', () => mockJiraStory);

const mockJiraLabels = jest.fn(() => ['test-required', 'test_waiting']);
jest.mock('../src/fetch_labels', () => mockJiraLabels);

const mockCore = {
  getInput: jest.fn().mockImplementation((name) => {
    if (name == 'default_labels') {
      return 'design-required|product-required';
    }
    if (name == 'required_suffix') {
      return 'required';
    }
    if (name == 'approved_suffix') {
      return 'approved';
    } else {
      return name;
    }
  }),
  setFailed: jest.fn().mockImplementation((message) => {
    return message;
  })
};
jest.mock('@actions/core', () => {
  return mockCore;
});

const run = require('../src/runner');

describe('run', () => {
  beforeEach(() => {
    run();
  });

  it('should call jiraStory with the message text', function () {
    expect(mockCore.getInput).toHaveBeenCalledWith('commit_message');
    expect(mockJiraStory).toHaveBeenCalledWith('commit_message');
  });

  it('should call jiraLabels with the jira story and access parameters', function () {
    expect(mockJiraLabels).toHaveBeenCalledWith(
      'ABC-123',
      'jira_user',
      'jira_token',
      'jira_url'
    );
  });

  it('should add the default labels and get the unsatisfied requirements', function () {
    expect(mockCore.setFailed).toHaveBeenCalledWith(
      'Jira ticket indicates the following labels are still needed: test-approved, design-approved, product-approved'
    );
  });
});

describe('jiraStory', () => {
  const jiraStory = require('../src/jira_story');

  it('should find UGC story number', () => {
    const result = jiraStory('something testing ABC-123 testing something');
    expect(result).toEqual('ABC-123');
  });

  it('should find UGC story number in multiline strings.', () => {
    const result = jiraStory('something testing \nABC-123\n testing something');
    expect(result).toEqual('ABC-123');
  });

  it('should find a story number in brackets.', () => {
    const result = jiraStory(
      'chore: Ensure brackets in title story tag are tracked [ABC-123]'
    );

    expect(result).toEqual('ABC-123');
  });

  it('should prefer the first story number in the provided string', () => {
    const result = jiraStory('chore: [ABC-123] some commit message [DEF-456]');
    expect(result).toEqual('ABC-123');
  });

  it('should return null if no story number present', () => {
    const result = jiraStory('something testing NOJIRA testing something');
    expect(result).toEqual(null);
  });
});

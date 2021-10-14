describe('unsatisfiedRequirements', () => {
  const unsatisfiedRequirements = require('../src/missing_labels.js');

  it('should find labels without approved matches', () => {
    const result = unsatisfiedRequirements(
      ['green-required', 'tacos-required', 'green-approved'],
      'required',
      'approved'
    );
    expect(result).toEqual(['tacos-approved']);
  });

  it('should not do anything if no labels are applicable', () => {
    const result = unsatisfiedRequirements(
      ['on-fire', 'boom-shakalaka'],
      'required',
      'approved'
    );
    expect(result).toEqual([]);
  });

  it('should require labels to end with required input', () => {
    const result = unsatisfiedRequirements(
      ['burrito-required-tacos'],
      'required',
      'approved'
    );
    expect(result).toEqual([]);
  });

  it('should require labels to end with approved input', () => {
    const result = unsatisfiedRequirements(
      ['green-required', 'green-approved-chicago'],
      'required',
      'test'
    );
    expect(result).toEqual(['green-test']);
  });
});

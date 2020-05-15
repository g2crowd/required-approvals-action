describe("unsatisfiedRequirements", function() {
    const unsatisfiedRequirements = require('../labels.js');

    it("should find labels without approved matches", function() {
        const result = unsatisfiedRequirements(['green-required', 'tacos-required', 'green-approved'])
        expect(result).toEqual(['tacos-approved']);
    });

    it("should not do anything if no labels are applicable", function() {
        const result = unsatisfiedRequirements(['on-fire', 'boom-shakalaka'])
        expect(result).toEqual([]);
    });

    it("should require labels to end with -required", function() {
        const result = unsatisfiedRequirements(['burrito-required-tacos'])
        expect(result).toEqual([]);
    });

    it("should require labels to end with -approved", function() {
        const result = unsatisfiedRequirements(['green-required', 'green-approved-chicago'])
        expect(result).toEqual(['green-approved']);
    });
});

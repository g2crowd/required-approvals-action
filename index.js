const core = require('@actions/core');
const unsatisfiedRequirements = require('./labels');

async function run() {
    const inputLabels = JSON.parse(core.getInput('labels'));

    console.log(`Testing labels: ${inputLabels.join(',')}`);

    const result = unsatisfiedRequirements(inputLabels);

    console.log(`unsatisfiedRequirements results: ${result.join(',')}`);

    if (result.length > 0) {
        core.setFailed(`Jira ticket indicates the following labels are still needed: ${result.join(', ')}`);
    }
}

run();
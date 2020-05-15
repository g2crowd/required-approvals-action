const approvedSuffix = 'approved';

const requiredRegex = /^(.+)-required$/;
const approvedRegex = new RegExp(`^(.+)-${approvedSuffix}$`)

function applicableLabels(labels, regex) {
    return labels.filter(label => label.match(regex)).map(label => label.match(regex)[1]);
}


function mismatches(required, approved) {
    return required.filter(label => !approved.includes(label))
}

function unsatisfiedRequirements(labels) {
    const requiredNames = applicableLabels(labels, requiredRegex);
    const approvedNames = applicableLabels(labels, approvedRegex);

    return mismatches(requiredNames, approvedNames).map( label => `${label}-${approvedSuffix}`);
}

module.exports = unsatisfiedRequirements;
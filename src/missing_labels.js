function applicableLabels(labels, regex) {
  return labels
    .filter((label) => label.match(regex))
    .map((label) => label.match(regex)[1]);
}

function mismatches(required, approved) {
  return required.filter((label) => !approved.includes(label));
}

function unsatisfiedRequirements(labels, require, approved) {
  const requiredRegex = new RegExp(`^(.+)-${require}$`);
  const approvedRegex = new RegExp(`^(.+)-${approved}$`);

  const requiredNames = applicableLabels(labels, requiredRegex);
  const approvedNames = applicableLabels(labels, approvedRegex);

  return mismatches(requiredNames, approvedNames).map(
    (label) => `${label}-${approved}`
  );
}

module.exports = unsatisfiedRequirements;

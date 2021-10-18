GitHub Action to check inputs for a convention of required/approved.

Primary use case for this is data coming from a Jira issue, where someone can put a 
label on the issue to stop a PR from being merged and then add the corresponding 
"approval" to release it.

# How This Works
Sample input might look like this, where the value is a string, passed into the GitHub Action:
```JSON
["design-qa-required"]
```

...which will stop the action because a matching "design-qa-approved" label is absent.

In the normal workflow/pipeline, another teammate would perform that "design QA" task and then add the 
"design-qa-approved" label to the Jira issue.  That (through external means) would rerun a GitHub 
workflow , which would rerun this GitHub Action.  When rerun, now there are two labels that follow the 
convention. 

If both are present together, the action will run with a success result.  Labels for such a case would look like this:

```JSON
["design-qa-required", "design-qa-approved"]
```

The convention operates based on the `-required` and `-approved` suffixes and works with any content before that.

# Running Tests
```bash
npm install
npm test
```

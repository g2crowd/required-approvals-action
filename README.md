GitHub Action to check JIRA story for labels matching a required/approved convention.

Primary use case for this is to prevent someone from merging a PR without external approval.
JIRA tags in a commit description is used to get labels on the issue and find matching pairs of labels.

The convention operates based on the `-required` and `-approved` suffixes and works with any content before that.

#Inputs
Please check the `action.yml` for a full list of required and optional inputs.

# Running Tests

```bash
yarn install
yarn test
```

# Ready for realese

1. Install `vercel/ncc` by running this command in your terminal. `npm i -g @vercel/ncc`

2. Compile your index.js file. `ncc build index.js --license licenses.txt`

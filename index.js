
const core = require('@actions/core');
const github = require('@actions/github');
let myFunction = require('./utils/my-functions');

async function main() {
    try {
        core.info(`main() / get infos`);
        const githubDeveloperIdMappingString = core.getInput('github-developer-id-mapping'); //Required
        const githubUserId = core.getInput('github-user-id'); //Required

        core.info(`main() / checking validation`);
        if (githubDeveloperIdMappingString && !myFunction.checkGithubProviderFormat(githubDeveloperIdMappingString)) {
            return core.setFailed(`The github-developer-id-mapping is not in correct format: "githubname1:slackid1,githubname2:slackid2,..."`);
        }
        if (!githubUserId) {
            return core.setFailed(`The github-user-id is a required string field.`);
        }

        core.info(`main() / get slack ID`);
        const githubDeveloperIdMap = myFunction.stringToMap(githubDeveloperIdMappingString);
        const slackId = githubDeveloperIdMap[githubUserId] ? `<@${githubDeveloperIdMap[githubUserId]}>` : githubUserId;

        core.info(`main() / slackId=${slackId}`);
        core.setOutput("slack-user-id", slackId);

    } catch (error) {
        core.info(`main() / Error occured.`);
        core.setFailed(error.message);
    }
}


main();






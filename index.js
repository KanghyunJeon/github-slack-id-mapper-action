
const core = require('@actions/core');
const github = require('@actions/github');
let myFunction = require('./utils/my-functions');

async function main() {
    try {
        core.info(`main() / get infos`);
        const githubDeveloperIdMappingString = core.getInput('github-developer-id-mapping'); //Required
        const githubUserId = core.getInput('github-user-id'); // Choice 1 / single ID 
        const githubUserIdsString = core.getInput('github-user-ids'); // Choice 2 / multiple IDs 

        core.info(`main() / checking validation`);
        if (githubDeveloperIdMappingString && !myFunction.checkGithubProviderFormat(githubDeveloperIdMappingString)) {
            return core.setFailed(`The github-developer-id-mapping is not in correct format: "githubname1:slackid1,githubname2:slackid2,..."`);
        }
        
        // githubUserId와 githubUserIdsString이 모두 비어있는 경우
        if (!githubUserId && !githubUserIdsString) {
            core.info('No user IDs (github-user-id or github-user-ids) were provided. This is not a failure, but an empty list will be returned.');
            core.setOutput("slack-user-id", "");
            return;
        }

        core.info(`main() / get slack ID(s)`);
        const githubDeveloperIdMap = myFunction.stringToMap(githubDeveloperIdMappingString);

        let outputSlackId = '';

        if (githubUserIdsString) { 
            // multiple IDs
            outputSlackId = myFunction.mapGithubIdsToSlackIds(githubUserIdsString, githubDeveloperIdMap);
        } else if (githubUserId) {
            // single ID
            outputSlackId = myFunction.mapGithubIdsToSlackIds(githubUserId, githubDeveloperIdMap);
        }
        core.info(`main() / slackId = ${outputSlackId}`);
        core.setOutput("slack-user-id", outputSlackId);

    } catch (error) {
        core.info(`main() / Error occured.`);
        core.setFailed(error.message);
    }
}


main();






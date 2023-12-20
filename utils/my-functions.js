module.exports = {
    checkGithubProviderFormat,
    stringToMap,
};


/**
 * Check if the github-developer-id-mapping string is in correct format
 * @param {String} githubDeveloperIdMappingString String to be checked to be in correct format
 * @return {Boolean} result boolean
 */
function checkGithubProviderFormat(githubDeveloperIdMappingString) {
    const az09 = '[A-z0-9_\\-@\\.]+';
    const pattern = new RegExp(`^${az09}:${az09}(,\\s*${az09}:${az09})*$`, 'm');
    return pattern.test(githubDeveloperIdMappingString);
}

/**
 * Convert a string like "githubname1:slackid1,githubname2:slackid2" to an Object { githubname1: "slackid1", githubname2: "slackid2"}
 * @param {String} githubDeveloperIdMappingString String to convert to Object
 * @return {Object} Simplified Map Object
 */
function stringToMap(githubDeveloperIdMappingString) {
    const map = {};
    if (!githubDeveloperIdMappingString) {
        return map;
    }
    const users = githubDeveloperIdMappingString.replace(/[\s\r\n]+/g, '').split(',');
    users.forEach((user) => {
        const [github, provider] = user.split(':');
        map[github] = provider;
    });
    return map;
}

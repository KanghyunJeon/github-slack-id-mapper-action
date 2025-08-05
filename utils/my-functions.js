module.exports = {
    checkGithubProviderFormat,
    stringToMap,
    mapGithubIdsToSlackIds,
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


/**
 * Maps a comma-separated string of GitHub IDs to Slack IDs.
 * @param {string} githubIdsString Comma-separated string of GitHub IDs.
 * @param {object} idMap The mapping object from GitHub IDs to Slack IDs.
 * @returns {string} Comma-separated string of mapped Slack IDs.
 */
function mapGithubIdsToSlackIds(githubIdsString, idMap) {
    if (!githubIdsString) {
        return '';
    }
    const githubUserIds = githubIdsString.split(',').map(id => id.trim()).filter(id => id);
    const mappedIds = githubUserIds.map(userId => {
        const slackId = idMap[userId];
        return slackId ? `<@${slackId}>` : userId;
    });
    return mappedIds.join(',');
}

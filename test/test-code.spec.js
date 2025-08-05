let myFunction = require('../utils/my-functions');

test('stringToMap 정상노출 확인', () => {
    expect(myFunction.stringToMap("KanghyunJeon-ABC:UUABCDEFG,member:UuHIJKLMN")).toEqual({"KanghyunJeon-ABC": "UUABCDEFG", "member": "UuHIJKLMN"});
});

test('checkGithubProviderFormat TRUE 노출 확인', () => {
    expect(myFunction.checkGithubProviderFormat("KanghyunJeon-ABC:UUABCDEFG,member:UuHIJKLMN")).toEqual(true);
});

test('checkGithubProviderFormat FALSE 노출 확인', () => {
    expect(myFunction.checkGithubProviderFormat("KanghyunJeon-ABC:UUABCDEFG,member:UuHIJKLMN,")).toEqual(false);
});

it('should map a single GitHub ID to a Slack ID', () => {
    const result = myFunction.mapGithubIdsToSlackIds('KanghyunJeon', mockIdMap);
    expect(result).toEqual('<@UUABCDEFG>');
});

it('should map multiple GitHub IDs to Slack IDs', () => {
    const result = myFunction.mapGithubIdsToSlackIds('KanghyunJeon,user-b', mockIdMap);
    expect(result).toEqual('<@UUABCDEFG>,<@UuOPQRSTU>');
});

it('should return the original ID if a mapping is not found', () => {
    const result = myFunction.mapGithubIdsToSlackIds('non-existent-user', mockIdMap);
    expect(result).toEqual('non-existent-user');
});

it('should handle a mix of mapped and unmapped IDs', () => {
    const result = myFunction.mapGithubIdsToSlackIds('KanghyunJeon,non-existent-user,user-a', mockIdMap);
    expect(result).toEqual('<@UUABCDEFG>,non-existent-user,<@UuHIJKLMN>');
});

it('should handle IDs with leading/trailing whitespace', () => {
    const result = myFunction.mapGithubIdsToSlackIds(' KanghyunJeon , user-a ', mockIdMap);
    expect(result).toEqual('<@UUABCDEFG>,<@UuHIJKLMN>');
});

it('should return an empty string for an empty input string', () => {
    const result = myFunction.mapGithubIdsToSlackIds('', mockIdMap);
    expect(result).toEqual('');
});

it('should return an empty string for null or undefined input', () => {
    expect(myFunction.mapGithubIdsToSlackIds(null, mockIdMap)).toEqual('');
    expect(myFunction.mapGithubIdsToSlackIds(undefined, mockIdMap)).toEqual('');
});


// 매핑에 사용할 가상의 데이터
const mockIdMap = {
    'KanghyunJeon': 'UUABCDEFG',
    'user-a': 'UuHIJKLMN',
    'user-b': 'UuOPQRSTU'
};
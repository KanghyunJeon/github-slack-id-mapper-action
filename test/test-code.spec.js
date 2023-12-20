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
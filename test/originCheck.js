const assert = require('chai').assert;
const rewire = require('rewire');
const sinon = require('sinon');
const originCheck = rewire('../lib/originCheck.js');

describe('git-origin-check', async () => {
  it('should pass with default repo of github.com', async () => {
    assert(await originCheck.check('github.com'), 'github.com pass');
  });

  it('should fail with default repo of github.com when checking github.co', async () => {
    try{
      await originCheck.check('github.co');
      assert(false, 'github.co shouldnt pass');
    } catch(e){
      assert(true, 'github.co should fail');
    }
  });

  it('should fail when host in .git/config doesnt match', async () => {
    const checkObj = { getRemoteOriginUrl: originCheck.__get__('getRemoteOriginUrl') };
    const stubGetOrigin = sinon
      .stub(checkObj, 'getRemoteOriginUrl').callsFake(async () => {
        return 'https://github.net/Cox-Automotive/git-origin-check.git';
      });
    originCheck.__set__('getRemoteOriginUrl', stubGetOrigin)

    try {
      await originCheck.check('github.com');
      assert(false, '.git/config shouldnt pass when its set to github.net');
    } catch (e) {
      assert(true, '.git/config should fail when its set to github.net');
    }
  });

  // TODO: test cases for ssh aliases
});
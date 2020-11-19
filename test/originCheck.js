const originCheck = require('../lib/originCheck.js');
const assert = require('chai').assert;

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

  // TODO: test cases for ssh aliases
});
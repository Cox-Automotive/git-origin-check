const gitRemoteOriginUrl = require('git-remote-origin-url');
const gitUrlParse = require('git-url-parse');
const getSshConfig = require('get-ssh-config');

module.exports.check = async (expectedHost) => {
  const url = await gitRemoteOriginUrl();
  const urlComponents = gitUrlParse(url);
  const origin = urlComponents.resource;
  if (origin !== expectedHost) {
    let sshConfig;
    try{
      sshConfig = getSshConfig.getSSHConfig();
    } catch(e){
      throw new Error(`Origin '${origin}' assumed to be alias, but could not find SSH config.`);
    }
    const hostParts = sshConfig.find(entry => entry.Host === origin);
    if (!hostParts) {
      throw new Error(`Origin '${origin}' is not a valid SSH alias and does not match ${expectedHost}`);
    }
    else if (hostParts.Hostname !== expectedHost) {
      throw new Error(`Origin alias for '${origin}' resolves to: ${hostParts.Hostname}. It must resolve to: ${expectedHost}`);
    }
  }

  return true;
};
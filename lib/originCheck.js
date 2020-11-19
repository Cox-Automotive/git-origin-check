const gitRemoteOriginUrl = require('git-remote-origin-url');
const gitUrlParse = require('git-url-parse');
const getSshConfig = require('get-ssh-config');

const SSH_CONF_LOCATION = '~/.ssh/config';

module.exports.check = async (expectedHost) => {
  const url = await gitRemoteOriginUrl();
  const urlComponents = gitUrlParse(url);
  if (urlComponents.resource !== expectedHost) {
    const sshConfig = getSshConfig.getSSHConfig();
    const hostParts = sshConfig.find(entry => entry.Host === urlComponents.resource);
    if (!hostParts) {
      throw new Error(`Origin '${urlComponents.resource}' is not a valid SSH alias and does not match ${expectedHost}`);
    }
    else if (hostParts.Hostname !== expectedHost) {
      throw new Error(`Origin alias for '${urlComponents.resource}' resolves to: ${hostParts.Hostname}. It must resolve to: ${expectedHost}`);
    }
  }
};
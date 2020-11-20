const gitRemoteOriginUrl = require('git-remote-origin-url');
const gitUrlParse = require('git-url-parse');
const getSshConfig = require('get-ssh-config');

const getParameterCaseInsensitive = (object, key) => {
  return object[Object.keys(object).find(k => k.toLowerCase() === key.toLowerCase())];
}

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

    const hostParts = sshConfig.find(entry => {
      const host = getParameterCaseInsensitive(entry, 'host');
      return host === origin;
    });

    if (!hostParts) {
      throw new Error(`Origin '${origin}' is not a valid SSH alias and does not match ${expectedHost}`);
    }
    else if (getParameterCaseInsensitive(hostParts, 'hostname') !== expectedHost) {
      console.log(JSON.stringify(hostParts))
      throw new Error(`Origin alias for '${origin}' resolves to: ${hostParts.HostName}. It must resolve to: ${expectedHost}`);
    }
  }

  return true;
};
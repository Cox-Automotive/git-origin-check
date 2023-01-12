const gitUrlParse = require('git-url-parse');
const getSshConfig = require('get-ssh-config');

const getParameterCaseInsensitive = (object, key) => {
  return object[Object.keys(object).find(k => k.toLowerCase() === key.toLowerCase())];
}

const getRemoteOriginUrl = async (url) => {
  return (await import("git-remote-origin-url")).default();
};

module.exports.check = async (expectedHost) => {
  const url = await getRemoteOriginUrl();
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
      throw new Error(`Origin alias for '${origin}' resolves to: ${getParameterCaseInsensitive(hostParts, 'hostname')}. It must resolve to: ${expectedHost}`);
    }
  }

  return true;
};
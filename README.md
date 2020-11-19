# git-origin-check

[![NPM](https://nodei.co/npm/git-origin-check.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/git-origin-check/)

[![Build Status](https://travis-ci.org/Cox-Automotive/git-origin-check.svg?branch=master)](https://travis-ci.org/Cox-Automotive/git-origin-check)


Validates Git origin is set to the correct host. When used in combination with Husky as a `pre-push` hook it enables users to ensure code is not inadvertently pushed to the wrong Github instance. This will check static origin URLs as well as SSH aliases for the correct URL.

## Example Usage:

### 1. Install Module

```
npm install git-origin-check
git-origin-check github.com
```
### 2. Add Husky Hook

```
"husky": {
  "hooks": {
    "pre-push": "git-origin-check github.com"
  }
}
```
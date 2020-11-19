# git-origin-check

[![NPM](https://nodei.co/npm/git-origin-check.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/git-origin-check/)

[![Build Status](https://travis-ci.org/Cox-Automotive/git-origin-check.svg?branch=master)](https://travis-ci.org/Cox-Automotive/git-origin-check)


Validates Git origin is set to correct host. When used in combination with Husky as a `pre-push` hook it enables users to ensure code is not inadvertently pushed to the wrong Github instance.

Example Usage:

```
npm install git-origin-check
git-origin-check github.com
```

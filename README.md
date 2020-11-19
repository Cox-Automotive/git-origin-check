# git-origin-check

Validates Git origin is set to correct host. When used in combination with Husky as a `pre-push` hook it enables users to ensure code is not inadvertently pushed to the wrong Github instance.

Example Usage:

```
npm install git-origin-check
git-origin-check github.com
```

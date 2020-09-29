# NextJS Plugin for Prisma

![npm](https://img.shields.io/npm/v/next-prisma-plugin?style=flat-square)
![npm (tag)](https://img.shields.io/npm/v/next-prisma-plugin/next?style=flat-square)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

Enables Hot Reloads for the Prisma Client

### Install

```
yarn add -D next-prisma-plugin
```

### Configuration

next.config.js

```js
const withPrismaPlugin = require('next-prisma-plugin')

module.exports = withPrismaPlugin()
```

# TODO

- [ ] Windows Support
- [ ] Tests
- [ ] Automatic page reloads

# NextJS Plugin for Prisma

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
# Still TODO

- [ ] Test that it works on Windows
- [ ] Tests?
- [ ] Look into automatic page reloads

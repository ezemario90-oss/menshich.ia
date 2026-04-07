const { defineConfig } = require('@prisma/internals');

module.exports = defineConfig({
  datasource: {
    db: {
      provider: 'postgresql',
      url: { fromEnvVar: 'DATABASE_URL' },
    },
  },
});

import { defineConfig } from '@prisma/internals';

export default defineConfig({
    datasource: {
        db: {
            provider: 'postgresql',
            url: { fromEnvVar: 'DATABASE_URL' },
        },
    },
});

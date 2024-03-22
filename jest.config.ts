import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
    verbose: true,
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest',
    },
    setupFiles: ['<rootDir>/jest.setup.ts'],
    testMatch: ['<rootDir>/tests/**/*.test.ts'],
    testEnvironment: 'node',
    testPathIgnorePatterns: ['/node_modules/', '/dist/'],
};

export default config;

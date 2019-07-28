'use strict';

module.exports = {
  rootDir: process.cwd(),
  roots: ['<rootDir>/src/'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  }
};

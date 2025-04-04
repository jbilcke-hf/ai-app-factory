# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands
- Build: `npm start` (executes `node --loader ts-node/esm src/index.mts`)
- Test: `npm test` (executes `node --loader ts-node/esm src/test.mts`)
- Docker: `npm run docker` (builds and runs the Docker image)

## Code Style
- Use TypeScript with .mts extension for all files
- Import statements at the top, sorted alphabetically
- Use interface for type definitions with explicit types
- camelCase for variables and functions
- Use explicit types for function parameters
- Use arrow functions for callbacks and methods
- Prefer const over let, avoid var
- Handle errors with try/catch blocks
- Use template literals for string interpolation
- Document complex logic with inline comments
- Use early returns for guard clauses
- Filter/map/reduce for array operations instead of loops when possible
- Export functions and types using named exports
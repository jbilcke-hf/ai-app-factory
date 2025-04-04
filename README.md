---
title: AI App Factory
emoji: 🧑‍💻🦙
colorFrom: blue
colorTo: yellow
sdk: docker
pinned: false
app_port: 3000
---

Generate Hugging Face Spaces using deepseek-ai/DeepSeek-V3-0324

The apps may not always work and usually human work is necessary to finish them.
See this project as "Hugging Face Space templates on steroids".

# Examples

## Local prompt examples

```
http://localhost:3000/?prompt=A%20simple%20page%20to%20compute%20the%20BMI%20(use%20SI%20units)
```

# Installation
## Building and run without Docker

```bash
nvm use
npm i
npm run start
```

## Building and running with Docker

```bash
npm run docker
```

This script is a shortcut executing the following commands:

```bash
docker build -t space-factory .
docker run -it -p 3000:3000 space-factory
```

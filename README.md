# Forta Hardhat Plugin

[![npm version](https://badge.fury.io/js/hardhat-forta.svg)](https://badge.fury.io/js/hardhat-forta)

This is a Hardhat plugin that integrates [Forta Agent development tools](https://docs.forta.network/en/latest/cli/) enabling teams to quickly add security/operational monitoring for their smart contracts. You can either start from a sample agent project, or initialize from an existing [template](https://github.com/arbitraryexecution/forta-agent-templates). To learn more about [Forta](https://forta.org/), check out the docs [here](https://docs.forta.network).

## Installation

You can install the Forta plugin to your Hardhat project using the following command

```
npm install -D hardhat-forta
```

This will install the Forta plugin as a dev dependency in your `package.json`. The last step is to update your `hardhat.config.js` file to import the plugin by adding the following line

```javascript
require("hardhat-forta");
```

Or if you are using TypeScript, in your `hardhat.config.ts`:

```ts
import "hardhat-forta";
```

## Tasks

This plugin adds the following tasks to Hardhat:

- `forta:init`

  Initialize a sample project. Similar to [`forta-agent init`](https://docs.forta.network/en/latest/cli/#init).

  ```
  Usage: hardhat [GLOBAL OPTIONS] forta:init [--python] [--typescript]

  OPTIONS:

    --python      Initialize as Python project
    --typescript  Initialize as Typescript project

  forta:init: Initialize a Forta Agent project
  ```

- `forta:init:template`

  Initializes an agent project based on existing [templates](https://github.com/arbitraryexecution/forta-agent-templates).

  ```
  Usage: hardhat [GLOBAL OPTIONS] forta:init:template

  forta:init:template: Initialize a Forta Agent project from a template
  ```

- `forta:run`

  Runs a Forta Agent with blockchain data. Similar to [`forta-agent run`](https://docs.forta.network/en/latest/cli/#run).

  ```
  Usage: hardhat [GLOBAL OPTIONS] forta:run --block <STRING> [--config-file <STRING>] --file <STRING> [--nocache] --prod <STRING> --range <STRING> --tx <STRING>

  OPTIONS:

   --tx          Run with the specified transaction hash
   --block       Run with the specified block hash/number
   --range       Run with the specified block range (e.g. 15..20)
   --file        Run with the specified json file
   --config-file Specify a config file (default: "forta.config.json")
   --nocache     Disables writing to the cache (but reads are still enabled)

  forta:run: Run a Forta Agent with blockchain data
  ```

- `forta:test`

  Runs the unit tests of a Forta Agent project

  ```
  Usage: hardhat [GLOBAL OPTIONS] forta:test

  forta:test: Run unit tests for a Forta Agent
  ```

- `forta:publish`

  Deploy a Forta Agent to the network. Similar to [`forta-agent publish`](https://docs.forta.network/en/latest/cli/#publish).

  ```
  Usage: hardhat [GLOBAL OPTIONS] forta:publish [--config-file <STRING>]

  OPTIONS:

    --config-file Specify a config file (default: "forta.config.json")

  forta:publish: Publish a Forta Agent to the network
  ```

- `forta:push`

  Build a Forta Agent Docker image and push it to the repository. Similar to [`forta-agent push`](https://docs.forta.network/en/latest/cli/#push).

  ```
  Usage:hardhat [GLOBAL OPTIONS] forta:push [--config-file <STRING>]

  OPTIONS:

  --config-file Specify a config file (default: "forta.config.json")

  forta:push: Push a Forta Agent image to the repository
  ```

- `forta:disable`

  Disables a Forta Agent. Similar to [`forta-agent disable`](https://docs.forta.network/en/latest/cli/#disable).

  ```
  Usage: hardhat [GLOBAL OPTIONS] forta:disable

  forta:disable: Disable a Forta Agent
  ```

- `forta:enable`

  Enables a previously disabled Forta Agent. Similar to [`forta-agent enable`](https://docs.forta.network/en/latest/cli/#enable).

  ```
  Usage: hardhat [GLOBAL OPTIONS] forta:enable

  forta:enable: Enable a Forta Agent
  ```

- `forta:keyfile`

  Displays keyfile information. Similar to [`forta-agent keyfile`](https://docs.forta.network/en/latest/cli/#keyfile).

  ```
  Usage: hardhat [GLOBAL OPTIONS] forta:keyfile

  forta:keyfile: Print out keyfile information
  ```

## Environment extensions

This plugin does not extend the environment.

## Configuration

This plugin adds an **optional** `forta` entry to Hardhat's config, which allows specifying the directory where your agents are located

```js
module.exports = {
  forta: {
    contextPath: "my-agent", // default: "agents"
  },
};
```

## Usage

All of the tasks can be called through `npx hardhat <task>` inside the Hardhat project.

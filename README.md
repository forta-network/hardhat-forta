# Hardhat Forta plugin

This is a Hardhat plugin that exposes access to the [Forta Agent CLI](https://docs.forta.network/en/latest/cli/)
through Hardhat, allowing Forta Agent project management. It also features a
tool to generate agent projects based on [templates](https://github.com/arbitraryexecution/forta-agent-templates).

## Installation

For now, since this plugin isn't yet deployed, you can build the package, pack
it and then install it in a hardhat project.

```bash
# Cloning the plugin
git clone https://github.com/NethermindEth/Forta-agent-hardhat-plugin.git
cd Forta-agent-hardhat-plugin

# Building the plugin
npm install
npm run build
npm pack

# Installing it as a package in a hardhat project
mv forta-hardhat-plugin-<VERSION>.tgz <PROJECT_FOLDER>
cd <PROJECT_FOLDER>
npm i forta-hardhat-plugin-<VERSION>.tgz
```

Import the plugin in your `hardhat.config.js`:

```js
require("forta-agent-hardhat-plugin");
```

Or if you are using TypeScript, in your `hardhat.config.ts`:

```ts
import "forta-agent-hardhat-plugin";
```

## Tasks

This plugin adds the following tasks to Hardhat:

- `forta:init`

  Similar to [`forta-agent init`](https://docs.forta.network/en/latest/cli/#init).

  ```
  Usage: hardhat [GLOBAL OPTIONS] forta:init [--python] [--typescript]

  OPTIONS:

    --python      Initialize as Python project
    --typescript  Initialize as Typescript project

  forta:init: Initialize a Forta Agent project
  ```

- `forta:init:template`

  Initializes an agent project based on the [forta-agent-templates](https://github.com/arbitraryexecution/forta-agent-templates) repository templates.

  ```
  Usage: hardhat [GLOBAL OPTIONS] forta:init:template

  forta:init:template: Initialize a Forta Agent project from a template
  ```

- `forta:run`

  Similar to [`forta-agent run`](https://docs.forta.network/en/latest/cli/#run).

  ```
  Usage: hardhat [GLOBAL OPTIONS] forta:run --block <STRING> [--config-file <STRING>] --file <STRING> [--nocache] --prod <STRING> --range <STRING> --tx <STRING>

  OPTIONS:

   --block       Run with the specified block hash/number
   --config-file Specify a config file (default: "forta.config.json")
   --file        Run with the specified json file
   --nocache     Disables writing to the cache (but reads are still enabled)
   --prod        Run a server listening for events from a Forta Scanner
   --range       Run with the specified block range (e.g. 15..20)
   --tx          Run with the specified transaction hash

  forta:run: Run a Forta Agent with blockchain data
  ```

- `forta:test`

  Runs the unit tests of a Forta Agent project

  ```
  Usage: hardhat [GLOBAL OPTIONS] forta:test

  forta:test: Run unit tests for a Forta Agent
  ```

- `forta:publish`

  Similar to [`forta-agent publish`](https://docs.forta.network/en/latest/cli/#publish).

  ```
  Usage: hardhat [GLOBAL OPTIONS] forta:publish [--config-file <STRING>]

  OPTIONS:

    --config-file Specify a config file (default: "forta.config.json")

  forta:publish: Publish a Forta Agent to the network
  ```

- `forta:push`

  Similar to [`forta-agent push`](https://docs.forta.network/en/latest/cli/#push).

  ```
  Usage:hardhat [GLOBAL OPTIONS] forta:push [--config-file <STRING>]

  OPTIONS:

  --config-file Specify a config file (default: "forta.config.json")

  forta:push: Push a Forta Agent image to the repository
  ```

- `forta:disable`

  Similar to [`forta-agent disable`](https://docs.forta.network/en/latest/cli/#disable).

  ```
  Usage: hardhat [GLOBAL OPTIONS] forta:disable

  forta:disable: Disable a Forta Agent
  ```

- `forta:enable`

  Similar to [`forta-agent enable`](https://docs.forta.network/en/latest/cli/#enable).

  ```
  Usage: hardhat [GLOBAL OPTIONS] forta:enable

  forta:enable: Enable a Forta Agent
  ```

- `forta:keyfile`

  Similar to [`forta-agent keyfile`](https://docs.forta.network/en/latest/cli/#keyfile).

  ```
  Usage: hardhat [GLOBAL OPTIONS] forta:keyfile

  forta:keyfile: Print out keyfile information
  ```

## Environment extensions

This plugin does not extend the environment.

## Configuration

This plugin adds an optional `forta` entry to Hardhat's config, which allows specifying the context path used by the Forta Agent utilities.

```js
module.exports = {
  forta: {
    contextPath: "my-agent", // default: "agents"
  },
};
```

## Usage

All of the tasks can be called through `npx hardhat <task>` inside the Hardhat project.

# Hardhat Forta plugin

This is a Hardhat plugin that exposes access to the Forta CLI through hardhat,
allowing forta agent project management. More features to come!

## Installation

For now, since this plugin isn't yet deployed, you can build the package, pack
it and then install it in a hardhat project. To do that, you'll also need to
get the tarball version of the `expose-cli-commands` branch of the
`forta-agent` package.

```bash
# Cloning the plugin
git clone https://github.com/NethermindEth/Forta-agent-hardhat-plugin.git
cd Forta-agent-hardhat-plugin

# Building forta-agent-sdk expose-cli-commands branch
git clone https://github.com/forta-protocol/forta-agent-sdk.git
cd forta-agent-sdk
git checkout expose-cli-commands
npm install
npm run build
npm pack

# Placing the tarball in the plugin folder
mv forta-agent-0.0.39.tgz ..
cd ..

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

## Tasks (WIP)

This plugin adds the following tasks to Hardhat:

- `forta-agent:init`

  Similar to `forta-agent init`.

  ```
  Usage: hardhat [GLOBAL OPTIONS] forta-agent:init [--python] [--typescript]

  OPTIONS:

    --python      Initialize as Python project
    --typescript  Initialize as Typescript project

  forta-agent:init: Initialize a Forta Agent project
  ```

- `forta-agent:publish`

  Similar to `forta-agent publish`.

  ```
  Usage: hardhat [GLOBAL OPTIONS] forta-agent:publish [--config-file <STRING>]

  OPTIONS:

    --config-file Specify a config file (default: "forta.config.json")

  forta-agent:publish: Publish the Forta Agent to the network
  ```

## Environment extensions

This plugin does not extend the environment.

## Configuration

This plugin adds an optional `forta` entry to Hardhat's config, which allows specifying the context path used by the Forta utilities.

```js
module.exports = {
  forta: {
    contextPath: "my_agent" // default: "agent"
  }
}
```

## Usage

All of the tasks can be called through `npx hardhat <task>` inside the Hardhat project.

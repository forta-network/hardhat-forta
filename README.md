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

- `forta-agent:run`

  Similar to `forta-agent run`.

  ```
  Usage: hardhat [GLOBAL OPTIONS] forta-agent:run --block <STRING> [--config-file <STRING>] --file <STRING> [--nocache] --prod <STRING> --range <STRING> --tx <STRING>

  OPTIONS:

   --block       Run with the specified block hash/number 
   --config-file Specify a config file (default: "forta.config.json")
   --file        Run with the specified json file 
   --nocache     Disables writing to the cache (but reads are still enabled) 
   --prod        Run a server listening for events from a Forta Scanner 
   --range       Run with the specified block range (e.g. 15..20) 
   --tx          Run with the specified transaction hash 

  forta-agent:run: Run the Forta Agent with latest blockchain data
  ```
- `forta-agent:push`

  Similar to `forta-agent push`.

  ```
  Usage:hardhat [GLOBAL OPTIONS] forta-agent:push [--config-file <STRING>]

  OPTIONS:

  --config-file Specify a config file (default: "forta.config.json")

  forta-agent:push: Push the Forta Agent image to the repository
  ```
- `forta-agent:disable`

  Similar to `forta-agent disable`.

  ```
  Usage: hardhat [GLOBAL OPTIONS] forta-agent:disable

  forta-agent:disable: Disables the Forta Agent
  ```
- `forta-agent:enable`

  Similar to `forta-agent enable`.

  ```
  Usage: hardhat [GLOBAL OPTIONS] forta-agent:enable

  forta-agent:enable: Enables the Forta Agent
  ```
- `forta-agent:keyfile`

  Similar to `forta-agent keyfile`.

  ```
  Usage: hardhat [GLOBAL OPTIONS] forta-agent:keyfile

  forta-agent:keyfile: Prints out keyfile information
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

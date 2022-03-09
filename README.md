# Hardhat Forta plugin

This is a Hardhat plugin that exposes access to the Forta CLI through hardhat,
allowing forta agent project management. More features to come!

## Installation

To start working on your project, just run

```bash
npm install https://github.com/NethermindEth/Forta-agent-hardhat-plugin.git
```

for now.

Import the plugin in your `hardhat.config.js`:

```js
require("Forta-agent-hardhat-plugin");
```

Or if you are using TypeScript, in your `hardhat.config.ts`:

```ts
import "Forta-agent-hardhat-plugin";
```

## Tasks (TODO)

This plugin adds the following tasks to Hardhat:

## Environment extensions

This plugin does not extend the environment.

## Configuration

This plugin adds an optional `forta` entry to Hardhat's config, which allows specifying the context path used by the Forta utilities.

```js
module.exports = {
  forta: {
    contextPath: "./agent"
  }
}
```

## Usage

All of the tasks can be called through `npx hardhat <task>` inside the Hardhat project.

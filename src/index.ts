import { extendConfig, task } from "hardhat/config";
import { HardhatConfig, HardhatUserConfig } from "hardhat/types";
import path from "path";

import { executeFortaCliCommand } from "./forta-cli";
import "./type-extensions";

extendConfig(
  (config: HardhatConfig, userConfig: Readonly<HardhatUserConfig>) => {
    const contextPath = userConfig.forta?.contextPath;
    config.forta = config.forta || {};

    let normalizedPath: string;
    if (!contextPath) {
      normalizedPath = path.join(config.paths.root, "agent");
    } else {
      if (path.isAbsolute(contextPath)) {
        normalizedPath = contextPath;
      } else {
        normalizedPath = path.normalize(
          path.join(config.paths.root, contextPath)
        );
      }
    }

    config.forta.contextPath = normalizedPath;
  }
);

// Init Task
task("forta-agent:init")
  .setDescription("Initialize a Forta Agent project")
  .addFlag("typescript", "Initialize as Typescript project")
  .addFlag("python", "Initialize as Python project")
  .setAction(async (taskArgs, { config }) => {
    await executeFortaCliCommand("init", {
      contextPath: config.forta.contextPath,
      ...taskArgs,
    });
  });


// hardhat doesn't allow a parameter named "config" since it clashes with
// its own parameter names

// Run task
task("forta-agent:run")
  .setDescription("Run the Forta Agent with latest blockchain data")
  .addOptionalParam("tx", "Run with the specified transaction hash")
  .addOptionalParam("block", "Run with the specified block hash/number")
  .addOptionalParam("range", "Run with the specified block range (e.g. 15..20)")
  .addOptionalParam("file", "Run with the specified json file")
  .addOptionalParam(
    "prod",
    "Run a server listening for events from a Forta Scanner"
  )
  .addOptionalParam("configFile", "Specify a config file", "forta.config.json")
  .addFlag(
    "nocache",
    "Disables writing to the cache (but reads are still enabled)"
  )
  .setAction(async (taskArgs, { config }) => {
    await executeFortaCliCommand("init", {
      contextPath: config.forta.contextPath,
      tx: taskArgs.tx,
      block: taskArgs.block,
      range: taskArgs.range,
      file: taskArgs.file,
      prod: taskArgs.prod,
      config: taskArgs.configFile,
      nocache: taskArgs.nocache,
    });
  });
  
// Publish Task
task("forta-agent:publish")
  .setDescription("Publish the Forta Agent to the network")
  .addOptionalParam("configFile", "Specify a config file", "forta.config.json")
  .setAction(async (taskArgs, { config }) => {
    await executeFortaCliCommand("publish", {
      contextPath: config.forta.contextPath,
      config: taskArgs.configFile,
    });
  });

// Push Task
task("forta-agent:push")
  .setDescription("Push the Forta Agent image to the repository")
  .addOptionalParam("configFile", "Specify a config file", "forta.config.json")
  .setAction(async (taskArgs, { config }) => {
    await executeFortaCliCommand("push", {
      contextPath: config.forta.contextPath,
      config: taskArgs.configFile,
    });
  });

// Disable Task
task("forta-agent:disable")
  .setDescription("Disables the Forta Agent")
  .setAction(async (_, { config }) => {
    await executeFortaCliCommand("disable", {
      contextPath: config.forta.contextPath,
    });
  });

// Enable Task
task("forta-agent:enable")
  .setDescription("Enables the Forta Agent")
  .setAction(async (_, { config }) => {
    await executeFortaCliCommand("enable", {
      contextPath: config.forta.contextPath,
    });
  });

// Keyfile Task
task("forta-agent:keyfile")
  .setDescription("Prints out keyfile information")
  .setAction(async (_, { config }) => {
    await executeFortaCliCommand("keyfile", {
      contextPath: config.forta.contextPath,
    });
  });

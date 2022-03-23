import { extendConfig, task } from "hardhat/config";
import { HardhatConfig, HardhatUserConfig } from "hardhat/types";
import path from "path";
import shelljs from "shelljs";

import { executeFortaAgentCliCommand } from "./forta-cli";
import { chooseAgent } from "./forta-cli/agents";
import { generateAgents } from "./templates";
import "./type-extensions";

const TASK_PREFIX = "forta"

extendConfig(
  (config: HardhatConfig, userConfig: Readonly<HardhatUserConfig>) => {
    const contextPath = userConfig.forta?.contextPath;

    let normalizedPath: string;
    if (!contextPath) {
      normalizedPath = path.join(config.paths.root, "agents");
    } else {
      if (path.isAbsolute(contextPath)) {
        normalizedPath = contextPath;
      } else {
        normalizedPath = path.normalize(
          path.join(config.paths.root, contextPath)
        );
      }
    }

    config.forta = {
      contextPath: normalizedPath,
    };
  }
);

// Init Task
task(`${TASK_PREFIX}:init`)
  .setDescription("Initialize a sample Forta Agent project")
  .addFlag("typescript", "Initialize as Typescript project")
  .addFlag("python", "Initialize as Python project")
  .setAction(async (taskArgs, { config }) => {
    await executeFortaAgentCliCommand("init", {
      contextPath: config.forta.contextPath,
      ...taskArgs,
    });
  });


// Init Template Task
task(`${TASK_PREFIX}:init:template`)
  .setDescription("Initialize a Forta Agent project from a template")
  .setAction(async (_, { config }) => {
    try {
      await generateAgents(config.forta.contextPath);
    } catch (err) {
      console.error(`Error while initializing agent: ${err}`);
    }
  });

// Run Task
task(`${TASK_PREFIX}:run`)
  .setDescription("Run a Forta Agent with blockchain data")
  .addOptionalParam("tx", "Run with the specified transaction hash")
  .addOptionalParam("block", "Run with the specified block hash/number")
  .addOptionalParam("range", "Run with the specified block range (e.g. 15..20)")
  .addOptionalParam("file", "Run with the specified json file")
  .addFlag("prod", "Run a server listening for events from a Forta Scanner")
  .addOptionalParam("configFile", "Specify a config file", "forta.config.json")
  .addFlag(
    "nocache",
    "Disables writing to the cache (but reads are still enabled)"
  )
  .setAction(async (taskArgs, { config }) => {
    await executeFortaAgentCliCommand("run", {
      contextPath: await chooseAgent(config.forta.contextPath),
      tx: taskArgs.tx,
      block: taskArgs.block,
      range: taskArgs.range,
      file: taskArgs.file,
      prod: taskArgs.prod,
      config: taskArgs.configFile,
      nocache: taskArgs.nocache,
    });
  });

// Test Task
task(`${TASK_PREFIX}:test`)
  .setDescription("Run unit tests for a Forta Agent")
  .setAction(async (_, { config }) => {
    const contextPath = await chooseAgent(config.forta.contextPath)
    shelljs.cd(contextPath)
    shelljs.exec("npm test")
  })

// Publish Task
task(`${TASK_PREFIX}:publish`)
  .setDescription("Publish a Forta Agent to the network")
  .addOptionalParam("configFile", "Specify a config file", "forta.config.json")
  .setAction(async (taskArgs, { config }) => {
    await executeFortaAgentCliCommand("publish", {
      contextPath: await chooseAgent(config.forta.contextPath),
      config: taskArgs.configFile,
    });
  });

// Push Task
task(`${TASK_PREFIX}:push`)
  .setDescription("Push a Forta Agent image to the repository")
  .addOptionalParam("configFile", "Specify a config file", "forta.config.json")
  .setAction(async (taskArgs, { config }) => {
    await executeFortaAgentCliCommand("push", {
      contextPath: await chooseAgent(config.forta.contextPath),
      config: taskArgs.configFile,
    });
  });

// Disable Task
task(`${TASK_PREFIX}:disable`)
  .setDescription("Disable a Forta Agent")
  .setAction(async (_, { config }) => {
    await executeFortaAgentCliCommand("disable", {
      contextPath: await chooseAgent(config.forta.contextPath),
    });
  });

// Enable Task
task(`${TASK_PREFIX}:enable`)
  .setDescription("Enable a Forta Agent")
  .setAction(async (_, { config }) => {
    await executeFortaAgentCliCommand("enable", {
      contextPath: await chooseAgent(config.forta.contextPath),
    });
  });

// Keyfile Task
task(`${TASK_PREFIX}:keyfile`)
  .setDescription("Print out keyfile information")
  .setAction(async (_, { config }) => {
    await executeFortaAgentCliCommand("keyfile", {
      contextPath: config.forta.contextPath,
    });
  });


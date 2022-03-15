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
task("forta-agent:publish")
  .setDescription("Publish the Forta Agent to the network")
  .addOptionalParam("configFile", "Specify a config file", "forta.config.json")
  .setAction(async (taskArgs, { config }) => {
    await executeFortaCliCommand("publish", {
      contextPath: config.forta.contextPath,
      config: taskArgs.configFile,
    });
  });
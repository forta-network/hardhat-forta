import { extendConfig } from "hardhat/config";
import { HardhatConfig, HardhatUserConfig } from "hardhat/types";
import path from "path";

import "./type-extensions";

extendConfig(
  (config: HardhatConfig, userConfig: Readonly<HardhatUserConfig>) => {
    const contextPath = userConfig.forta?.contextPath;

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

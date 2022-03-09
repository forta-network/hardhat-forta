// If your plugin extends types from another plugin, you should import the plugin here.

// To extend one of Hardhat's types, you need to import the module where it has been defined, and redeclare it.
import "hardhat/types/config";

import { FortaUserConfig } from "./types";

declare module "hardhat/types/config" {
  export interface HardhatUserConfig {
    forta?: FortaUserConfig;
  }

  export interface HardhatConfig {
    forta: FortaUserConfig;
  }
}

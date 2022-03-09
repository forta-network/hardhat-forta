// tslint:disable-next-line no-implicit-dependencies
import { assert } from "chai";
import path from "path";

import { ExampleHardhatRuntimeEnvironmentField } from "../src/ExampleHardhatRuntimeEnvironmentField";

import { useEnvironment } from "./helpers";

describe("Integration tests examples", function () {
  describe("HardhatConfig extension", function () {
    useEnvironment("hardhat-project");

    it("Should add the contextPath to the config", function () {
      assert.equal(
        this.hre.config.forta.contextPath,
        path.join(process.cwd(), "agent")
      );
    });
  });
});

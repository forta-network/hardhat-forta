import fs from "fs";
import path from "path";
import prompts from "prompts";

function getAgentChoices(
  rootPath: string
): Array<{ title: string; value: string }> {
  return fs
    .readdirSync(rootPath)
    .filter((file) => {
      const fullPath = path.join(rootPath, file);
      return (
        file !== "node_modules" &&
        fs.existsSync(path.join(fullPath, "package.json"))
      );
    })
    .map((file) => ({
      title: file,
      value: path.join(rootPath, file),
    }));
}

export async function chooseAgent(rootPath: string): Promise<string> {
  if (fs.existsSync(path.join(rootPath, "package.json"))) {
    return rootPath;
  } else {
    const agentChoices = getAgentChoices(rootPath);

    if (agentChoices.length === 0) {
      throw new Error("No agents inside folder");
    }
    if (agentChoices.length === 1) {
      return agentChoices[0].value;
    }

    const agent = await prompts({
      type: "select",
      name: "path",
      message: "Agent:",
      choices: getAgentChoices(rootPath),
    });

    return agent.path;
  }
}

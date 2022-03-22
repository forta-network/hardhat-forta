import fs from "fs";
import { bold, underline } from "kleur/colors";
import fetch from "node-fetch";
import path from "path";
import prompts from "prompts";
import shelljs from "shelljs";

import { getDescription } from "./descriptions";
import { DirectoryFile, RepositoryTree, RepositoryTreeNode } from "./types";

/**
 * Retrieves the folders in the repository root.
 * @returns The template directory subtree SHA.
 */
async function getTemplates(): Promise<RepositoryTreeNode[]> {
  const treeUrl = `https://api.github.com/repos/arbitraryexecution/forta-agent-templates/git/trees/main`;
  const directories = (await (await fetch(treeUrl)).json()) as RepositoryTree;
  const templateDirectories = directories.tree.filter((el) => {
    return el.type === "tree";
  });

  if (!templateDirectories.length) {
    throw new Error("Template not found");
  }

  return templateDirectories;
}

/**
 * Retrieves data about the files inside the template directory.
 * @param templateName - The name of the template, that should also be the
 *  name of one of the directories inside the `forta-agent-templates`
 *  repository root.
 * @returns An array containing each of the files' relative path and download
 *  url.
 */
async function getTemplateFiles(
  template: RepositoryTreeNode
): Promise<DirectoryFile[]> {
  const templateSubtreeUrl = `https://api.github.com/repos/arbitraryexecution/forta-agent-templates/git/trees/${template.sha}?recursive=true`;
  const templateSubtree = (await (
    await fetch(templateSubtreeUrl)
  ).json()) as RepositoryTree;

  return templateSubtree.tree
    .filter((el) => el.type === "blob")
    .map((el) => ({
      path: el.path,
      url: `https://raw.githubusercontent.com/arbitraryexecution/forta-agent-templates/main/${template.path}/${el.path}`,
    }));
}

/**
 * Checks if the provided path has any files.
 * @param path - Path to be checked.
 */
function pathHasFiles(pathStr: string) {
  return fs.existsSync(pathStr) && shelljs.ls(pathStr).length;
}

/**
 * Checks if destinationPath is empty or not and, if not, notifies the user
 * and asks for confirmation.
 * @param destinationPath - Path to be checked.
 * @returns A boolean indicating whether the user agreed to write in the
 *  specified path.
 */
async function shouldWrite(destinationPath: string): Promise<boolean> {
  if (pathHasFiles(destinationPath)) {
    const response = await prompts({
      type: "confirm",
      name: "shouldContinue",
      message: `The directory ${underline(
        destinationPath
      )} is not empty and files may be overwritten. Continue?`,
    });

    if (!response.shouldContinue) {
      return false;
    }
  }

  return true;
}

/**
 * Fetches an agents files based on its repository tree node.
 * @param node - Repository tree node with information about the agent folder.
 * @param destinationPath - Path in which the agent files should be written.
 */
async function fetchAgent(node: RepositoryTreeNode, destinationPath: string) {
  if (!(await shouldWrite(destinationPath))) {
    console.log(bold(`Skipping agent download.`));
    return;
  }

  const files = await getTemplateFiles(node);

  await Promise.all(
    files.map(
      async (file): Promise<void> => {
        const filePath = path.join(destinationPath, file.path);

        shelljs.mkdir("-p", path.dirname(filePath));

        const writeStream = fs.createWriteStream(filePath);
        const res = await fetch(file.url);

        return new Promise((resolve, reject) => {
          res.body?.pipe(writeStream);
          res.body?.on("error", reject);
          writeStream.on("finish", resolve);
        });
      }
    )
  );

  console.log(
    bold(
      `Agent successfully generated at ${underline(
        destinationPath
      )} using the ${underline(node.path)} template.`
    )
  );
}

/**
 * Generates an agent or more based on the available templates in the
 * arbitraryexecution/forta-agent-templates github repository.
 * @param destinationPath - The path in which the forta agent project(s) will
 *  be placed.
 */
export async function generateAgents(destinationPath: string) {
  const availableTemplates = await getTemplates();

  const templatePrompt = await prompts({
    type: "multiselect",
    name: "agents",
    message: "Templates:",
    choices: availableTemplates.map((node) => ({
      title: node.path,
      value: node,
      description: getDescription(node.path),
    })),
    initial: 0,
  });

  if (templatePrompt.agents.length === 1) {
    await fetchAgent(templatePrompt.agents[0], destinationPath);
  } else {
    for (const agent of templatePrompt.agents) {
      await fetchAgent(agent, path.join(destinationPath, agent.path));
    }
  }

  console.log(
    bold(
      "\nConfiguration instructions are described in the SETUP.md file inside the agent folder."
    )
  );
}

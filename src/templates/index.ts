import fs from "fs";
import { bold, underline, green, blue } from "kleur/colors";
import fetch from "node-fetch";
import path from "path";
import prompts from "prompts";
import shelljs from "shelljs";
import { configureContainer } from "forta-agent";

import { getDescription } from "./descriptions";
import { DirectoryFile, RepositoryTree, RepositoryTreeNode } from "./types";

const TEMPLATES_REPO_OWNER = "arbitraryexecution"
const TEMPLATES_REPO_NAME = "forta-bot-templates"
const TEMPLATES_REPO_COMMIT = "de5f1f272d906e3ceb8a1a2747c1600aa03a734e"

/**
 * Retrieves the folders in the repository root.
 * @returns The template directory subtree SHA.
 */
async function getTemplates(): Promise<RepositoryTreeNode[]> {
  const treeUrl = `https://api.github.com/repos/${TEMPLATES_REPO_OWNER}/${TEMPLATES_REPO_NAME}/git/trees/${TEMPLATES_REPO_COMMIT}`;
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
 *  name of one of the directories inside the `forta-bot-templates`
 *  repository root.
 * @returns An array containing each of the files' relative path and download
 *  url.
 */
async function getTemplateFiles(
  template: RepositoryTreeNode
): Promise<DirectoryFile[]> {
  const templateSubtreeUrl = `https://api.github.com/repos/${TEMPLATES_REPO_OWNER}/${TEMPLATES_REPO_NAME}/git/trees/${template.sha}?recursive=true`;
  const templateSubtree = (await (
    await fetch(templateSubtreeUrl)
  ).json()) as RepositoryTree;

  return templateSubtree.tree
    .filter((el) => el.type === "blob")
    .map((el) => ({
      path: el.path,
      url: `https://raw.githubusercontent.com/${TEMPLATES_REPO_OWNER}/${TEMPLATES_REPO_NAME}/${TEMPLATES_REPO_COMMIT}/${template.path}/${el.path}`,
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

  console.log(`Initializing ${node.path} template...`)
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

  console.log(`Running npm install...`)
  shelljs.cd(destinationPath)
  shelljs.exec("npm install")

  console.log(
    bold(blue(
      `Agent successfully generated at ${underline(destinationPath)}`
    ))
  );
}

/**
 * Generates an agent or more based on the available templates in the
 * arbitraryexecution/forta-bot-templates github repository.
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
  if (templatePrompt.agents.length === 0) {
    throw new Error("no templates selected")
  }

  const selectedMultipleAgents = templatePrompt.agents.length > 1
  if (!selectedMultipleAgents) {
    // initialize the template in the root folder
    await fetchAgent(templatePrompt.agents[0], destinationPath);
  } else {
    // create separate folders for each template
    for (const agent of templatePrompt.agents) {
      await fetchAgent(agent, path.join(destinationPath, agent.path));
    }
  }

  const diContainer = configureContainer();
  const initKeystore = diContainer.resolve<() => Promise<void>>("initKeystore");
  await initKeystore()
  const initConfig = diContainer.resolve<() => Promise<void>>("initConfig");
  await initConfig()
  const initKeyfile = diContainer.resolve<() => Promise<void>>("initKeyfile");
  await initKeyfile()

  console.log(`You agree that your use is subject to the terms and conditions found at https://forta.org/legal`)
  console.log(
    bold(green(
      `\n**Make sure to configure the template${selectedMultipleAgents ? 's' : ''} by following SETUP.md inside the agent folder${selectedMultipleAgents ? 's' : ''}!**`
    ))
  );
}

import { configureContainer } from "forta-agent";

import { CommandArgs } from "./types";

type CommandHandler = (args?: any) => Promise<void>;

export async function executeFortaAgentCliCommand<T extends keyof CommandArgs>(
  cliCommandName: T,
  cliArgs: CommandArgs[T]
) {
  try {
    const diContainer = configureContainer({ ...cliArgs, cliCommandName });
    const command = diContainer.resolve<CommandHandler>(cliCommandName);
    await command();
  } catch (e) {
    console.error(`Error while running forta agent cli command: ${e}`);
    process.exit();
  }
}

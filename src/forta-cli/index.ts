import { configureContainer } from "forta-agent";

export type CommandName =
  | "init"
  | "run"
  | "publish"
  | "push"
  | "disable"
  | "enable"
  | "keyfile";

export type CommandHandler = (args?: any) => Promise<void>;

export async function executeFortaCliCommand(
  cliCommandName: CommandName,
  cliArgs: any
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

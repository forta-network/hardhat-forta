export interface CommandArgs {
  init: InitArgs;
  run: RunArgs;
  publish: PublishArgs;
  push: PushArgs;
  disable: DisableArgs;
  enable: EnableArgs;
  keyfile: KeyfileArgs;
}

interface BaseArgs {
  contextPath: string;
}

interface InitArgs extends BaseArgs {
  typescript?: boolean;
  python?: boolean;
}

interface RunArgs extends BaseArgs {
  tx?: string;
  block?: string;
  range?: string;
  file?: string;
  prod?: boolean;
  config: string;
  nocache?: boolean;
}

interface PublishArgs extends BaseArgs {
  config: string;
}

interface PushArgs extends BaseArgs {
  config: string;
}

// tslint:disable-next-line:no-empty-interface
interface DisableArgs extends BaseArgs {}

// tslint:disable-next-line:no-empty-interface
interface EnableArgs extends BaseArgs {}

// tslint:disable-next-line:no-empty-interface
interface KeyfileArgs extends BaseArgs {}

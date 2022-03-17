
export interface CommandArgs {
  "init": InitArgs;
  "run": RunArgs;
  "publish": PublishArgs;
  "push": PushArgs;
  "disable": DisableArgs;
  "enable": EnableArgs;
  "keyfile": KeyfileArgs;
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

interface DisableArgs extends BaseArgs {}

interface EnableArgs extends BaseArgs {}

interface KeyfileArgs extends BaseArgs {}

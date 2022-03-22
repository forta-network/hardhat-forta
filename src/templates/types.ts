export interface RepositoryTreeNode {
  path: string;
  mode: string;
  type: string;
  sha: string;
  size?: number;
  url: string;
}

export interface RepositoryTree {
  sha: string;
  url: string;
  tree: RepositoryTreeNode[];
  truncated: boolean;
}

export interface DirectoryFile {
  path: string;
  url: string;
}

import { Octokit } from "@octokit/core";
import { OctokitOptions } from "@octokit/core/dist-types/types";


class BaseGithubClient {
  protected octokit: Octokit;
  constructor(options: OctokitOptions) {
    this.octokit = new Octokit(options);
  }
}

namespace BaseGithubClient {
  export interface Config {
    
  }
}

export default BaseGithubClient;
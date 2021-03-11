import BaseGithubClient from "clients/baseGithubClient";

class Organizations extends BaseGithubClient {
  public ListOrganizations(request: Organizations.ListOrganizationsRequest): Promise<Organizations.ListOrganizationsResult> {
    if (!!request.username) {
      return this.octokit.request('GET /users/{username}/orgs{?since,per_page}', {
        headers: {
          accept: request.accept
        },
        since: request.since,
        per_page: request.per_page,
        username: request.username,
      }).then(data => data.data);  
    }
    
    return this.octokit.request('GET /organizations{?since,per_page}', {
      headers: {
        accept: request.accept
      },
      since: request.since,
      per_page: request.per_page,
    }).then(data => data.data);
  }

  public ListOrganizationsForAuthenticatedUser(request: Organizations.ListOrganizationsForAuthenticatedUserRequest): Promise<Organizations.ListOrganizationsForAuthenticatedUserResult> {
    return this.octokit.request('GET /user/orgs{?per_page,page}', {
      headers: {
        accept: request.accept
      },
      per_page: request.per_page,
      page: request.page,
    }).then(data => data.data);
  }
}

namespace Organizations {
  export interface ListOrganizationsRequest {
    username?: string;
    accept?: string;
    since?: number;
    per_page?: number;
  }
  export type ListOrganizationsResult = OrganizationList;
  
  export interface ListOrganizationsForAuthenticatedUserRequest {
    accept?: string;
    per_page?: number;
    page?: number;
  }
  export type ListOrganizationsForAuthenticatedUserResult = OrganizationList;
}

namespace Organizations {
  export type OrganizationList = Organization[];
  export interface Organization {
    login?: string;
    id?: number;
    node_id?: string;
    url?: string;
    repos_url?: string;
    events_url?: string;
    hooks_url?: string;
    issues_url?: string;
    members_url?: string;
    public_members_url?: string;
    avatar_url?: string;
    description?: string;
  }
}

export default Organizations;